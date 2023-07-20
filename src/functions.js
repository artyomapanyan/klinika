import {notification} from "antd";
import Resources from "./store/Resources";
import dayjs from "dayjs";
export function paramsToObject(entries) {
    const result = {}
    for(const [key, value] of entries) { // each 'entry' is a [key, value] tupple
        result[key] = value;
    }
    return result;
}
export function clearObject(obj){
    Object.keys(obj).forEach(key => {
        if (!obj[key]) {
            delete obj[key]
        }
    })
}
export function handleFormatDates(data,isReq=false){

    if(typeof data==='object'){
        Object.keys(data??{}).forEach(key=>{
            if(!dayjs(data[key]).format('YYYY-MM-DD HH:mm').includes('Invalid') && key!=='uuid' && data[key] && dayjs(data[key],'YYYY-MM-DD').isValid() && !Number.isInteger(data[key]) && typeof data[key]==='string' && data[key].includes('-')){
               if(isReq){
                   data[key] = dayjs(data[key]).format('YYYY-MM-DD HH:mm')
               }else{
                   data[key] = dayjs(data[key]).utc(true).format('YYYY-MM-DD HH:mm')
               }


            }else if(typeof data[key]==='object'){
                data[key] = handleFormatDates(data[key],isReq)
            }
        })
    }else if(Array.isArray(data)){
        data= data.map(e=>{
            return handleFormatDates(e,isReq)
        })
    }

    return data
}
export function getServiceTypes(services){
    return [
        {
            service: services?.has_telehealth_service,
            id: 'telehealth',
            name: "Telehealth",
        },
        {
            service: services?.has_clinic_visit_service,
            id: 'clinic_visit',
            name: 'Clinic Visit',
        },
        {
            service: services?.has_home_visit_service,
            id: 'home_visit',
            name: 'Home Visit',
        },
        {
            service: services?.has_physical_therapy_home_visit_service,
            id: 'physical_therapy_home_visit',
            name: 'Physical Therapy Home Visit',
        },
        {
            service: services?.has_physical_therapy_clinic_visit_service,
            id: 'physical_therapy_clinic_visit',
            name: 'Physical Therapy Clinic Visit',
        },
        {
            service: services?.has_laboratory_home_visit_service,
            id: 'laboratory_home_visit',
            name: 'Laboratory Home Visit'
        },
        {
            service: services?.has_nursing_service,
            id: 'nursing',
            name: 'Nursing'
        },
        {
            service: services?.has_laboratory_clinic_visit_service,
            id: 'laboratory_clinic_visit',
            name: 'Laboratory Clinic Visit'
        }
    ].filter(el => el.service === true)
}
export function GMBK(key){
    return Resources.Months.find(e=>e.key==key)?.label??dayjs().format('MMM')

}
export function makeUnique(data,key){
        let uniqueKeys = [];
        let uniqueData = [];
        data.forEach(item => {
            if (!uniqueKeys[item[key]]) {
                uniqueKeys[item[key]] = 1;
                uniqueData.push(item);
            }
        })
        return uniqueData;

}

export function blobToObjectUrl(blob, noPdf) {
    let fileUrl = URL.createObjectURL(blob)
    if (noPdf) {
        var element = document.createElement('a');
        element.setAttribute('href', fileUrl);
        element.setAttribute('download', noPdf);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    } else {
        let openedWindow = window.open(fileUrl)
        if (openedWindow) {
            openedWindow.onload = function () {
                this.onbeforeunload = function () {
                    URL.revokeObjectURL(fileUrl)
                }
            }
        }
    }


}
export function notificate(data,status) {
    if (data?.errors) {
        Object.keys(data?.errors).map((type) => {
            if( typeof data.errors==='object'){
                Object.values(data.errors)?.forEach((message) => {
                    notification.error({
                        message: type,
                        description: message,
                        placement: "bottomRight"
                    })
                });
            }else{
                data.errors?.forEach((message) => {
                    notification.error({
                        message: type,
                        description: message,
                        placement: "bottomRight"
                    })
                });
            }

            return true;
        });
    }
    if (data === "error") {
        notification.error({
            message: "Error",
            description: "Please contact the administrator",
            placement: "bottomRight"
        })
    }
    if (data?.message  ) {
        if(status===200){
            notification.info({
                message: "Notification",
                description: data.message,
                placement: "bottomRight"
            })
        }
        else {
            notification.error({
                message: "Notification",
                description: data.message,
                placement: "bottomRight"
            })
        }

    }
    if (data?.notices) {
        data.notices.forEach((message) => {
            if (data.status <= 400) {
                notification.info({
                    message: "Notification",
                    description: message,
                    placement: "bottomRight"
                })
            } else {
                notification.warning({
                    message: "Warning",
                    description: message,
                    placement: "bottomRight"
                })
            };
            return true;
        });
    }
}



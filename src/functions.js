import {notification} from "antd";
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
        Object.keys(data.errors).map((type) => {
            data.errors[type].forEach((message) => {
                notification.error({
                    message: type,
                    description: message,
                    placement: "bottomRight"
                })
            });
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
        }else {
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

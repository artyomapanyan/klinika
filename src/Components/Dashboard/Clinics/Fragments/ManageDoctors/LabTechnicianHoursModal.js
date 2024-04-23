import {useSelector} from "react-redux";
import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {postResource, updateResource} from "../../../../Functions/api_calls";
import Resources from "../../../../../store/Resources";
import Preloader from "../../../../Preloader";
import WorkingHours from "../../../../Fragments/WorkingHours/WorkingHours";


const resource = "ClinicMedicalStaffHours";
const res = "Clinic";
const excludedGet = {
    'laboratory_clinic_visit':'laboratory_clinic_visit',
    'laboratory_home_visit' : 'laboratory_home_visit'
}
function LabTechnicianHoursModal({id,type, handleCancel, keys=[]}, setIsModalOpen) {
    let token = useSelector((state) => state.auth.token);
    const params = useParams();

    const [data, setData] = useState([])
    const [docData, setDocData] = useState({})
    const [loading, setLoading] = useState(true)
    const [clinichoursData, setClinichoursData] = useState({})
    const [clinicHoursesDataNew, setClinicHoursesDataNew] = useState({})

    console.log(keys)

    useEffect(() => {
        setLoading(true)
        Promise.all([
            postResource(resource,'WorkingHours',token,id,{service:type}),
            postResource(res,'WorkingHours',token,params.id,{service: type}),
            postResource(res,'WorkingHours',token,params.id,{service: type})

        ])
            .then(responses => {

                console.log(responses, 'ress')
                setData(responses[0]?.working_hours)

                setDocData({
                    price:responses[0]?.clinic_medical_staff[keys[1]],
                    status:responses[0]?.clinic_medical_staff[keys[0]]
                })
                let clinicTimes = responses[1];
                Object.keys(clinicTimes)?.forEach(key=>{
                    clinicTimes[key] =clinicTimes[key]?.map(e=>({
                        start:Resources.dateOptions?.findIndex(u=>u?.value===e?.opens_at),
                        end:Resources.dateOptions?.findIndex(u=>u?.value===e?.closes_at)
                    }))
                })

                setClinichoursData(clinicTimes)
                setClinicHoursesDataNew(responses[2])

                setLoading(false)
            })



    },[type,id]);


    const onFinish = (values,prevValues) => {

        setLoading(true)
        setData((prevState)=>({
            ...prevState,
            ...prevValues?.working_hours
        }))



        if (params.id) {
            updateResource('ClinicMedicalStaffWorkingHoursTable', id, values, token, ).then(response => {

                setData(response?.working_hours)
                setDocData({
                    price:response?.clinic_medical_staff[keys[1]],
                    status:response?.clinic_medical_staff[keys[0]]
                })
            }).finally(() => {
                setLoading(false)
                handleCancel()

            })
        }

    }

    console.log(docData, 'docdata')

    return(
        <div className={'doctor_working_hours_conteiner'}>
            {loading?<Preloader/>:<WorkingHours doctorHoursModal={false} clinicHoursesDataNew={clinicHoursesDataNew} switchStatus={true} timeLimits={clinichoursData}  handleCancel={handleCancel} loading={loading} modalId={id} data={data??[]} onFinish={onFinish} type={type} doctorData={docData}  isDoctorHours={true} clinichoursData={clinichoursData} diagnosesPrice={true}/>}
        </div>
    )
}
export default LabTechnicianHoursModal;
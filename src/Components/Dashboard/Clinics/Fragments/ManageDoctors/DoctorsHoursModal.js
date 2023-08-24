import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {postResource, updateResource} from "../../../../Functions/api_calls";
import WorkingHours from "../../../../Fragments/WorkingHours/WorkingHours";
import Preloader from "../../../../Preloader";
import Resources from "../../../../../store/Resources";




const resource = "ClinicDoctor";
const res = "Clinic";
function DoctorsHoursModal({id,type, handleCancel, keys=[]}, setIsModalOpen) {
    let token = useSelector((state) => state.auth.token);
    const params = useParams();

    const [data, setData] = useState([])
    const [docData, setDocData] = useState({})
    const [loading, setLoading] = useState(true)
    const [clinichoursData, setClinichoursData] = useState({})

console.log(type)

    useEffect(()=>{

        postResource(res,'WorkingHours',token,params.id,{service: type}).then(response => {
            Object.keys(response).forEach(key=>{
                response[key] = response[key].map(e=>({
                start:Resources.dateOptions.findIndex(u=>u.value===e.opens_at),
                end:Resources.dateOptions.findIndex(u=>u.value===e.closes_at)
            }))
            })

            setClinichoursData(response)

        })

    }, [id,type]);


    useEffect(() => {

        setLoading(true)
        Promise.all([
            postResource(resource,'WorkingHours',token,id,{service:type}),
            postResource(res,'WorkingHours',token,params.id,{service: type})

        ])
       .then(responses => {
            setData(responses[0]?.working_hours)
            setDocData({
                price:responses[0]?.clinic_doctor[keys[1]],
                status:responses[0]?.clinic_doctor[keys[0]]
            })
           let clinicTimes = responses[1];
           Object.keys(clinicTimes)?.forEach(key=>{
               clinicTimes[key] =clinicTimes[key]?.map(e=>({
                   start:Resources.dateOptions?.findIndex(u=>u?.value===e?.opens_at),
                   end:Resources.dateOptions?.findIndex(u=>u?.value===e?.closes_at)
               }))
           })

           setClinichoursData(clinicTimes)

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
            updateResource('ClinicDoctorWorkingHoursTable', id, values, token, ).then(response => {
                setData(response?.working_hours)
                setDocData({
                    price:response?.clinic_doctor[keys[1]],
                    status:response?.clinic_doctor[keys[0]]
                })
            }).finally(() => {
                setLoading(false)
                handleCancel()

            })
        }

    }

    return(
        <div className={'doctor_working_hours_conteiner'}>
            {loading?<Preloader/>:<WorkingHours timeLimits={clinichoursData}  handleCancel={handleCancel} loading={loading} modalId={id} data={data??[]} onFinish={onFinish} type={type} doctorData={docData}  isDoctorHours={true} clinichoursData={clinichoursData}/>}
        </div>
    )
}
export default DoctorsHoursModal;
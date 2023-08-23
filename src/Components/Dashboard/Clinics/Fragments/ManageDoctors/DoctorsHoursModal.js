import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {postResource, updateResource} from "../../../../Functions/api_calls";
import WorkingHours from "../../../../Fragments/WorkingHours/WorkingHours";
import Preloader from "../../../../Preloader";




const resource = "ClinicDoctor";
const res = "Clinic";
function DoctorsHoursModal({id,type, handleCancel, keys=[]}, setIsModalOpen) {
    let token = useSelector((state) => state.auth.token);
    const params = useParams();

    const [data, setData] = useState([])
    const [docData, setDocData] = useState({})
    const [loading, setLoading] = useState(true)
    const [clinichoursData, setClinichoursData] = useState({})



    useEffect(()=>{

        postResource(res,'WorkingHours',token,params.id,{service: type}).then(response => {
            setClinichoursData(response)

        })

    }, [id,type]);


    useEffect(() => {

        setLoading(true)
        postResource(resource,'WorkingHours',token,id,{service:type}).then(response => {
            setData(response?.working_hours)
            setDocData({
                price:response?.clinic_doctor[keys[1]],
                status:response?.clinic_doctor[keys[0]]
            })
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
            {loading?<Preloader/>:<WorkingHours handleCancel={handleCancel} loading={loading} modalId={id} data={data??[]} onFinish={onFinish} type={type} doctorData={docData}  isDoctorHours={true} clinichoursData={clinichoursData}/>}
        </div>
    )
}
export default DoctorsHoursModal;
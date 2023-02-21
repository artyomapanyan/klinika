import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {postResource, updateResource} from "../../../../Functions/api_calls";
import WorkingHours from "../../../../Fragments/WorkingHours/WorkingHours";
import Preloader from "../../../../Preloader";




const resource = "ClinicDoctor";
function DoctorsHoursModal({id,type, price, status}) {
    let token = useSelector((state) => state.auth.token);
    const params = useParams();

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)




    useEffect(() => {

        setLoading(true)
        postResource(resource,'WorkingHours',token,id,{service:type}).then(responses => {
            setData(responses)
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
            updateResource('ClinicDoctorWorkingHours', id, values, token, ).then(response => {
                setData(response)
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    return(
        <div className={'add_edit_content'}>
            {loading?<Preloader/>:<WorkingHours loading={loading} workData={data} onFinish={onFinish} type={type} doctorData={{status,price}}  isDoctorHours={true} />}
        </div>
    )
}
export default DoctorsHoursModal;
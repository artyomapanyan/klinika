import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {postResource, updateResource} from "../../../../Functions/api_calls";
import WorkingHours from "../../../../Fragments/WorkingHours/WorkingHours";




const resource = "ClinicDoctor";
function DoctorsHoursModal({id,type}) {
    let token = useSelector((state) => state.auth.token);
    const params = useParams();

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)




    useEffect(() => {
        postResource(resource,'WorkingHours',token,id,{service:type}).then(responses => {
            setData(responses)
        })

    },[]);

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

    console.log(data, 'data')
    return(
        <div className={'add_edit_content'}>
            <WorkingHours loading={loading} data={data} onFinish={onFinish} type={type} switchHours={false} isDoctorHours={true} />
        </div>
    )
}
export default DoctorsHoursModal;
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, postResource, updateResource} from "../../../../Functions/api_calls";
import resourceLinks from "../../../../ResourceLinks";

import WorkingHours from "../../../../Fragments/WorkingHours/WorkingHours";



const resource = "Clinic";
function DoctorsHoursModal({loadingState, dataState}) {
    let token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const params = useParams();

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)


    let type = "main";

    useEffect(() => {
        postResource(resource,'WorkingHours',token,params.id,{service:'main'}).then(responses => {
            setData(responses)
        })

    }, []);

    const onFinish = (values,prevValues) => {
        setLoading(true)
        setData((prevState)=>({
            ...prevState,
            ...prevValues?.working_hours
        }))
        if (params.id) {
            updateResource('ClinicWorkingHours', params.id, values, token, ).then(response => {
                setData(response)
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    return(
        <div>
            <WorkingHours loading={loading} data={data} onFinish={onFinish} type={type}/>
        </div>
    )
}
export default DoctorsHoursModal;
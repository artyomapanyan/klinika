import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import { postResource, updateResource} from "../../../../Functions/api_calls";
import resourceLinks from "../../../../ResourceLinks";
import WorkingHours from "../../../../Fragments/WorkingHours/WorkingHours";


const resource = "Clinic";
const service = 'telehealth'
function ClinicWorkingHours({loadingState, dataState}) {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {loading, setLoading} = loadingState;

    const [data, setData] = useState({})


    useEffect(()=>{
            postResource(resource,'WorkingHours',token,params.id,{service}).then(responses => {
                setData(responses)
            })


    }, []);


    const onFinish = (values,prevValues) => {
        setLoading(true)
        setData((prevState)=>({
            ...prevState,
            ...prevValues
        }))
        if (params.id) {
            updateResource('ClinicWorkingHours', params.id, values, token, ).then(response => {
                setData(response)
            }).finally(() => {
                setLoading(false)
            })
        }
    }


    let type = "telehealth"

    return(
        <div>
            <WorkingHours loading={loading} data={data} onFinish={onFinish} type={type}/>
        </div>
    )
}
export default ClinicWorkingHours;
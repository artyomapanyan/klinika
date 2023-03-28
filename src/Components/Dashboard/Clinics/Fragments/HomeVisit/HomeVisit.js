import React, {useEffect, useState} from "react";
import WorkingHours from "../../../../Fragments/WorkingHours/WorkingHours";
import {postResource, updateResource} from "../../../../Functions/api_calls";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";


const resource = "Clinic";
function HomeVisit() {
    let token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const params = useParams();

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)



    let type = "home_visit";

    useEffect(() => {
        postResource(resource,'WorkingHours',token,params.id,{service:'home_visit'}).then(responses => {
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
        <div className={'add_edit_content'}>
            <WorkingHours loading={loading} data={data} onFinish={onFinish} type={type}/>

        </div>
    )
}
export default HomeVisit;
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {postResource, updateResource} from "../../../../Functions/api_calls";
import Preloader from "../../../../Preloader";
import WorkingHours from "../../../../Fragments/WorkingHours/WorkingHours";

const resource = "Clinic";
function PhysicalTherapyClinicVisit({tab}) {
    let token = useSelector((state) => state.auth.token);
    const params = useParams();
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)


    let type = "physical_therapy_clinic_visit";

    useEffect(() => {
        setLoading(true)
        postResource(resource,'WorkingHours',token,params.id,{service:'physical_therapy_clinic_visit'}).then(responses => {
            setData(responses)
            setLoading(false)
        })

    }, [tab]);

    const onFinish = (values,prevValues) => {
        setLoading(true)
        setData((prevState)=>({
            ...prevState,
            ...prevValues?.working_hours
        }))
        if(values.sync_with_main) {
            values.service = "physical_therapy_clinic_visit"
            values.working_hours = [{is_day_off: false, opens_at: "02:00", closes_at: "09:00", day: "monday"}]
        }
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
            <div className={'add_edit_content'}>
                {
                    loading ? <Preloader/> : <WorkingHours loading={loading} data={data} onFinish={onFinish} type={type}/>
                }
            </div>
        </div>
    )
}
export default PhysicalTherapyClinicVisit;
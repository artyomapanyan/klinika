import {useParams} from "react-router";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {postResource, updateResource} from "../../../../Functions/api_calls";
import WorkingHours from "../../../../Fragments/WorkingHours/WorkingHours";
import Preloader from "../../../../Preloader";

const resource = "Clinic";
const service = 'telehealth'
function Telehealth({loadingState, tab}) {
    const params = useParams();
    let token = useSelector((state) => state.auth.token);
    const {loading, setLoading} = loadingState;
    const [load, setLoad] = useState(false);

    const [data, setData] = useState({})


    useEffect(()=>{
        setLoad(true)
        postResource(resource,'WorkingHours',token,params.id,{service}).then(response => {
            setData(response)
            console.log(response, 'l')
            setLoad(false)
        })

    }, [tab]);


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


    let type = "telehealth"

    return(
        <div className={'add_edit_content'}>
            {
                load ? <Preloader /> : <WorkingHours loading={loading} data={data} onFinish={onFinish} type={type}/>
            }

        </div>
    )
}
export default Telehealth;
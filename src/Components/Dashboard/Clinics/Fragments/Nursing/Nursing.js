import React, {useEffect, useState} from "react";
import WorkingHours from "../../../../Fragments/WorkingHours/WorkingHours";
import {createResource, postResource, updateResource} from "../../../../Functions/api_calls";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import resourceLinks from "../../../../ResourceLinks";


const resource = "Clinic";

function Nursing() {
    let token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const params = useParams();

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)



    let type = "nursing";

    useEffect(() => {
        setLoading(true)
        postResource(resource,'WorkingHours',token,params.id,{service:'nursing'}).then(responses => {
            setData(responses)
            setLoading(false)
        })

    }, []);

    const onFinish = (values) => {
        data((prevState)=>({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token, true).then(response => {
                if(response?.id){
                    navigate(resourceLinks[resource])
                }
            }).finally(() => {
                setLoading(false)
            })
        } else {
            createResource(resource, values, token, true).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks[resource])
                }
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
export default Nursing;
import React, {useEffect, useState} from "react";
import WorkingHours from "../../../../Fragments/WorkingHours/WorkingHours";
import {createResource, postResource, updateResource} from "../../../../Functions/api_calls";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import resourceLinks from "../../../../ResourceLinks";
import {t} from "i18next";
import {Switch, Space} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

const resource = "Clinic";
function ClinicHomeVisit() {
    let token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const params = useParams();

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [switchState, setSwitchState] = useState(true)


    let type = "home_visit";

    useEffect(() => {
        postResource(resource,'WorkingHours',token,params.id,{service:'home_visit'}).then(responses => {
            setData(responses)
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

    const onChange = (checked) => {
        setSwitchState(checked)
    };

    return(
        <div className={'add_edit_content'}>
            <div className={'home_visit_head'}>
                <h1 className={'h1'}>{t(`Manage Pending Doctors`)}</h1>
                <Space >
                    <Switch defaultChecked className={'right-label'} onChange={onChange} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                    Sync with main working hours
                </Space>

            </div>
            {
                switchState ? <div className={'add_edit_content'} align={"center"}>
                    <h1 className={"h1"}>Working Hours is synced with the main working hours</h1>
                </div> : <WorkingHours loading={loading} data={data} onFinish={onFinish} type={type}/>
            }



        </div>
    )
}
export default ClinicHomeVisit;
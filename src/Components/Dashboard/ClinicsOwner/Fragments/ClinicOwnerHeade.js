import React, {useEffect, useState} from 'react';
import {Dropdown, Space} from "antd";
import {t} from "i18next";
import {DownOutlined} from "@ant-design/icons";
import {postResource} from "../../../Functions/api_calls";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
function ClinicOwnerHeade() {
    let token = useSelector((state) => state.auth.token);
    const [items, setItems] = useState();
    let dispatch = useDispatch()

    useEffect(() => {
        postResource('ClinicOwnerClinics','list', token,  '', ).then((response) => {
            response.clinics.forEach((el) => {
                return setItems([
                    {
                        label: el?.name?.en,
                        key: el?.id
                    }
                ])
            })

        })
    }, [])


    const onClick = ({key}) => {
        if(key) {
            dispatch({
                type:'CLINIC_ID',
                payload: {
                    id: key
                }
            })
        }

    };

    const handleChange = (value, e) => {
        console.log(value, 'val')
    }

    const monthNames = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMM'));
    console.log(monthNames, 'd')
    return(
        <div className={'clinic_owner_header'}>
            <div style={{margin:"40px 24px", fontSize:40}}>Dashboard</div>
            <div>
                <select onChange={handleChange}>
                    {monthNames.map((month, index) => (
                        <option key={index} value={index}>{month}</option>
                    ))}
                </select>
            </div>
            <div>
                <Dropdown
                    menu={{
                        items,
                        onClick,
                    }}
                    trigger={['click']}
                >
                    <Space direction={'horizontal'} style={{cursor:"pointer"}}>
                        <div style={{color: "#BF539E", fontWeight: 400, fontSize:24, marginLeft:15}}>{t("All clinic")}</div>
                        <div><DownOutlined /></div>
                    </Space>

                </Dropdown>
            </div>
        </div>
    )
}
export default ClinicOwnerHeade;
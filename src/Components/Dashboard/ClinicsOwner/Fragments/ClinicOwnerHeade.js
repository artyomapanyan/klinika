import React, {useEffect, useState} from 'react';
import {Dropdown, Space} from "antd";
import {t} from "i18next";
import {DownOutlined} from "@ant-design/icons";
import {postResource} from "../../../Functions/api_calls";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
const currentMonth = new Date().getMonth();
function ClinicOwnerHeade() {
    let token = useSelector((state) => state.auth.token);
    const [items, setItems] = useState([]);
    let dispatch = useDispatch()
    let ownerClinics = useSelector((state) => state?.owner);

    useEffect(() => {
        postResource('ClinicOwnerClinics','list', token,  '', ).then((response) => {
            if(response) {
                response.clinics.forEach((el,key) => {
                    if(key===0){
                        dispatch({
                            type:'OWNER_DATA',
                            payload: {
                                id:  el?.id,
                                month_key:currentMonth
                            }
                        })
                    }
                    return setItems([
                        {
                            label: el?.name,
                            key: el?.id
                        }
                    ])
                })
            }
        })
      return () => {
        dispatch({
          type:'CLEAR_OWNER_DATA',

        })
      }
    }, [])


    const onClick = ({key}) => {
        dispatch({
                type:'OWNER_DATA',
                payload: {
                    id: key
                }
            })

    };

    const handleChange = (e) => {
            dispatch({
                type:'OWNER_DATA',
                payload: {
                    month_key: e.target.value
                }
            })
    }
    const monthNames = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMM'));

    return(
        <div className={'clinic_owner_header'}>
            <div style={{margin:"40px 24px", fontSize:40}}>Dashboard</div>
            <div>
                <select onChange={handleChange} defaultValue={ownerClinics.month_key??currentMonth} className={'owner_month_select'}>
                    {monthNames.map((month, index) => (
                        <option className={'own_select_options'} key={index} value={index}>{month}</option>
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
                    className={'own_head_clinics'}
                >
                    <Space direction={'horizontal'} style={{cursor:"pointer"}}>
                        <div style={{ fontWeight: 400, fontSize:18}}>{items.find(e=>e.id==ownerClinics.id)?.name??t('All Clinics')}</div>
                        <div><DownOutlined /></div>
                    </Space>

                </Dropdown>
            </div>
        </div>
    )
}
export default ClinicOwnerHeade;
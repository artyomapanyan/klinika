import React, {useEffect, useState} from 'react';
import {Dropdown, Space} from "antd";
import {t} from "i18next";
import {postResource} from "../../../Functions/api_calls";
import {useDispatch, useSelector} from "react-redux";
import arrow_black from "../../../../dist/icons/arrow-black.svg";
import dayjs from "dayjs";
import Resources from "../../../../store/Resources";

const currentMonth = new Date().getMonth();
function ClinicOwnerHeader({noClinicSelect = false}) {
    let token = useSelector((state) => state.auth.token);
    const [items, setItems] = useState([]);





    let dispatch = useDispatch()
    let ownerClinics = useSelector((state) => state?.owner);

    useEffect(() => {
        if(!noClinicSelect){
            postResource('ClinicOwnerClinics','list', token,  '', ).then((response) => {
                if(response) {
                    setItems(response.clinics.map((el,key) => {
                        if(key===0){
                            dispatch({
                                type:'OWNER_DATA',
                                payload: {
                                    id:  el?.id,
                                    month_key:currentMonth
                                }
                            })
                        }
                        return{
                            label: el?.name,
                            key: el?.id
                        }
                    }))
                }
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

    const handleChange = ({key}) => {
            dispatch({
                type:'OWNER_DATA',
                payload: {
                    month_key: key
                }
            })
    }

    const {Months} = Resources;
    return(
        <div className={'clinic_owner_header'}>
            <div style={{margin:"40px 24px", fontSize:40, fontWeight:400}}>Dashboard</div>
            <div>
                <Dropdown
                    menu={{
                        items:Months,
                        onClick:handleChange,
                    }}
                    trigger={['click']}
                    className={'own_head_clinics'}
                >
                    <Space direction={'horizontal'} style={{cursor:"pointer"}}>
                        <div style={{ fontWeight: 400, fontSize:18}}>{Months.find(e=>e.key==ownerClinics.month_key)?.label??dayjs().format('MMM')}</div>
                        <div style={{marginLeft: 10}} > <img alt={'arrow_black'} src={arrow_black}/></div>
                    </Space>

                </Dropdown>
            </div>
            {!noClinicSelect&&<div>
                <Dropdown
                    menu={{
                        items:items,
                        onClick:onClick
                    }}
                    trigger={['click']}
                    className={'own_head_clinics'}
                >
                    <Space direction={'horizontal'} style={{cursor:"pointer"}}>
                        <div style={{ fontWeight: 400, fontSize:18}}>{items.find((e)=>e.key==ownerClinics.id)?.label??t('All Clinics')}</div>
                        <div style={{marginLeft: 10}}> <img alt={'arrow_black'} src={arrow_black}/></div>
                    </Space>

                </Dropdown>
            </div>}
        </div>
    )
}
export default ClinicOwnerHeader;
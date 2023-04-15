import React, {useEffect, useState} from 'react';
import {Dropdown, Space} from "antd";
import {t} from "i18next";
import {DownOutlined} from "@ant-design/icons";
import {postResource} from "../../../Functions/api_calls";
import {useDispatch, useSelector} from "react-redux";
import arrow_black from "../../../../dist/icons/arrow-black.svg";
import dayjs from "dayjs";
import checkout from "../../../../dist/icons/checkout.svg";
const currentMonth = new Date().getMonth();
function ClinicOwnerHeade() {
    let token = useSelector((state) => state.auth.token);
    const [items, setItems] = useState([]);
    const [itemsMonth, setItemsMonth] = useState([
        {
            label: "January",
            key: '0'
        },
        {
            label: 'February',
            key: '1'
        },
        {
            label: 'March',
            key: '2'
        },
        {
            label: 'April',
            key: '3'
        },
        {
            label: 'May',
            key: '4'
        },
        {
            label: 'June',
            key: '5'
        },
        {
            label: 'July',
            key: '6'
        },
        {
            label: 'August',
            key: '7'
        },
        {
            label: 'September',
            key: '8'
        },
        {
            label: 'October',
            key: '9'
        },
        {
            label: 'November',
            key: '10'
        },
        {
            label: 'December',
            key: '11'
        },
    ]);




    let dispatch = useDispatch()
    let ownerClinics = useSelector((state) => state?.owner);

    useEffect(() => {
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

    const handleChange = ({key}) => {
        console.log(key, 'ffffffddd')
            dispatch({
                type:'OWNER_DATA',
                payload: {
                    month_key: key
                }
            })
    }
    //const monthNames = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMM'));
console.log(ownerClinics, itemsMonth)

    return(
        <div className={'clinic_owner_header'}>
            <div style={{margin:"40px 24px", fontSize:40, fontWeight:400}}>Dashboard</div>
            <div>
                {/*<select onChange={handleChange} defaultValue={ownerClinics.month_key??currentMonth} className={'owner_month_select'}>*/}
                {/*    {monthNames.map((month, index) => (*/}
                {/*        <option className={'own_select_options'} key={index} value={index}>{month}</option>*/}
                {/*    ))}*/}
                {/*</select>*/}

                <Dropdown
                    menu={{
                        items:itemsMonth,
                        onClick:handleChange,
                    }}
                    trigger={['click']}
                    className={'own_head_clinics'}
                >
                    <Space direction={'horizontal'} style={{cursor:"pointer"}}>
                        <div style={{ fontWeight: 400, fontSize:18}}>{itemsMonth.find(e=>e.month_key==ownerClinics.key)?.label??dayjs().format('MMM')}</div>
                        <div style={{marginLeft: 10}} > <img alt={'arrow_black'} src={arrow_black}/></div>
                    </Space>

                </Dropdown>
            </div>
            <div>
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
            </div>
        </div>
    )
}
export default ClinicOwnerHeade;
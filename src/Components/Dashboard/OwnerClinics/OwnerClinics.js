import React, {useState} from 'react';
import {t} from "i18next";
import {Avatar, Button, Space, Table, Tag} from "antd";
import {UserOutlined} from "@ant-design/icons";
import './ClinicOwnerStyles/ClinicOwnerStyles.sass'
import HCPs_icon from "../../../dist/icons/HCPs_icon.svg";
import Nurses_icon from "../../../dist/icons/Nurses_icon.png";
import Other_icon from "../../../dist/icons/Others_icon.png";
import Offers_icon from "../../../dist/icons/Offers_icon.png";
import Active_icon from "../../../dist/icons/Active_icon.png";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import DateParser from "../../Fragments/DateParser";
import ResourceTable from "../../Fragments/ResourceTable";
import ResourceLinks from "../../ResourceLinks";
import {useNavigate} from "react-router";

let resource = 'Clinic';
function OwnerClinics({resourceLink=null,}) {
    let navigate = useNavigate();

    const [record, setRecord] = useState({})
    const onAddNew = () => {
        navigate(ResourceLinks[resourceLink??resource] + 'new')
    }

    const onResourceEdit = () => {
        navigate(ResourceLinks[resourceLink??resource] + record.id)

    }


    return(
        <div className={'owner_clinics_big_div'}>
            <div className={'own_clinic_head_div'}>
                <span className={'header_text'}>Clinics</span>
                <Button onClick={onAddNew} className={'add_btn'} size={'large'} type={'primary'}>Add new</Button>
            </div>
            <div className={'table_div'}>
                <ResourceTable resource={'Clinic'} except={{edit: true, delete: true}} showHeader={false} noHeader={true} tableColumns={[
                    {
                        title: t('Clinic'),
                        dataIndex: 'name',
                        key: 'name',
                        render:(e, record)=>{
                            setRecord(record)
                            return <div style={{cursor:"pointer"}} onClick={(record)=>onResourceEdit(record)} className={'avatar_div'}>
                                <Space >
                                    <Avatar shape="square" size={90} className={'owner_clinic_avatar'} style={{width: 120}} icon={<UserOutlined />} />
                                    <div style={{display:"block"}}>
                                        <div className={'text_name_clinic'}>{record?.name}</div>
                                        <div className={'text_address'}>Ar Rihab, Diriyah 13717, Saudi Arabia</div>
                                    </div>

                                </Space>

                            </div>
                        }
                    },
                    {
                        title: t('Clinic'),
                        dataIndex: 'Clinic',
                        key: 'Clinic',
                        render:()=>{
                            return<div className={'icon_text_div'}><img alt={'HCPs_icon'} src={HCPs_icon}/> <span className={'owner_clinic_table_texts'}>HCPs: 12</span></div>
                        }
                    },
                    {
                        title: t('Clinic'),
                        dataIndex: 'Clinic',
                        key: 'Clinic',
                        render:()=>{
                            return<div className={'icon_text_div'}><img alt={'Nurses_icon'} src={Nurses_icon}/> <span className={'owner_clinic_table_texts'}>Nurses: 4</span></div>
                        }
                    },
                    {
                        title: t('Clinic'),
                        dataIndex: 'Clinic',
                        key: 'Clinic',
                        render:()=>{
                            return<div className={'icon_text_div'}><img alt={'Other_icon'} src={Other_icon}/> <span className={'owner_clinic_table_texts'}>Other: 2</span></div>
                        }
                    },
                    {
                        title: t('Date'),
                        dataIndex: 'Date',
                        key: 'Date',
                        render:()=>{
                            return<div className={'icon_text_div'}> <img alt={'Offers_icon'} src={Offers_icon}/> <span className={'owner_clinic_table_texts'}>Offers: 11</span></div>
                        }
                    },
                    {
                        title: t('Status'),
                        dataIndex: 'Status',
                        key: 'Status',
                        render:()=>{
                            return<div className={'icon_text_div'}><img alt={'Active_icon'} src={Active_icon}/> <span style={{color:'#4FB873'}} className={'owner_clinic_table_texts'}>Active</span></div>
                        }
                    },
                ]} title={t('Cities')}/>
            </div>

        </div>
    )
}
export default OwnerClinics;
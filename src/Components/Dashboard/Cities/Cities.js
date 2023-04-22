import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
import DateParser from "../../Fragments/DateParser";
import {Avatar, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
function Cities() {
    return(
        <div>
            <ResourceTable resource={'City'} tableColumns={[
                {
                    title:'ID',
                    dataIndex:'id',
                    key:'id',
                    sorter:true,
                },
                {
                    title: t('Doctor'),
                    dataIndex: 'name',
                    key: 'name',
                    render:()=>{
                        return <div className={'avatar_div'}>
                            <Space >
                                <Avatar shape="square" size={90} style={{width: 120, borderRadius: 12}} icon={<UserOutlined />} />
                                <div style={{display:"block"}}>
                                    <div className={'text_name_clinic'}>Diriyah Hospital</div>
                                    <div className={'text_address'}>Ar Rihab, Diriyah 13717, Saudi Arabia</div>
                                </div>

                            </Space>

                        </div>
                    }
                },
                {
                    title:t('City'),
                    dataIndex:'name',
                    key:'name',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:['region','name'],
                    title:t('Area'),
                    key:'area',
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props} resource={'Region'}/>,
                },
                {
                    dataIndex:['region','country','name'],
                    title:t('Country'),
                    key:'country',
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props} resource={'Country'}/>,
                },
                {
                    dataIndex:['created_at','iso_string'],
                    title:t('Create date'),
                     key:'date',
                    render:i=><DateParser date={i}/>
                },
            ]} title={t('Cities')}/>
        </div>
    )
}
export default Cities;

import ResourceTable from "../../Fragments/ResourceTable";
import {t} from "i18next";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import DateParser from "../../Fragments/DateParser";
import React from "react";
import {CarryOutOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";
import {useNavigate} from "react-router";
import ResourceLinks from "../../ResourceLinks";

function Patients() {
    const navigate = useNavigate()

    const goAppointment = (record) =>{
        navigate(ResourceLinks['Appointment'] + 'new')
    }

    return(
        <div>
            <ResourceTable resource={'Patient'}
                           exportDatabase={false}
                           eyeShow={true}
                           except={{
                               edit: true,
                               delete: true
                           }}

                           tableColumns={[
                {
                    title:'ID',
                    dataIndex:'id',
                    key:'id',
                    sorter:true,
                },
                {
                    title: t('Name'),
                    dataIndex: 'name',
                    key: 'name',
                    translatable:true,
                    render:(e, record) => {
                        return <div>{record?.first} {record?.last}</div>
                    }

                },
                {
                    title:t('Email'),
                    dataIndex:'email',
                    key:'email',
                    sorter:true,
                },
                {
                    dataIndex:'phone_number',
                    title:t('Phone number'),
                    key:'phone_number',
                    filterDropdown: (props)=><TableFilterElement filterProps={props} resource={'Region'}/>,
                },
                {
                    dataIndex:['created_at','iso_string'],
                    title:t('Create date'),
                    key:'date',
                    render:i=><DateParser date={i}/>
                },
                {
                    dataIndex:['last_logged_in_at','iso_string'],
                    title:t('Last logged in'),
                    key:'last_logged_in_at',
                    render:i=><DateParser date={i}/>
                },
                {
                    title: t(' '),
                    dataIndex: 'appointment',
                    key: 'appointment',
                    render:(e, record) => <div style={{cursor: 'pointer'}} onClick={()=>goAppointment(record)}>
                        <Tooltip title="Schedule an Appointment">
                            <CarryOutOutlined style={{color: '#c98a1e'}}/>
                        </Tooltip>
                    </div>
                },
            ]} title={t('Patients')}/>
        </div>
    )
}
export default Patients;
import ResourceTable from "../../Fragments/ResourceTable";
import {t} from "i18next";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import DateParser from "../../Fragments/DateParser";
import React from "react";
import PermCheck from "../../Fragments/PermCheck";
import DateRangeFilterElement from "../../Fragments/TableFilterElements/DateRangeFilterElement";
import calendar_dark_purpule_icon from "../../../dist/icons/calendar_dark_purpule_icon.png";

function Patients() {


    return(
        <div>
            <ResourceTable resource={'Patient'}
                           editStyle={true}
                           exportDatabase={false}
                           eyeShow={true}
                           addBtn={false}
                           except={{
                               delete: true,
                               edit: PermCheck(`Appointment:create`) ? false : true
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
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                    render:(e, record) => {
                        return <div>{record?.first} {record?.last}</div>
                    }

                },
                {
                    title:t('Email'),
                    dataIndex:'email',
                    key:'email',
                    sorter:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
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
                    filterDropdown: (props)=><DateRangeFilterElement filterProps={props}/>,
                    filterIcon: (filtered) => (<img alt={'calendar_dark_purpule_icon'} src={calendar_dark_purpule_icon}/>),
                    render:i=><DateParser date={i}/>
                },
                {
                    dataIndex:['last_logged_in_at','iso_string'],
                    title:t('Last logged in'),
                    key:'last_logged_in_at',
                    render:i=><DateParser date={i}/>
                },
            ]} title={t('Patients')}/>
        </div>
    )
}
export default Patients;
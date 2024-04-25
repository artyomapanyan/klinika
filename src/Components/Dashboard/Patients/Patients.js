import ResourceTable from "../../Fragments/ResourceTable";
import {t} from "i18next";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import RadioFilterElement from "../../Fragments/TableFilterElements/RadioFilterElement";
import DateParser from "../../Fragments/DateParser";
import React from "react";
import {useSelector} from "react-redux";
import DateRangeFilterElement from "../../Fragments/TableFilterElements/DateRangeFilterElement";
import calendar_dark_purpule_icon from "../../../dist/icons/calendar_dark_purpule_icon.png";
import Resources from "../../../store/Resources";

function Patients() {
    let selectedRole = useSelector((state) => state.auth.selected_role);

    return(
        <div>
            <ResourceTable resource={'Patient'}
                           editStyle={true}
                           exportDatabase={false}
                           eyeShow={true}
                           addBtn={false}
                           except={{
                               delete: true,
                               edit: selectedRole.key === 'super' || selectedRole.key === 'super-admin' ? true : false
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
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    title:t('Age'),
                    dataIndex:'age',
                    key:'age',
                },
                {
                    dataIndex:'gender',
                    title:t('Gender'),
                    key:'gender',
                    filterDropdown: (props)=><RadioFilterElement filterProps={props}  type={'selectFilter'} resourceData={Resources?.Gender}/>,
                    render:i=><>{t(Resources?.Gender.find(e => e.id == i).name) }</>
                },
                ,
                // Conditionally include "Apps" columns based on isAdmin
                ...(selectedRole.key === 'super' || selectedRole.key === 'super-admin' ? [
                  {
                      title:t('Apps'),
                      dataIndex:'no_of_appointments',
                      sorter:true,
                      key:'apps',
                  },
                  {
                      title:t('Finished apps'),
                      dataIndex:'no_of_appointments_finished',
                      sorter:true,
                      key:'apps_finished',
                  }
                ] : []),
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
            ].filter(e=>e !== undefined)} title={t('Patients')}/>
        </div>
    )
}
export default Patients;
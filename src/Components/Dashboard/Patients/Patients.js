import ResourceTable from "../../Fragments/ResourceTable";
import {t} from "i18next";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import DateParser from "../../Fragments/DateParser";
import React from "react";

function Patients() {


    return(
        <div>
            <ResourceTable resource={'Patient'}
                           editStyle={true}
                           exportDatabase={false}
                           eyeShow={true}
                           addBtn={false}
                           except={{
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
            ]} title={t('Patients')}/>
        </div>
    )
}
export default Patients;
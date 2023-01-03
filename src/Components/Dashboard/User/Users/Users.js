import React from 'react'
import ResourceTable from "../../../Fragments/ResourceTable";
import TableFilterElement from "../../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
import DateParser from "../../../Fragments/DateParser";
function Users() {
    return(
        <div>
            <ResourceTable resource={'User'} tableColumns={[
                {
                    title:'ID',
                    dataIndex:'id',
                    key:'id',
                    sorter:true,
                },
                {
                    title:t('First Name'),
                    dataIndex:'first',
                    key:'First Name',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    title:t('Last Name'),
                    dataIndex:'last',
                    key:'Last Name',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:['created_at','iso_string'],
                    title:t('Create date'),
                    key:'date',
                    render:i=><DateParser date={i}/>
                },
            ]} title={t('Users')}/>
        </div>
    )
}
export default Users;

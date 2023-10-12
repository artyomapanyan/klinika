import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
import DateParser from "../../Fragments/DateParser";
import PermCheck from "../../Fragments/PermCheck";
function Posts() {
    return(
        <div>
            <ResourceTable resource={'Post'}
                           except={{
                               delete: PermCheck(`Post:delete`) ? false : true,
                               edit: PermCheck(`Post:update`) ? false : true
                           }}

                           tableColumns={[
                {
                    title:'ID',
                    dataIndex:'id',
                    key:'id',
                    sorter:true,
                },
                {
                    title:t('Name'),
                    dataIndex:'title',
                    key:'title',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:['created_at','iso_string'],
                    title:t('Create date'),
                    key:'Create date',
                    render:i=><DateParser date={i}/>
                },
            ]} title={t('Posts')}/>
        </div>
    )
}
export default Posts;

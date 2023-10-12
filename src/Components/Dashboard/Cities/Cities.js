import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
import DateParser from "../../Fragments/DateParser";
import PermCheck from "../../Fragments/PermCheck";

function Cities() {
    return(
        <div>
            <ResourceTable resource={'City'}

                           except={{
                               delete: PermCheck(`City:delete`) ? false : true,
                               edit: PermCheck(`City:update`) ? false : true
                           }}

                           tableColumns={[
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

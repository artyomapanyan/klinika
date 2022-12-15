import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
function Countries(){
    return(
       <ResourceTable resource={'Country'} tableColumns={[
           {
               dataIndex:'id',
               title:'ID',
               key:'id',
               sorter:true,
           },
           {
               dataIndex:'name',
               title:t('Name'),
               key:'name',
               filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
               translatable:true,
               sorter:true,
           },
           {
               dataIndex:'date',
               title:t('Date'),
               key:'date',

           },
       ]} title={t('Countries')}/>
    )
}
export default Countries

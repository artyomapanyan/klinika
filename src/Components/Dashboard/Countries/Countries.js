import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
import DateParser from "../../Fragments/DateParser";
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
               dataIndex:['created_at','iso_string'],
               title:t('Date'),
                key:'date',
                    render:i=><DateParser date={i}/>

           },
       ]} title={t('Countries')}/>
    )
}
export default Countries

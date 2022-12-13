import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
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
               title:'Name',
               key:'name',
               filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
               translatable:true,
               sorter:true,
           },
           {
               dataIndex:'date',
               title:'Date',
               key:'date',

           },
       ]} title={'Countries'}/>
    )
}
export default Countries

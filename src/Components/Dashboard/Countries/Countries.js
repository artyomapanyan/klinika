import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
function Countries(){
    return(
       <ResourceTable resource={'Country'} tableColumns={[
           {
               dataIndex:'name',
               title:'Name',
               key:'name',
           },
       ]} title={'Countries'}/>
    )
}
export default Countries

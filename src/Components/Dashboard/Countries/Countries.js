import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
import DateParser from "../../Fragments/DateParser";
import PermCheck from "../../Fragments/PermCheck";
function Countries(){
    return(
       <ResourceTable resource={'Country'}
                      except={{
                          delete: PermCheck(`Country:delete`) ? false : true
                      }}

                      tableColumns={[
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

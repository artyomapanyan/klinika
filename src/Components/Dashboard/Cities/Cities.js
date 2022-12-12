import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import {Button} from "antd";
function Cities() {
    return(
        <div>
            <ResourceTable resource={'City'} tableColumns={[
                {
                    dataIndex:'id',
                    title:'ID',
                    key:'id',
                },
                {
                    dataIndex:'name',
                    title:'City',
                    key:'name',
                },
                {
                    dataIndex:['region','name'],
                    title:'Area',
                    key:'area',
                },
                {
                    dataIndex:['region','country','name'],
                    title:'Country',
                    key:'country',
                    // render:(e,record)=>{
                    //     return record.country.name
                    // }
                },
                {
                    dataIndex:'date',
                    title:'Create date',
                    key:'date',
                    // render:(e,record)=>{
                    //     return
                    // }
                },
            ]} title={'Cities'}/>
        </div>
    )
}
export default Cities;
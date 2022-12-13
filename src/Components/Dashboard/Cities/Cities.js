import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
function Cities() {
    return(
        <div>
            <ResourceTable resource={'City'} tableColumns={[
                {
                    title:'ID',
                    dataIndex:'id',
                    key:'id',
                    sorter:true,
                },
                {

                    title:'City',
                    dataIndex:'name',
                    key:'name',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:['region','name'],
                    title:'Area',
                    key:'area',
                    translatable:true,
                },
                {
                    dataIndex:['region','country','name'],
                    title:'Country',
                    key:'country',
                    translatable:true,
                },
                {
                    dataIndex:'date',
                    title:'Create date',
                    key:'date',
                },
            ]} title={'Cities'}/>
        </div>
    )
}
export default Cities;

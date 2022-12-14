import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import {Button} from "antd";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
function Regions() {
    return(
        <div>
            <div>
                <Button type={"primary"}>Print</Button>
            </div>
            <ResourceTable resource={'Region'} tableColumns={[
                {
                    dataIndex:'id',
                    title:'ID',
                    key:'id',
                    sorter:true,
                },
                {
                    dataIndex:'name',
                    title:'Area',
                    key:'name',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:['country', 'name'],
                    title:'Country',
                    key:'country',
                },
                {
                    dataIndex:'date',
                    title:'Create date',
                    key:'date',
                },
            ]} title={'Areas'}/>
        </div>
    )
}
export default Regions;

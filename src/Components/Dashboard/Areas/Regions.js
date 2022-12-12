import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import {Button} from "antd";
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
                    render:(e,record)=>{
                        return record.id;
                    }
                },
                {
                    dataIndex:'name',
                    title:'Area',
                    key:'area',

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
import React from 'react'
import {Button, Card, Space} from "antd";
import TFInput from "./Elements/TFInput";

function TableFilterElement({filterProps, type="input",resource, resourceData}){
    const onChangeValue =(e)=>{
        filterProps.setSelectedKeys(e?.toString())
    }
    const onFilter = ()=>{
        filterProps.confirm()
    }
    const onReset = ()=>{
        filterProps.setSelectedKeys(null)
        filterProps.confirm()

    }


    return <Card className={'card-filters'} title={<TFInput type={type} value={filterProps.selectedKeys} onChangeValue={onChangeValue} resourceData={resourceData} resource={resource} name={'country'}/>} >
        <Space><Button type={"primary"} htmlType={'button'} onClick={onFilter}>Filter</Button> <Button type={"secondary"} onClick={onReset}>Reset</Button></Space>
    </Card>
}
export default TableFilterElement

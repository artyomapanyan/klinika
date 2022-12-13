import React from 'react'
import {Button, Card, Space} from "antd";
import TFInput from "./Elements/TFInput";

function TableFilterElement({filterProps}){
    const onChangeValue =(e)=>{
        filterProps.setSelectedKeys(e)
    }
    const onFilter = ()=>{
        filterProps.confirm()
    }
    const onReset = ()=>{
        filterProps.setSelectedKeys(null)
        filterProps.confirm()

    }
    return <Card title={<TFInput value={filterProps.selectedKeys} onChangeValue={onChangeValue}/>} >
        <Space><Button type={"primary"} onClick={onFilter}>Filter</Button> <Button type={"secondary"} onClick={onReset}>Reset</Button></Space>
    </Card>
}
export default TableFilterElement

import React from 'react'
import {Button, Card, Space} from "antd";
import TFInput from "./Elements/TFInput";

function TableFilterElement({filterProps}){
    const onChangeValue =(e)=>{
        filterProps.setSelectedKeys(e)
    }
    const onFilter = ()=>{
        console.log(filterProps)
        filterProps.confirm()
    }
    return <Card title={<TFInput onChangeValue={onChangeValue}/>} >
        <Space><Button type={"primary"} onClick={onFilter}>Filter</Button> </Space>
    </Card>
}
export default TableFilterElement

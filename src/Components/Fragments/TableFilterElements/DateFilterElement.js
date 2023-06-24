import {Button, Card, Space} from "antd";
import TFInput from "./Elements/TFInput";
import React from "react";
import FormInput from "../FormInput";

function DateFilterElement({filterProps, type="input",resource}){
    console.log(filterProps, 'ddddd')
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

    console.log(filterProps, 'ddddd')

    return <Card className={'card-filters'} title={<FormInput inputType={'date'}  type={type} value={filterProps.selectedKeys} onChangeValue={onChangeValue} resource={resource} name={'country'}/>} >
        <Space><Button type={"primary"} htmlType={'button'} onClick={onFilter}>Filter</Button> <Button type={"secondary"} onClick={onReset}>Reset</Button></Space>
    </Card>
}
export default DateFilterElement
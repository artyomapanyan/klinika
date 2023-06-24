import {Button, Card, Space} from "antd";
import TFInput from "./Elements/TFInput";
import React from "react";
import FormInput from "../FormInput";
import dayjs from "dayjs";

function DateFilterElement({filterProps, type="date",resource}){
    const onChangeValue =(e)=>{
        filterProps.setSelectedKeys(dayjs(e).format('DD-MM-YYYY').toString())
        console.log(dayjs(e).format('DD'), 'd')
    }
    const onFilter = ()=>{
        filterProps.confirm()
    }
    const onReset = ()=>{
        filterProps.setSelectedKeys(null)
        filterProps.confirm()

    }


    return <Card className={'card-filters'} title={<TFInput  type={'date'} onChangeValue={onChangeValue} resource={resource} name={'country'}/>} >
        <Space><Button type={"primary"} htmlType={'button'} onClick={onFilter}>Filter</Button> <Button type={"secondary"} onClick={onReset}>Reset</Button></Space>
    </Card>
}
export default DateFilterElement
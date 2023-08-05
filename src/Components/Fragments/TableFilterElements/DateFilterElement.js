import {Button, Card, Space} from "antd";
import TFInput from "./Elements/TFInput";
import React from "react";
import FormInput from "../FormInput";
import dayjs from "dayjs";

function DateFilterElement({filterProps, type="date",resource}){
    const onChangeValue =(e)=>{
        filterProps.setSelectedKeys(dayjs(e).format('YYYY-MM-DD').toString())

    }
    const onFilter = ()=>{
        filterProps.confirm()
    }
    const onReset = ()=>{
        filterProps.setSelectedKeys(null)
        filterProps.confirm()

    }


    return <div className={'date-filters-div'}>
        <div>
            <TFInput  type={'date'} onChangeValue={onChangeValue} resource={resource} name={'country'}/>
        </div>
        <div style={{display: 'flex', gap: 10, marginTop: 20}}>
            <Button size={'large'} type={"primary"} htmlType={'button'} onClick={onFilter} style={{width: '100%'}}>Filter</Button>
            <Button size={'large'} style={{width: '100%'}} type={"secondary"} onClick={onReset}>Reset</Button>
        </div>
    </div>
}
export default DateFilterElement
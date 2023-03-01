import React from 'react';
import {DatePicker, Input, InputNumber} from "antd";
const { TextArea } = Input;

function CInput({ value, onChange,label, inputProps,type}){


    return <div className={'flying-label'}>
        {type==='password'? <Input {...inputProps} size={'large'} value={value} onChange={onChange} placeholder={' '} type={'password'}/>:
         type==='date' ? <DatePicker   {...inputProps} format={'DD-MM-YYYY'} placeholder={' '} style={{width: '100%', height: 48}}/>:
         type === 'number' ? <Input type={'number'}  {...inputProps} size={'large'} value={value} onChange={onChange} placeholder={' '} style={{width:'100%'}}/> :
         <Input {...inputProps} size={'large'} value={value} onChange={onChange} placeholder={' '}  style={{paddingLeft:16}} />}
        <label >{label}</label>
    </div>;
}
export default CInput
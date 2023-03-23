import React from 'react';
import {DatePicker, Form, Input} from "antd";


function CInput({label, inputProps,type,isRequired}){



    return <div className={'flying-label'}>
        {type==='password'? <Input {...inputProps} size={'large'} placeholder={' '} type={'password'}/>:
         type==='date' ? <DatePicker   {...inputProps} format={'DD-MM-YYYY'} placeholder={' '} style={{width: '100%', height: 48}}/>:
         type === 'number' ? <Input type={'number'}  {...inputProps} size={'large'} placeholder={' '} style={{width:'100%'}}/> :
         <Input {...inputProps} size={'large'} placeholder={' '}  style={{paddingLeft:17}} />}
        <label className={'input_label '+(isRequired?'ant-form-item-required':'')}>{label}</label>
    </div>;
}
export default CInput
import React from 'react';
import {DatePicker, Form, Input} from "antd";


function CInput({inputDisabled, value, onChange,label, inputProps,type,isRequired}){



    return <div className={'flying-label'}>
        {type==='password'? <Input {...inputProps} size={'large'} maxLength={50} value={value} onChange={onChange} placeholder={' '} type={'password'}/>:
         type==='date' ? <DatePicker   {...inputProps} format={'DD-MM-YYYY'} placeholder={' '} style={{width: '100%', height: 48}}/>:
         type === 'number' ? <Input type={'number'} maxLength={50}  {...inputProps} size={'large'} value={value} onChange={onChange} placeholder={' '} style={{width:'100%'}}/> :
         <Input {...inputProps} disabled={inputDisabled} maxLength={50} size={'large'} value={value} onChange={onChange} placeholder={' '}  style={{paddingLeft:16}} />}
        <label >{label}</label>
    </div>;
}
export default CInput
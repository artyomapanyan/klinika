import React from 'react';
import {DatePicker, Form, Input} from "antd";


function CInput({inputDisabled, value, onChange,label, inputProps,type,isRequired, maxLength=50, max, min}){



    return <div className={'flying-label'}>
        {type==='password'? <Input {...inputProps} size={'large'} maxLength={maxLength} disabled={inputDisabled} value={value} onChange={onChange} placeholder={' '} type={'password'}/>:

         type === 'number' ? <Input disabled={inputDisabled} max={max} min={min} type={'number'} maxLength={maxLength}  {...inputProps} size={'large'} value={value} onChange={onChange} placeholder={' '} style={{width:'100%'}}/> :
         <Input {...inputProps} disabled={inputDisabled} maxLength={maxLength} size={'large'} value={value} onChange={onChange} placeholder={' '}  style={{paddingLeft:16}} />}
        <label >{label}</label>
    </div>;
}
export default CInput
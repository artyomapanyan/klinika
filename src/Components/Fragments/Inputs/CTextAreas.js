import React from 'react';
import {Input} from "antd";
const { TextArea } = Input;

function CTextAreas({ value, onChange,label, inputProps,isRequired}){


    return <div className={'flying-label-textarea'}>

        <TextArea {...inputProps} size={'large'} value={value} onChange={onChange} placeholder={' '}  style={{paddingLeft:16}} />
        <label  className={(isRequired?'ant-form-item-required':'')}>{label}</label>
    </div>;
}
export default CTextAreas
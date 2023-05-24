import React from 'react';
import {Input} from "antd";
const { TextArea } = Input;

function CTextAreas({ value, onChange,label, inputProps,isRequired, inputDisabled, textareaHeight}){


    return <div className={'flying-label-textarea'}>

        <TextArea {...inputProps} size={'large'} value={value} disabled={inputDisabled} onChange={onChange} placeholder={' '}  style={{paddingLeft:16, borderRadius:12, height: textareaHeight ? 198 : 130}} />
        <label  className={(isRequired?'ant-form-item-required':'')}>{label}</label>
    </div>;
}
export default CTextAreas
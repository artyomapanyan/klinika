import React from 'react';
import {Input} from "antd";
import {useSelector} from "react-redux";
const { TextArea } = Input;

function CTextAreas({ value, onChange,label, inputProps,isRequired, inputDisabled, textareaHeight, castomReq}){
    let language = useSelector((state) => state.app.current_locale)

    return <div className={'flying-label-textarea'}>

        <TextArea {...inputProps} size={'large'} value={value} disabled={inputDisabled} onChange={onChange} placeholder={' '}  style={{paddingLeft:16, borderRadius:12, height: textareaHeight ? 198 : 130}} />
        <label   className={(isRequired?'ant-form-item-required':'')}><span style={{color: 'red'}}>{castomReq ? "* " : ''}</span>{label}</label>
    </div>;
}
export default CTextAreas
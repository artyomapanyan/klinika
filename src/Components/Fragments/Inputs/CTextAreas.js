import React from 'react';
import {Input} from "antd";
const { TextArea } = Input;

function CTextAreas({ value, onChange,label, inputProps}){


    return <div className={'flying-label-textarea'}>

        <TextArea {...inputProps} size={'large'} value={value} onChange={onChange} placeholder={' '}  style={{paddingLeft:16}} />
        <label >{label}</label>
    </div>;
}
export default CTextAreas
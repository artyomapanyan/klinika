import React, {useState} from 'react'
import {Form, Input} from "antd";

function FormInput({name,label}){
    const [focused,setFocused] = useState(false);
    const [value,setValue] = useState(false);
    return<Form.Item className={`input-placeholder ${focused || value?.length?'input-focused':''}`} name={name} label={label}>
        <Input onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} onChange={e=>setValue(e.target.value)}/>
    </Form.Item>
}
export default FormInput

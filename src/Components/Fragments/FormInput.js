import React, {useState} from 'react'
import {Form, Input} from "antd";

function FormInput({name,label,initialValue}){
    const [focused,setFocused] = useState(false);
    const [value,setValue] = useState(initialValue);
    return<Form.Item initialValue={initialValue} className={`input-placeholder ${focused || value?.length?'input-focused':''}`} name={name} label={label}>
        <Input onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} onChange={e=>setValue(e.target.value)}/>
    </Form.Item>
}
export default FormInput

import React, {useState} from 'react'
import {Form, Input} from "antd";
import {useSelector} from "react-redux";

function FormInput({name,label,initialValue}){
    let lngs = useSelector((state) => state?.languageState);

    const [focused,setFocused] = useState(false);
    const [value,setValue] = useState(initialValue);
    return<Form.Item initialValue={initialValue} className={lngs !== "en" ? `input-placeholder-ar ${focused || value?.length?'input-focused':''}` : `input-placeholder ${focused || value?.length?'input-focused':''}`} name={name} label={label}>
        <Input onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} onChange={e=>setValue(e.target.value)}/>
    </Form.Item>
}
export default FormInput

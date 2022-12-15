import React, {useEffect, useRef, useState} from 'react'
import {Form, Input} from "antd";
import {useSelector} from "react-redux";

function FormInput({name,label,initialValue,inputProps={},FormProps={}}){
    const inputRef = useRef();
    let lngs = useSelector((state) => state?.languageState);

    const [focused,setFocused] = useState(false);
    const [value,setValue] = useState(initialValue);

/*    useEffect(()=>{
        inputRef.current.focus()
    },[])*/
    return<Form.Item  initialValue={initialValue}  className={`input-placeholder ${focused || value?.length?'input-focused':''}`} name={name} label={label}>
        <Input  {...inputProps} ref={inputRef} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} onInput={e=>setValue(e.target.value)}/>
    </Form.Item>
}
export default FormInput

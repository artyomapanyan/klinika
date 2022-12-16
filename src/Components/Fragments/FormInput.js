import React, {useRef, useState} from 'react'
import {Form, Input} from "antd";

function FormInput({name,label,initialValue,inputProps={},FormProps={},inputType}){
    const inputRef = useRef();

    const [focused,setFocused] = useState(false);
    const [value,setValue] = useState(initialValue);
    const handleReturnInput = ()=>{
        switch (inputType){
            case 'password':
                return <Input.Password
                    {...inputProps} ref={inputRef} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                    onInput={e => setValue(e.target.value)}
                    iconRender={inputProps.iconRender}
                    style={{position: 'static'}}
                />
            default:
             return  <Input  {...inputProps} ref={inputRef} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                        onInput={e => setValue(e.target.value)}/>
        }
    }
    return (
        <div>
           <Form.Item initialValue={initialValue}
                                           className={`input-placeholder ${focused || value?.length ? 'input-focused' : ''}`}
                                           name={name} label={label}>
               {handleReturnInput()}
            </Form.Item>
        </div>
    )



}
export default FormInput

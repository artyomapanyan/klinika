import React, {useState} from 'react'
import {DatePicker, Form, Input} from "antd";
import ResourceSelectPaginated from "./ResourceSelectPaginated";

const NoForm = ['resourceSelect']

function FormInput({name, label, rules, initialValue, inputProps = {}, inputType, initialData = [], resource}) {

    const [focused, setFocused] = useState(true);
    const [value, setValue] = useState(initialValue);
    const handleReturnInput = () => {
        switch (inputType) {
            case 'password':
                return <Input.Password
                    {...inputProps} onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onInput={e => setValue(e.target.value)}
                    iconRender={inputProps.iconRender}
                    style={{position: 'static'}}
                />
            case 'date':
                return <DatePicker   {...inputProps}
                                     placeholder={' '}
                                     onFocus={() => setFocused(true)}
                                     onBlur={() => setFocused(false)}
                                     onChange={e => setValue(e)}/>
            case 'resourceSelect':
                return <ResourceSelectPaginated name={name} label={label} rules={rules}
                                                formItemClass={`input-placeholder ${focused || value ? 'input-focused' : ''}`}
                                                resource={resource} initialData={initialData} inputProps={{
                    onFocus: () => setFocused(true),
                    onChange: e => setValue(e),
                    onBlur: () => setFocused(false),
                }}/>
            default:
                return <Input {...inputProps} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                              onInput={e => setValue(e.target.value)}/>
        }
    }
    console.log(focused || value)
    return (
        <div>
            {NoForm.includes(inputType) ? handleReturnInput() : <Form.Item initialValue={initialValue}
                                                                           className={`input-placeholder ${focused || value ? 'input-focused' : ''} ${inputType}`}
                                                                           name={name} label={label} rules={rules}>
                {handleReturnInput()}
            </Form.Item>}
        </div>
    )


}

export default FormInput

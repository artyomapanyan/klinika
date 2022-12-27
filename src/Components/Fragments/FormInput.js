import React, {useState} from 'react'
import {DatePicker, Form, Input} from "antd";
import ResourceSelectPaginated from "./ResourceSelectPaginated";

const NoForm = ['resourceSelect']

function FormInput({name, label, rules, initialValue, inputProps = {},
                       inputType, initialData = [], resource,resourceParams={}}) {

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
            case 'textArea':
                return <Input.TextArea   {...inputProps}
                                     placeholder={' '}
                                     onFocus={() => setFocused(true)}
                                     onBlur={() => setFocused(false)}
                                     onChange={e => setValue(e?.target.value)}/>
            case 'resourceSelect':
                return <ResourceSelectPaginated {...inputProps} name={name} label={label} rules={rules}
                                                resourceParams={resourceParams}
                                                initialValue={initialValue}
                                                formItemClass={`input-placeholder ${focused || value ? 'input-focused' : ''}`}
                                                resource={resource} initialData={initialData}  inputProps={{
                    onFocus: () => setFocused(true),
                    onChange: e =>{
                        setValue(e)
                        if(inputProps.onChange){
                            inputProps.onChange(e)
                        }
                    },
                    onBlur: () => setFocused(false),
                    mode:inputProps.mode
                }}/>
            default:
                return <Input {...inputProps} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                              onInput={e => setValue(e.target.value)}/>
        }
    }
    let flyPlaceholder = focused || (Array.isArray(value)?value.length:value)
    return (
        <div>
            {NoForm.includes(inputType) ? handleReturnInput() : <Form.Item initialValue={initialValue}
                                                                           className={`input-placeholder ${flyPlaceholder ? 'input-focused' : ''} ${inputType}`}
                                                                           name={name} label={label} rules={rules}>
                {handleReturnInput()}
            </Form.Item>}
        </div>
    )


}

export default FormInput

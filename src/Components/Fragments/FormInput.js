import React, {useState} from 'react'
import {DatePicker, Form, Input, InputNumber} from "antd";
import ResourceSelectPaginated from "./ResourceSelectPaginated";
import dayjs from "dayjs";

const NoForm = ['resourceSelect']

function FormInput({name, label, rules, initialValue, inputProps = {},
                       inputType, initialData = [], resource,resourceParams={},initialFocused=false, inputNumberStyle}) {
    if(inputType==='date'){
        if(initialValue?.iso_string){
            initialValue =initialValue?.iso_string?dayjs(initialValue?.iso_string):null
        }else{
            if(initialValue){
                initialValue =initialValue?dayjs(initialValue):null
            }else{
                initialValue = null
            }

        }

    }
    const [focused, setFocused] = useState(initialFocused);
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
                                     format={'DD-MM-YYYY'}
                                     placeholder={' '}
                                     onFocus={() => setFocused(true)}
                                     onBlur={() => setFocused(false)}
                                     onChange={e => setValue(e)}
                                     style={{width:'100%', height:48}}
                />
            case 'textArea':
                return <Input.TextArea   {...inputProps}
                                     placeholder={' '}
                                     onFocus={() => setFocused(true)}
                                     onBlur={() => setFocused(false)}
                                     onChange={e => setValue(e?.target.value)}
                                     style={{height:100}}
                />
            case 'number':
                return <InputNumber   {...inputProps}
                                         placeholder={' '}
                                         onFocus={() => setFocused(true)}
                                         onBlur={() => setFocused(false)}
                                         onChange={e => setValue(e)}
                                         style={inputNumberStyle}/>
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

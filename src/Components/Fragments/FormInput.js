import React, {useState} from 'react'
import {DatePicker, Form} from "antd";
import ResourceSelectPaginated from "./ResourceSelectPaginated";
import dayjs from "dayjs";
import CInput from "./Inputs/CInput";
import CTextAreas from "./Inputs/CTextAreas";

const NoForm = ['resourceSelect'];


function FormInput({
                       name, label, rules, initialValue, inputProps = {},
                       resourceSelectStyle,
                       disabled,
                       options,
                       disabledDate,
                       inputType, initialData = [],
                       resource, resourceParams = {},
                       initialFocused = false,
                       inputNumberStyle,
                       resourceData,
                       handleMapItems

                   }) {
    if (inputType === 'date') {
        if (initialValue?.iso_string) {
            initialValue = initialValue?.iso_string ? dayjs(initialValue?.iso_string) : null
        } else {
            if (initialValue) {
                initialValue = initialValue ? dayjs(initialValue) : null
            } else {
                initialValue = null
            }

        }

    }
    const [focused, setFocused] = useState(initialFocused);
    const [value, setValue] = useState(initialValue);

    const handleReturnInput = () => {
        const isRequired= rules?.find(e=>e.required)
        switch (inputType) {
            case 'password':
                return <CInput isRequired={isRequired} label={label} inputProps={inputProps} type={'password'}/>
            case 'date':
                return <DatePicker   {...inputProps}
                                     format={'DD-MM-YYYY'}
                                     placeholder={' '}
                                     onFocus={() => setFocused(true)}
                                     onBlur={() => setFocused(false)}
                                     onChange={e => setValue(e)}
                                     disabledDate={disabledDate}
                                     style={{width: '100%', height: 48}}
                />
            case 'textArea':
                return <CTextAreas isRequired={isRequired} label={label} inputProps={inputProps} type={'textArea'}/>
            case 'number':
                return <CInput isRequired={isRequired} label={label} inputProps={inputProps} type={'number'}/>
            case 'resourceSelect':
                return <ResourceSelectPaginated {...inputProps} name={name} label={label} rules={rules}
                                                resourceSelectStyle={resourceSelectStyle}
                                                options={options}
                                                disabled={disabled}
                                                resourceParams={resourceParams}
                                                initialValue={initialValue}
                                                formItemClass={`input-placeholder ${focused || value ? 'input-focused' : ''}`}
                                                resource={resource} initialData={initialData}
                                                resourceData={resourceData}
                                                handleMapItems={handleMapItems}
                                                inputProps={{
                                                    onFocus: () => setFocused(true),
                                                    onChange: e => {
                                                        setValue(e)
                                                        if (inputProps.onChange) {
                                                            inputProps.onChange(e)
                                                        }
                                                    },
                                                    onBlur: () => setFocused(false),
                                                    mode: inputProps.mode
                                                }}/>

            default:
                return <CInput isRequired={isRequired} label={label} inputProps={inputProps}/>
        }
    }
    let isDate = inputType==='date';
    let flyPlaceholder = isDate&&(focused || (Array.isArray(value) ? value.length : value))


    return (
        <div>
            {NoForm.includes(inputType) ? handleReturnInput() : <Form.Item initialValue={initialValue}
                                                                           preserve={false}
                                                                           className={`input-placeholder ${flyPlaceholder ? 'input-focused' : ''}`}
                                                                           label={isDate?label:null}
                                                                           name={name}
                                                                           rules={rules}>
                {handleReturnInput()}
            </Form.Item>}
        </div>
    )
}

export default FormInput

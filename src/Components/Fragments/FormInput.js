import React, {useEffect, useState} from 'react'
import {DatePicker, Form} from "antd";
import ResourceSelectPaginated from "./ResourceSelectPaginated";
import dayjs from "dayjs";
import CInput from "./Inputs/CInput";
import CTextAreas from "./Inputs/CTextAreas";

const NoForm = ['resourceSelect'];


function FormInput({
                       name, label, rules, initialValue, inputProps = {},
                       customSearchKey,
                       resourceSelectStyle,
                       searchConfigs,
                       inputDisabled,
                       disabled,
                       extra,
                       options,
                       disabledDate,
                       inputType, initialData = [],
                       resource, resourceParams = {},
                       initialFocused = false,
                       resourceData,
                       handleMapItems,
                       maxLength,
                       min,
                       max,
                       className,
                       onChange,
                       textareaHeight=false,
                       suffixIcon,
                       castomReq,


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
    useEffect(()=>{
       if(dayjs.isDayjs(initialValue) && dayjs.isDayjs(value) ){
           if(initialValue.format('DD-MM-YYYY')!==value?.format('DD-MM-YYYY')){
               setValue(initialValue)
           }
       }else{
           setValue(initialValue)
       }
    },[initialValue])
    const [focused, setFocused] = useState(initialFocused);
    const [value, setValue] = useState(initialValue);

    const handleReturnInput = () => {
        const isRequired = rules?.find(e => e.required)
        switch (inputType) {
            case 'password':
                return <CInput maxLength={maxLength} isRequired={isRequired} label={label} inputProps={inputProps}
                               inputDisabled={inputDisabled} type={'password'}/>
            case 'date':
                return <DatePicker   {...inputProps}
                                     format={'DD-MM-YYYY'}
                                     placeholder={' '}
                                     onFocus={() => setFocused(true)}
                                     onBlur={() => setFocused(false)}
                                     onChange={e =>{
                                         if (inputProps.onChange) {
                                             inputProps.onChange(e)
                                         }
                                         setValue(e)
                                     }}
                                     suffixIcon={suffixIcon}
                                     disabled={inputDisabled}
                                     disabledDate={disabledDate}
                                     style={{width: '100%', height: 48}}
                />
            case 'textArea':
                return <CTextAreas castomReq={castomReq} isRequired={isRequired} label={label} inputProps={inputProps} textareaHeight={textareaHeight}
                                   inputDisabled={inputDisabled} type={'textArea'}/>
            case 'number':
                return <CInput className={className} maxLength={maxLength} inputDisabled={inputDisabled} isRequired={isRequired} label={label}
                               inputProps={inputProps} type={'number'} min={min} max={max}/>
            case 'resourceSelect':
                return <ResourceSelectPaginated {...inputProps} name={name} label={label} rules={rules}
                                                resourceSelectStyle={resourceSelectStyle}
                                                suffixIcon={suffixIcon}
                                                options={options}
                                                extra={extra}
                                                disabled={disabled}
                                                searchConfigs={searchConfigs}
                                                resourceParams={resourceParams}
                                                customSearchKey={customSearchKey}
                                                initialValue={initialValue}
                                                formItemClass={`input-placeholder ${focused || value || value===0 ? 'input-focused' : ''}`}
                                                resource={resource} initialData={initialData}
                                                resourceData={resourceData}
                                                handleMapItems={handleMapItems}
                                                inputProps={{
                                                    onFocus: () => setFocused(true),
                                                    onChange: (e,data) => {
                                                        setValue(e)
                                                        if (inputProps.onChange) {
                                                            inputProps.onChange(e,data)
                                                        }
                                                    },
                                                    onBlur: () => setFocused(false),
                                                    mode: inputProps.mode
                                                }}/>

            default:
                return <CInput onChange={onChange} className={className} maxLength={maxLength} inputDisabled={inputDisabled} isRequired={isRequired} label={label}
                               inputProps={inputProps}/>
        }
    }
    let isDate = inputType === 'date';
    let flyPlaceholder = isDate && (focused || (Array.isArray(value) ? value.length : value))


    return (
        <div>
            {NoForm.includes(inputType) ? handleReturnInput() : <Form.Item initialValue={initialValue}
                                                                           preserve={false}
                                                                           extra={extra}
                                                                           className={`input-placeholder ${flyPlaceholder ? 'input-focused' : ''}`}
                                                                           label={isDate ? label : null}
                                                                           name={name}
                                                                           rules={rules}>
                {handleReturnInput()}
            </Form.Item>}
        </div>
    )
}

export default FormInput

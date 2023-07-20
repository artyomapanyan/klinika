import React, {useState} from 'react';
import {Input} from "antd/lib";
import ResourceSelectPaginated from "../../ResourceSelectPaginated";
import {DatePicker} from "antd";
import {t} from "i18next";
import calendar_black_icon from "../../../../dist/icons/calendar_black_icon.png";
import FormInput from "../../FormInput";
function TFInput({onChangeValue,value,type, resource, name, initialFocused=false}){
    const [focused, setFocused] = useState(initialFocused);

    const onInputTypeChange = () => {
        if(type === 'selectFilter') {
            return <ResourceSelectPaginated
                inputProps={{
                    onChange:onChangeValue
                }}
                resource={resource}
                name={name}
            />;
        }
        if(type === 'input') {
            return <Input value={value} onChange={e=>onChangeValue(e.target.value)}/>
        }
        if(type === 'date') {
          return <DatePicker
                               format={'DD-MM-YYYY'}
                               placeholder={'Select Date'}

                               onFocus={() => setFocused(true)}
                               onBlur={() => setFocused(false)}
                               onChange={e=>onChangeValue(e)}
                               suffixIcon={<img alt={'calendar_black_icon'} src={calendar_black_icon}/>}
                               value={value}
                               style={{width: '100%', height: 45}}
          />
            // <DatePicker value={value} onChange={e=>onChangeValue(e)}/>
        }
    }


    return onInputTypeChange()
}
export default TFInput

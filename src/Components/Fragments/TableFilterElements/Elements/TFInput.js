import React from 'react';
import {Input} from "antd/lib";
import ResourceSelectPaginated from "../../ResourceSelectPaginated";
import {DatePicker} from "antd";
function TFInput({onChangeValue,value,type, resource, name}){

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
          return  <DatePicker value={value} onChange={e=>onChangeValue(e)}/>
        }
    }


    return onInputTypeChange()
}
export default TFInput

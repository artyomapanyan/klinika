import React from 'react';
import {Input} from "antd/lib";
import ResourceSelectPaginated from "../../ResourceSelectPaginated";
function TFInput({onChangeValue,value,type='input', resource, name}){

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
    }

    return onInputTypeChange()
}
export default TFInput

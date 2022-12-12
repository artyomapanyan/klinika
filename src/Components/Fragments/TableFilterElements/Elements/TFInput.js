import React from 'react';
import {Input} from "antd/lib";
function TFInput({onChangeValue}){

    return <Input onChange={e=>onChangeValue(e.target.value)}/>
}
export default TFInput

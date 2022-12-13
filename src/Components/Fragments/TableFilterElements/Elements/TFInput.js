import React from 'react';
import {Input} from "antd/lib";
function TFInput({onChangeValue,value}){

    return <Input value={value} onChange={e=>onChangeValue(e.target.value)}/>
}
export default TFInput

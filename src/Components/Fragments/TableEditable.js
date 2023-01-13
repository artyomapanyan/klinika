import React, {useState} from 'react'
import {useSelector} from "react-redux";
import {updateResource} from "../Functions/api_calls";
import {t} from "i18next";
import FormInput from "./FormInput";
import {Spin} from "antd";
function TableEditable({resource,record,initialData,inputType,value,label,updateKey}){
    let token = useSelector((state) => state?.auth?.token);
    const [loading,setLoading] = useState({});

    const statusChange = (values) => {
        setLoading({
            [record.id]:true
        })
        updateResource(resource,record.id,values,token).then(() => {
            setLoading({})
        })
    }
    return  loading[record.id]?<Spin/>:<FormInput name={[record.id,updateKey]}
                       initialData={initialData}
                       initialValue={value}
                       inputType={inputType}
                       label={t(label)}
                       inputProps={{
                           onChange:(e)=>statusChange({
                               ...record,
                               [updateKey]:e??null
                           }),
                           updateLoading:loading[record.id],
                           disableClear:true
                       }} />
}
export default TableEditable

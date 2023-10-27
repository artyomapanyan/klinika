import {useSelector} from "react-redux";
import React, {useState} from "react";
import {postResource} from "../Functions/api_calls";
import {Switch} from "antd";
import PermCheck from "./PermCheck";


function SwitchStatus({items=[],initialValue,onChange=null, resource, record,name, switchDisabled=false}){
    let token = useSelector((state) => state?.auth?.token);

    const [value,setValue] = useState(initialValue);
    const [loading,setLoading] = useState(false);


    const onClick = (e) => {
        console.log(e)
            setLoading(true)
            postResource(resource,'updateField',token,record.id,{
                key:name,
                value:e ? 2 : 1,
                //[name]:e.key
            }).then(() => {
                setLoading(false)
            })
    }




    return(
        <div className={'d'}><Switch disabled={PermCheck(`Invoice:update`) ? false : true} onChange={onClick}  defaultChecked={record?.status == '2' ? true : false}/></div>


    )
}
export default SwitchStatus
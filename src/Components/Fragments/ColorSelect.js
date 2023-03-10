import React, {useState} from 'react'
import {Dropdown, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";
import {postResource} from "../Functions/api_calls";
import {useSelector} from "react-redux";

function ColorSelect({items=[],initialValue,onChange=null, resource, record,name}){
    let token = useSelector((state) => state?.auth?.token);

    const [value,setValue] = useState(initialValue);
    const [loading,setLoading] = useState(false);


    const onClick = (e) => {
        if(onChange) {
            onChange(e.key)
        }else{
            setValue(e.key)
            setLoading(true)
            postResource(resource,'updateField',token,record.id,{
                key:name,
                value:e.key,
            //[name]:e.key
            }).then(() => {
                setLoading(false)
            })
        }


    }
    return<Dropdown
        menu={{
            onClick,
            items
        }}
        trigger={['click']}
    >
        <Space direction={'horizontal'} style={{cursor:"pointer", backgroundColor:value === '2' ? "#ce4e99" : "#a7a8a7", padding:10, borderRadius:30, width:150, display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <div style={{color:"#FFFFFF", fontWeight:700}}>{items.find(e=>e.key===value)?.label}</div>
            <div style={{color:"#FFFFFF", fontWeight:700}}><DownOutlined /></div>
        </Space>
    </Dropdown>

}
export default ColorSelect

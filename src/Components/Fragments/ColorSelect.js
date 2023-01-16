import React, {useState} from 'react'
import {Dropdown, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";

function ColorSelect({items=[],initialValue,onChange=null}){
    const [value,setValue] = useState(initialValue);
    return <Dropdown
        menu={{
            onClick:e=>{
                if(onChange) {
                    onChange(e.key)
                }
                setValue(e.key)
            },
            items
        }}
        trigger={['click']}
    >
        <Space direction={'horizontal'} style={{cursor:"pointer", backgroundColor:"red", padding:10, borderRadius:30, width:150, display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <div style={{color:"#FFFFFF", fontWeight:700}}>{items.find(e=>e.key===value)?.label}</div>
            <div style={{color:"#FFFFFF", fontWeight:700}}><DownOutlined /></div>
        </Space>
    </Dropdown>
}
export default ColorSelect

import React, {useState} from 'react'
import {Dropdown, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";
import {postResource} from "../Functions/api_calls";
import {useSelector} from "react-redux";
import Preloader from "../Preloader";

function ColorSelect({items=[],initialValue,onChange=null, resource, record,name, height=false, colorSelectDisabled=false, lo}){
    let token = useSelector((state) => state?.auth?.token);

    const [value,setValue] = useState(initialValue);
    const [loading,setLoading] = useState(false);


    const onClick = (e) => {
        if(onChange) {
            onChange(e.key,record)
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

    let colors = [
        {
            key: 0,
            name: '#c9c953'
        },
        {
            key: 1,
            name: '#5ab5ed'
        },
        {
            key: 2,
            name: '#ce4e99'
        },
        {
            key: 3,
            name: '#a7a8a7'
        },
        {
            key: 4,
            name: '#9f70e6'
        },
        {
            key: 5,
            name: '#579651'
        },
        {
            key: 6,
            name: '#b04b3f'
        },
        {
            key: 7,
            name: '#b04b3f'
        },
    ]


    return(
        <div>
            {
                loading ? <Preloader/> : <Dropdown
                    menu={{
                        onClick,
                        items: items.filter((el) => el.key !== value)

                    }}
                    disabled={colorSelectDisabled ? colorSelectDisabled : items.length < 2}
                    trigger={['click']}

                >
                    <Space direction={'horizontal'} style={{cursor:"pointer", backgroundColor: `${colors.find(el => (el.key == value))?.name}`, padding:10, fontSize:14,  borderRadius:30, height: height ? 28 : null,  width: 143 , display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <div style={{color:"#FFFFFF", fontWeight:700}}>{items.find(e=>e.key===value)?.label}</div>
                        {
                            items.length < 2 ? <div></div> :<div style={{color:"#FFFFFF", fontWeight:700}}><DownOutlined /></div>
                        }

                    </Space>
                </Dropdown>
            }

        </div>



    )
}
export default ColorSelect

import {useSelector} from "react-redux";
import React, {useState} from "react";
import {postResource} from "../../../Functions/api_calls";
import {Dropdown, Space} from "antd";
import icon_review from "../../../../dist/icons/icon_review.png";
import Active_icon from "../../../../dist/icons/Active_icon.png";


function ClinicStatusSelect({items=[],initialValue,onChange=null, resource, record,name, height=false}){
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
            key: 2,
            name: '#4FB873'
        },
        {
            key: 3,
            name: '#F3A632'
        },

    ]


    return(
        <Dropdown
            menu={{
                onClick,
                items: items.filter((el) => el.key !== value)

            }}
            disabled={items.length < 2}
            trigger={['click']}

        >
            <Space direction={'horizontal'} style={{cursor:"pointer",  padding:10, fontSize:14,  borderRadius:30,  display:"flex", flexDirection:"row"}}>
                {

                    value === '2' ? <img alt={'Active_icon'} src={Active_icon}/> : <img alt={'icon_review'} src={icon_review}/>
                }
                <div style={{marginLeft: 7, color:`${colors.find(el => (el.key == value))?.name}`, fontWeight:400, fontSize:16, fontFamily: "Inter", marginTop:3}}>{items.find(e=>e.key===value)?.label}</div>


            </Space>
        </Dropdown>


    )
}
export default ClinicStatusSelect
import {AutoComplete, Avatar, Button, Drawer, Space, Tag} from "antd";
import {UserOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import ClinicManagerCalendarDrawerSmall from "./ClinicManagerCalendarDrawerSmall";
import ClinicManagerCalendarDrawerLarge from "./ClinicManagerCalendarDrawerLarge";

function CalendarInnCollapseModal() {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();


    let time = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00']

    const openDrawer = () => {
        setOpen(true);
        setSize('default');
    }

    const openLargeDrawer = () => {
        setOpen(true);
        setSize('large');
    }

    const options = [
        {
            value: <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}><div>Not found</div><Button type={'secondary'} style={{border:"none"}} onClick={openDrawer}>Create new</Button> </div>,
        },
        {
            value: "dddd"
        }
        ]

    return(
        <div>
            <Space>
                <h1 className={'h1'} >22 July</h1>
                <h1 style={{fontSize:28, fontWeight:200}}>Wed</h1>
            </Space>
            <div>
                {
                    time.map((el) => {
                        return <Tag color="#dee0df" size={'large'} style={{fontSize:17, fontWeight:550, color:"black", marginTop:20}}>{el}</Tag>
                    })
                }
            </div>
            <div style={{padding: 10, marginTop:20}}>
                <Space >
                    <Avatar size={50} icon={<UserOutlined />} />
                    <div style={{display:"block"}}>
                        <h3 className={'h1'}>Darrell Steward</h3>
                        <div>Pediatrics</div>
                    </div>
                </Space>
            </div>
            <div style={{padding: 10, marginTop:20}}>
                <AutoComplete
                    style={{width:'100%'}}
                    options={options}
                    placeholder="try to type `b`"
                    filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
            </div>
            <Drawer size={size}  title="Add Appointment" placement="right" onClose={()=>setOpen(false)} open={open}>
                {
                    size==="default"?<ClinicManagerCalendarDrawerSmall openLargeDrawer={openLargeDrawer}/> :<ClinicManagerCalendarDrawerLarge openDrawer={openDrawer}/>
                }


            </Drawer>

        </div>
    )
}
export default CalendarInnCollapseModal;
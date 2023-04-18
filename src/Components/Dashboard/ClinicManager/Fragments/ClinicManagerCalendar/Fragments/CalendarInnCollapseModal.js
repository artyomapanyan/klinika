import {AutoComplete, Avatar, Button, Drawer, Space, Tag} from "antd";
import {UserOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import ClinicManagerCalendarDrawerSmall from "./ClinicManagerCalendarDrawerSmall";
import ClinicManagerCalendarDrawerLarge from "./ClinicManagerCalendarDrawerLarge";
import dayjs from "dayjs";
import Resources from "../../../../../../store/Resources";
import {postResource} from "../../../../../Functions/api_calls";
import {useSelector} from "react-redux";

function CalendarInnCollapseModal({docItem,specialty,selectedDate,clinicID,speciality_id}) {

    const {doctor} = docItem;


    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();
    const [times,setTimes] = useState([]);
    let token = useSelector((state) => state.auth.token);
    let time = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00']
    useEffect(()=>{
        //todo hardcoded
        postResource('ClinicDoctorAvailableTimeForDayByDoctorAndClinic','single', token, docItem?.doctor.id + "/" +clinicID, {service:'clinic_visit', date:selectedDate}).then(response=>{
            setTimes(response.flat())
        })
    },[selectedDate,docItem])
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
                <h1 className={'h1'} >{dayjs(selectedDate).format('DD MMMM')}</h1>
                <h1 style={{fontSize:28, fontWeight:200}}>{Resources.Days[dayjs(selectedDate).day()]}</h1>
            </Space>
            <div>
                {
                    times.map((el) => {
                        return <Tag color="#dee0df" size={'large'} style={{fontSize:17, fontWeight:550, color:"black", marginTop:20}}>{el}</Tag>
                    })
                }
            </div>
            <div style={{padding: 10, marginTop:20}}>
                <Space >
                    <Avatar size={50} src={doctor?.avatar?.src} icon={<UserOutlined />} />
                    <div style={{display:"block"}}>
                        <h3 className={'h1'}>{doctor.first} {doctor.last}</h3>
                        <div>{specialty}</div>
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
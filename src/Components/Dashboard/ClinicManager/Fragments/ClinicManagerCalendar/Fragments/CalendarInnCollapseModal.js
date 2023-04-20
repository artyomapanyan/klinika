import { Avatar, Button, Drawer, Space, Tag} from "antd";
import {UserOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import ClinicManagerCalendarDrawerSmall from "./ClinicManagerCalendarDrawerSmall";
import ClinicManagerCalendarDrawerLarge from "./ClinicManagerCalendarDrawerLarge";
import dayjs from "dayjs";
import Resources from "../../../../../../store/Resources";
import {postResource} from "../../../../../Functions/api_calls";
import {useSelector} from "react-redux";

import FormInput from "../../../../../Fragments/FormInput";

function CalendarInnCollapseModal({docItem,specialty,selectedDate,clinicID,speciality_id}) {

    const {doctor} = docItem;


    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();
    const [times,setTimes] = useState([]);
    let token = useSelector((state) => state.auth.token);
    useEffect(()=>{
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
 const searchByNumber = (name,item)=>{

     name = <>{item.phone_number}{" "}{item.email}</>
     return [name, item]


 }
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
                <FormInput label={'Select Patient (Search By phone number)'} name={'patient_id'}
                           inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           resourceParams={{test: 1}}
                           searchConfigs={{minLength: 4}}
                           inputProps={{
                               notFoundContent:<div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}><div>Not found</div><Button type={'secondary'} style={{border:"none"}} onClick={openDrawer}>Create new</Button> </div>
                           }}
                           initialValue={null}
                           handleMapItems={(item, name, patientData) => searchByNumber(item, name, patientData)}
                           customSearchKey={'phone_number'}
                           resource={'User'}/>

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
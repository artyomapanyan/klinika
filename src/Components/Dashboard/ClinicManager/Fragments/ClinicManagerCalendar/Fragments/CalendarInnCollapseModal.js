import {Avatar, Button, Drawer, Form, Space, Radio} from "antd";
import {UserOutlined} from "@ant-design/icons";
import React, {useEffect, useRef, useState} from "react";
import ClinicManagerCalendarDrawerSmall from "./ClinicManagerCalendarDrawerSmall";
import ClinicManagerCalendarDrawerLarge from "./ClinicManagerCalendarDrawerLarge";
import dayjs from "dayjs";
import Resources from "../../../../../../store/Resources";
import {postResource} from "../../../../../Functions/api_calls";
import {useSelector} from "react-redux";

import FormInput from "../../../../../Fragments/FormInput";
import {t} from "i18next";
import Preloader from "../../../../../Preloader";
import {getServiceTypes} from "../../../../../../functions";

function CalendarInnCollapseModal({setDate,docItem, specialty, selectedDate, clinicID, speciality_id, clinic,setSelectedDate, setUpdate}) {

    const {doctor} = docItem;
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [finishLoading, setFinishLoading] = useState(false);
    const [size, setSize] = useState();
    const [times, setTimes] = useState([]);
    const [noTimes, setNoTimes] = useState(false);
    const [data, setData] = useState({});
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    useEffect(() => {

        if(data.service_type){
            if(data?.service_type === 'nursing' || data?.service_type === 'laboratory_clinic_visit' || data?.service_type === 'laboratory_home_visit') {
                setLoading(true)
                postResource('Clinic', 'ClinicsAvailableTimes', token, clinicID, {
                    date: selectedDate,
                    service: data.service_type,
                }).then(response => {
                    setLoading(false)
                    setTimes(response.flat())
                    setNoTimes(response)

                })
            } else {
                setLoading(true)
                postResource('ClinicDoctorAvailableTimeForDayByDoctorAndClinic', 'single', token, docItem?.doctor.id + "/" + clinicID, {
                    service: data.service_type,
                    date: selectedDate
                }).then(response => {
                    setLoading(false)
                    setTimes(response.flat())
                    setNoTimes(response)
                })
            }

        }

    }, [selectedDate, docItem,data.service_type])

    console.log(times, 'de')

    const openDrawer = () => {
        formRef.current.validateFields(['time','service_type']).then(e => {
            setOpen(true);
            setSize('default');
        })
    }

    const openLargeDrawer = () => {
        setOpen(true);
        setSize('large');
    }
    const searchByNumber = (item, name) => {
        name = <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px'}}>
            <div>{item.first} {item.last}</div>
            <div>+{item.phone_country_code}{item.phone_number}</div>
        </div>
        let searchData = item.phone_number + item.email;
        return [name, item, searchData]
    }
    const handleCreateAppointment = (values, additional) => {
        setFinishLoading(true)

        postResource('Appointment', 'create', token, '', {
            ...values,
            ...(additional ?? {}),
            ...data,
            speciality_id,
            clinic_id: clinicID,
            doctor_id: doctor.id,
            booked_at: dayjs(selectedDate + ' ' + values.time).format('YYYY-MM-DD HH:mm')

        }).then(e => {
            if(e.id){
                setOpen(false)
                setSize(false)
                setFinishLoading(false)
                setSelectedDate(false)
                setDate((prevState)=>prevState)
                setUpdate((prevState) =>prevState+1)
            }

        })

    }


    return (
        <div className={'clinic_manager_modal_big_div'}>
            {
                !selectedDate ? <Preloader/> : <Form ref={formRef} onValuesChange={(e, v) => setData(v)} onFinish={handleCreateAppointment}>
                    <Space >
                        <h1 className={'cl_manager_calendar_modal_head'}>{dayjs(selectedDate).format('DD MMMM')}</h1>
                        <h1 style={{fontSize: 24, fontWeight: 300}}>{Resources.Days[dayjs(selectedDate).day()]}</h1>
                    </Space>
                    <div>
                        {loading ? <Preloader/> : times.length?<Form.Item name={'time'} rules={[
                            {
                                required: true,
                            }
                        ]
                        }>
                            <Radio.Group
                                className={'hours_select_cl_manager_modal'}
                                options={times.map(e => ({
                                    label: e,
                                    value: e
                                }))}
                                optionType="button"
                                buttonStyle="solid"
                            />
                        </Form.Item>: <div></div>}
                        {
                            noTimes[0]?.length < 1 ? <div align={'center'} style={{width:'100%', fontSize: 20, marginTop:20, marginBottom: 20, fontWeight: 500, color: '#F3A632'}}>There are no available times</div> :
                                <div></div>
                        }
                    </div>
                    <div >
                        <Space>
                            <Avatar size={56} src={doctor?.avatar?.src} icon={<UserOutlined/>}/>
                            <div style={{display: "block"}}>
                                <div className={'cl_manager_modal_dr_name'}>{doctor.first} {doctor.last}</div>
                                <div className={'cl_manager_modal_stecialty_name'}>{specialty}</div>
                            </div>
                        </Space>
                    </div>
                    <div  style={{marginTop: 20}}>

                        <FormInput label={t('Service Type')} name={'service_type'}
                                   inputType={'resourceSelect'}
                                   rules={[{required: true}]}
                                   initialValue={null}
                                   initialData={getServiceTypes(clinic.services).filter((el) => {
                                       return el.id !== 'laboratory_clinic_visit' && el.id !== 'nursing' && el.id !== 'laboratory_home_visit'
                                   })}/>

                        <Form.Item name={'specialty_id'} hidden={true} initialValue={speciality_id}/>
                       
                        <FormInput label={t('Select Patient (Search By phone number)')} name={'patient_id'}
                                   inputType={'resourceSelect'}
                                   rules={[{required: true}]}
                                   searchConfigs={{minLength: 4}}
                                   initialValue={null}
                                   inputProps={{
                                       notFoundContent: <div
                                           style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                           <div>Not found</div>
                                           <Button type={'secondary'} style={{border: "none"}} onClick={openDrawer}>Create
                                               new</Button></div>
                                   }}
                                   initialData={[]}
                                   handleMapItems={(item, name) => searchByNumber(item, name)}
                                   customSearchKey={'name_or_phone'}

                                   resource={'User'}/>

                    </div>
                    {data?.patient_id && data?.time && <Button type={'primary'} htmlType={'submit'}
                                                               loading={finishLoading}
                                                               style={{width: '100%', height: '44px'}}>{t("Book")}</Button>}
                </Form>
            }

            <Drawer size={size} title="Add User" placement="right" onClose={() => setOpen(false)} open={open}>
                {
                    size === "default" ?
                        <ClinicManagerCalendarDrawerSmall setData={setData} data={data} doctor={doctor} specialty={specialty}
                                                          handleCreateAppointment={handleCreateAppointment}
                                                          openLargeDrawer={openLargeDrawer} setOpen={setOpen}/> :
                        <ClinicManagerCalendarDrawerLarge setData={setData} data={data} doctor={doctor} specialty={specialty}
                                                          handleCreateAppointment={handleCreateAppointment}
                                                          setOpen={setOpen} openDrawer={openDrawer}/>
                }


            </Drawer>

        </div>
    )
}

export default CalendarInnCollapseModal;
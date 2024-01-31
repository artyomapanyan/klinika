
import Vector from "../../../../../dist/icons/Vector.png";
import VectorHend from "../../../../../dist/icons/VectorHend.png";
import {Avatar, Drawer, Tag} from "antd";

import plusPurple from "../../../../../dist/icons/plus-purple.svg";
import {UserOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {postResource} from "../../../../Functions/api_calls";
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import DoctorReworkedCalendarDrawer
    from "../../../DoctorReworked/Fragments/DoctorReworkedCalendar/Fragments/DoctorReworkedCalendarDrawer";
import Preloader from "../../../../Preloader";
import {t} from "i18next";

function PatientCardRight({id, patientId, dataClinic}) {
    const token = useSelector((state) => state.auth.token);
    const [appointments, setAppointments] = useState()
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState(false)



    useEffect(() => {
        setLoading(true)
        postResource('Appointment', 'list', token, `/${id}/upcoming-appointments-patient`, {
            per_page: showAll ? null : 3
        }).then((response) => {

            setAppointments(response)
            setLoading(false)
        })
    }, [open, showAll])


    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    return(
        <div className={'Patient_card_right_div'} style={{marginRight: 24, marginTop: 24}}>
            {/*<div className={'Patient_card_right_img'}>*/}
            {/*    <img alt={'icons'} src={risk}/>*/}
            {/*</div>*/}
            {/*<Divider />*/}
            {/*<div className={'Patient_card_right_content'}>*/}
            {/*    <Space size={'large'}>*/}
            {/*        <div>*/}
            {/*            <img alt={'icons'} src={Vector}/>*/}
            {/*        </div>*/}

            {/*        <div style={{padding:20}}>*/}
            {/*            <div><Space size={'large'}><span className={'right_vector'}>Height</span>170 cm</Space></div>*/}
            {/*            <div><Space size={'large'}><span className={'right_vector'}>Weight</span> 70 kgs</Space></div>*/}
            {/*            <div><Space size={'large'}><span className={'right_vector'}>BMI</span> <span className={'Patient_card_right_bold_text'}>25.8 kg/m2</span></Space><div>(Overweight)</div></div>*/}
            {/*        </div>*/}
            {/*    </Space>*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*    <div className={'Patient_card_right_content'}>*/}
            {/*        <Space size={'large'}>*/}
            {/*            <div>*/}
            {/*                <img alt={'icons'} src={VectorHend}/>*/}
            {/*            </div>*/}

            {/*            <div style={{padding:20}}>*/}
            {/*                <div>*/}
            {/*                    <h1 style={{fontWeight:700}}>Blood Pressure</h1>*/}
            {/*                </div>*/}
            {/*                <div><Space size={'large'}><span className={'right_vector'}>Systolic</span>120 mmHg</Space></div>*/}
            {/*                <div><Space size={'large'}><span className={'right_vector'}>Diasstolic</span>80 mmHg</Space></div>*/}
            {/*                <div><Space size={'large'}><span className={'right_vector'}>Blood type</span>A+</Space></div>*/}
            {/*            </div>*/}

            {/*        </Space>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div>
                <div className={'patient_next_app_head'}>
                    <div className={'next_app_text'}>
                        {t('Next Appointments')}:
                    </div>
                    <div>
                        <div onClick={showDrawer} style={{cursor: 'pointer', whiteSpace: 'nowrap'}}> <img alt={'icons'} src={plusPurple}/><span className={'add_text'}>{t('Add')}</span></div>
                    </div>
                </div>
                {
                    loading ? <Preloader /> : <div>
                        <div style={{maxHeight: 668, overflow: 'auto'}}>
                            {
                                loading ? <Preloader /> : appointments?.items?.map((el) => {

                                    return <div key={el.id} className={'patient_next_app_content'}>

                                        <div>
                                            <Avatar  size={48}  shape="square" icon={<UserOutlined />} />
                                        </div>
                                        <div className={'patient_next_app_texts'}>
                                            <div>
                                                <Tag color="magenta" style={{backgroundColor:'#D477B030'}} className={'ant_tag'}>
                                                    {el?.specialty?.title ? el?.specialty?.title :
                                                        el?.service_type === 'nursing' ? 'Nursing' :
                                                            el?.service_type === 'laboratory_clinic_visit' ? 'Laboratory Clinic visit' : 'Laboratory Home Visit'}
                                                </Tag>
                                                {dayjs(el?.booked_at?.iso_string).format('YYYY MMM DD')}
                                            </div>
                                            <div className={'patient_next_app_name_text'}>
                                                {el?.patient?.first} {el?.patient?.last}
                                            </div>

                                        </div>
                                    </div>
                                })
                            }
                        </div>

                        {

                            !showAll && appointments?.total_items > 3 ? <div style={{padding: '10px 22px'}}>
                                <Tag onClick={()=>setShowAll(true)}  style={{cursor: 'pointer', fontSize:13}}  color="magenta" className={'ant_tag'}>{t('and more')} {appointments?.total_items - 3} {t('items')}</Tag>
                            </div> : null

                        }
                        {

                            showAll && appointments?.total_items > 3 ? <div style={{padding: '10px 22px'}}>
                                <Tag onClick={()=>setShowAll(false)} style={{cursor: 'pointer', fontSize:13}}  color="magenta" className={'ant_tag'}>{t('Show Less')}</Tag>
                            </div> : null

                        }
                    </div>
                }


                <Drawer width={411} title="Add User" placement="right" onClose={onClose} open={open}>
                    {open?<DoctorReworkedCalendarDrawer setOpen={setOpen}  patient={false} patientId={patientId} dataClinic={dataClinic}/>:null}
                </Drawer>
                {/*<PatientCardNextAppoint/>*/}
            </div>
        </div>

    )
}
export default PatientCardRight;
import React, {useState} from 'react';
import {Collapse, Form, Modal, Tag} from 'antd';
import arrowDownPurple from "../../../../dist/icons/arrowDownPurple.svg";
import arrowUpPurple from "../../../../dist/icons/arrow-up-purple.svg";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import {t} from "i18next";
import Resource from "../../../../store/Resources";
import ColorSelect from "../../../Fragments/ColorSelect";
import PatientStatusChange from "../PatientStatusChange/PatientStatusChange";
import {CanceledContent} from "../../Appointments/StatusModalForms/CanceledContent";
import {FinishedContent} from "../../Appointments/StatusModalForms/FinishedContent";
import {RascheduledContent} from "../../Appointments/StatusModalForms/RascheduledContent";
import {Confirmed} from "../../Appointments/StatusModalForms/Confirmed";
import {postResource} from "../../../Functions/api_calls";
import Preloader from "../../../Preloader";
const { Panel } = Collapse;
function PatientCollapse({data, setData}) {
    let language = useSelector((state) => state.app.current_locale)
    let token = useSelector((state) => state.auth.token);

    const [modal,setModal] = useState(false)
    const [loading,setLoading] = useState(false)
    const [date,setDate] = useState(false)
    const [collapseState,setCollapseState] = useState(true)



    const onStatusChange = (key)=>{
        setModal({
            ...data,
            key
        })

    }

    const onFinish = (values) => {
        setLoading(true)
        if (values?.booked_at) {
            values.booked_at = values.booked_at.format('YYYY-MM-DD') + ' ' + values.appointment_time
        }
        postResource('Appointment','appointmentStatus', token, `${modal.id}/switch-status`, {
            status:modal.key,
            ...values
        }).then(() => {

            setModal(null)
            setData((prevState)=>({
                ...prevState,
            }))
            setLoading(false)
        }).finally(()=>{
            setLoading(true)
            window.location.reload()
        })
    }

    const onCancel = () => {
        setModal(null)
    }

    const handleValuesChange = (changed)=>{
        if(changed.booked_at) {
            setDate((prevDate)=>({
                ...prevDate,
                ...changed
            }))
        }

    }

    const onCollepse = () => {
        setCollapseState(!collapseState)
    }

    return(
        <div style={{padding:24, margin: '0 20px'}}>
            <Modal key={Math.random()} maskClosable={true} open={modal?.id} footer={null} onCancel={onCancel}  centered >
                <Form onFinish={onFinish}
                      onValuesChange={handleValuesChange}
                >
                    {
                        modal?.key === '3' ? <CanceledContent loading={loading} onCancel={onCancel} /> :
                            modal?.key === '2' ? <FinishedContent loading={loading}  onCancel={onCancel} /> :
                                modal?.key === '4' || modal?.key === '6' ? <RascheduledContent loading={loading} modal={modal} onCancel={onCancel} date={date} /> :
                                    modal?.key === '1' ? <Confirmed loading={loading} onCancel={onCancel}/>  :
                                        modal?.key === '5' ? <Confirmed loading={loading} onCancel={onCancel}/>  :
                                            modal?.key === '6' ? <Confirmed loading={loading} onCancel={onCancel}/>  :
                                                modal?.key === '7' ? <Confirmed loading={loading} onCancel={onCancel}/>  : null
                    }

                </Form>
            </Modal>



            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width:'100%'}}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <div style={{fontSize: 20, fontWeight: 700}}>
                            Appointment Details
                        </div>
                        <div style={{zIndex: 999, margin: '0 30px'}}>
                            {
                                loading ? <Preloader /> : <PatientStatusChange setLoading={setLoading} loading={loading}  record={data} resource={'Appointment'} initialValue={data?.status.toString()} onChange={onStatusChange}  name={'status'}/>
                            }

                        </div>
                    </div>
                    <div onClick={onCollepse} style={{cursor: 'pointer', paddingTop: 9}}>
                        {
                            collapseState ?
                            <div><img alt={'icons'} src={arrowUpPurple} style={{marginTop: -2}}/> <span className={'patient_collapse_icon'}>Collapse</span></div> :
                            <div><img alt={'icons'} src={arrowDownPurple} style={{marginTop: -2}}/> <span className={'patient_collapse_icon'}>Expend</span></div>
                        }
                    </div>
                    </div>



            {
                collapseState ? <div className={'collapse_panel'}>
                    {/*<PatientStatusChange    record={data} resource={'Appointment'} initialValue={data?.status.toString()} onChange={onStatusChange}  name={'status'}/>*/}
                    <div className={'patient_panel_big_div'}>
                        <div>
                            <div className={'collapse_content_head'}>{t('Scheduled Appt')}</div>
                            <div className={'collapse_content_foot'}>{dayjs(data?.created_at?.iso_string).format('DD MMMM YY')}</div>
                        </div>
                        <div>
                            <div className={'collapse_content_head'}>{language === 'en' ? t('Appt Time/Date') : t('Date/Appt Time')}</div>
                            <div className={'collapse_content_foot'}>
                                <span style={{fontWeight: 700}}>{dayjs(data?.booked_at?.iso_string).format('h:mm A')} </span>  / {dayjs(data?.booked_at?.iso_string).format('DD MMMM YY')}
                            </div>
                        </div>
                        <div>
                            <div className={'collapse_content_head'}>{t('Referring doctor')}</div>
                            <div className={'collapse_content_foot'}>{data?.doctor?.first} {data?.doctor?.last}</div>
                        </div>
                        <div>
                            <div className={'collapse_content_head'}>{t('Appt Doctor')}</div>
                            <div className={'collapse_content_foot'}>{data?.doctor?.first} {data?.doctor?.last}</div>
                        </div>
                        <div>
                            <div className={'collapse_content_head'}>{t('Offer')}</div>
                            <div className={'collapse_content_foot'}>{data?.offer ? data?.offer?.title : <span style={{margin: "0 10px"}}>-</span>}</div>
                        </div>
                        <div>
                            <div className={'collapse_content_head'}>{t('Payment')}</div>
                            <div className={'collapse_content_foot'}>{data?.primaryInvoice?.total_price} SAR
                                {<Tag className={'ant_tag'} style={{color: data?.primaryInvoice?.status == 2 ? '#6DAF56' : '#ee4e4e', backgroundColor: data?.primaryInvoice?.status == 2 ? '#6DAF5630' : '#f6d7d7', margin: '0 8px', fontSize: 11}}>
                                    { data?.primaryInvoice?.status == 2 ? "Paid" : "No payed"}
                                </Tag>}
                            </div>
                        </div>
                    </div>
                </div> : <div style={{transition: '0.2s'}}></div>
            }

            </div>

    )
}
export default PatientCollapse;

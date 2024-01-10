import React, {useEffect, useState} from "react";
import {Button} from "antd";
import {postResource} from "../../../../Functions/api_calls";
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import checked_calendar_icon from "../../../../../dist/icons/checked_calendar_icon.png";
import yellow_calendar from "../../../../../dist/icons/yellow_calendar.png";
import map_icon from "../../../../../dist/icons/map_icon.png";
import message_icon from "../../../../../dist/icons/message_icon.png";
import Preloader from "../../../../Preloader";
import {t} from "i18next";
import {useNavigate} from "react-router";
import ResourceLinks from "../../../../ResourceLinks";


const count = 6;


function DoctorReworkedNotifications() {
    let token = useSelector((state) => state.auth.token);
    let navigate = useNavigate()

    const [data, setData] = useState([]);
    const [loadind, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true)
        postResource('DoctorReworked', 'Notifications', token, '',).then((response) => {
            setData(response)
            setLoading(false)
        })
    }, [])

    const onMarkAlAsRead = () => {
        postResource('Notifications', 'MarkAllAsRead', token, '',).then(() => {

        })
    }

    const goAllNotifications = () => {
        navigate('/dashboard/notifications')
    }

    const goToAppointment = (appointmentId) => {
        if(appointmentId)
            navigate(ResourceLinks['Appointment'] + appointmentId + '/doctor');
     }


    return (
        <div className={'dr_reworked_calendar'} style={{height: 613}}>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <h1 className={'h1'}>Notifications</h1>
                <div onClick={onMarkAlAsRead} className={'notification_tag'}>{t('Mark all as read')}</div>
            </div>
            <div className={'notification_content_btn_div'}>

                {
                    loadind ? <Preloader/> : data?.notifications?.map((el, key) => {
                        return <div key={key}>
                            <div className={'dashed_lini'}></div>

                            <div className={'dr_rew_notifications'} onClick={() => goToAppointment(el?.data?.id)} style={{cursor: 'pointer'}}>
                                <div>
                                    {
                                        el?.data?.icon === "calendar-check" ? <img src={checked_calendar_icon}
                                                                                   alt={'checked_calendar_icon'}/> : el?.data?.icon === "yellow_calendar" ?
                                            <img src={yellow_calendar} alt={'yellow_calendar'}/> :
                                            el?.data?.icon === "map_icon" ? <img src={map_icon}
                                                                                 alt={'map_icon'}/> : el?.data?.icon === "message_icon" ?
                                                <img src={message_icon} alt={'message_icon'}/> : <div></div>
                                    }


                                </div>
                                <div className={'dr_rew_notifications_texts_div'}>
                                    <div className={'dr_rew_notifications_title'}>{el.data.title}</div>
                                    <div className={'dr_rew_notifications_content'}>{el.data.description}</div>
                                    <div
                                        className={'dr_rew_notifications_date'}>{dayjs(el.created_at.iso_string).format('DD MMMM YYYY')}</div>
                                </div>
                            </div>

                        </div>
                    }).slice(0, 3)

                }
                <div className={'dashed_lini'}></div>
                <div>
                    <Button onClick={goAllNotifications} className={'notification_button'}><span className={'notification_button_text'}>{t('Show all notifications')}</span>
                        <span
                            className={'notification_button_text_count'}>{data?.unread_notifications_count}</span></Button>
                </div>
            </div>

        </div>
    )
}

export default DoctorReworkedNotifications;
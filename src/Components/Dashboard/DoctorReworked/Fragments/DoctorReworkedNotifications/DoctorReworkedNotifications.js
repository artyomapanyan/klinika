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

const count = 6;


function DoctorReworkedNotifications() {
    let token = useSelector((state) => state.auth.token);

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

    // let a = [
    //     {id: '90e34d93-1b4f-4355-899c-32ab441972fc',
    //         data: {
    //             description: "Appointment at `Klinika Center` Clinic at 2022-05-20 02:30 Confirmed",
    //             icon: "calendar-check",
    //             icon_color: "#6DAF56",
    //             title: "Appointment with multi multi"
    //         },
    //         created_at: {
    //             iso_string: "2023-04-25T07:57:13+00:00"
    //         }
    //     },
    //     {id: '90e34d93-1b4f-4355-899c-32ab441972fc',
    //         data: {
    //             description: "Appointment at `Klinika Center` Clinic at 2022-05-20 02:30 Confirmed",
    //             icon: "yellow_calendar",
    //             icon_color: "#6DAF56",
    //             title: "Appointment with multi multi"
    //         },
    //         created_at: {
    //             iso_string: "2023-04-25T07:57:13+00:00"
    //         }
    //     },
    //     {id: '90e34d93-1b4f-4355-899c-32ab441972fc',
    //         data: {
    //             description: "Appointment at `Klinika Center` Clinic at 2022-05-20 02:30 Confirmed",
    //             icon: "message_icon",
    //             icon_color: "#6DAF56",
    //             title: "Appointment with multi multi"
    //         },
    //         created_at: {
    //             iso_string: "2023-04-25T07:57:13+00:00"
    //         }
    //     },
    //     {id: '90e34d93-1b4f-4355-899c-32ab441972fc',
    //         data: {
    //             description: "Appointment at `Klinika Center` Clinic at 2022-05-20 02:30 Confirmed",
    //             icon: "yellow_calendar",
    //             icon_color: "#6DAF56",
    //             title: "Appointment with multi multi"
    //         },
    //         created_at: {
    //             iso_string: "2023-04-25T07:57:13+00:00"
    //         }
    //     },
    //     // {id: '90e34d93-1b4f-4355-899c-32ab441972fc',
    //     //     data: {
    //     //         description: "Appointment at `Klinika Center` Clinic at 2022-05-20 02:30 Confirmed",
    //     //         icon: "map_icon",
    //     //         icon_color: "#6DAF56",
    //     //         title: "Appointment with multi multi"
    //     //     },
    //     //     created_at: {
    //     //         iso_string: "2023-04-25T07:57:13+00:00"
    //     //     }
    //     // },
    // ]



    return (
        <div className={'dr_reworked_calendar'} style={{height: 613}}>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <h1 className={'h1'}>Notifications</h1>
                <div onClick={onMarkAlAsRead} className={'notification_tag'}>Mark all as read</div>
            </div>
            <div className={'notification_content_btn_div'}>

                {
                    loadind ? <Preloader/> : data?.notifications?.map((el, key) => {
                        return <div key={key}>
                            <div className={'dashed_lini'}></div>

                            <div className={'dr_rew_notifications'}>
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
                    <Button className={'notification_button'}><span className={'notification_button_text'}>Show all notifications</span>
                        <span
                            className={'notification_button_text_count'}>{data?.unread_notifications_count}</span></Button>
                </div>
            </div>

        </div>
    )
}

export default DoctorReworkedNotifications;
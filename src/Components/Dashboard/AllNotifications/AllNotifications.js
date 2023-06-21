import React, {useEffect, useState} from 'react';
import {postResource} from "../../Functions/api_calls";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import Preloader from "../../Preloader";
import checked_calendar_icon from "../../../dist/icons/checked_calendar_icon.png";
import yellow_calendar from "../../../dist/icons/yellow_calendar.png";
import map_icon from "../../../dist/icons/map_icon.png";
import message_icon from "../../../dist/icons/message_icon.png";
import {Button, Pagination, Space} from "antd";
import {LeftOutlined} from "@ant-design/icons";

function AllNotifications() {
    let token = useSelector(state => state.auth.token)

    const [loading, setLoading] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [paginationState, setPaginationState] = useState({})


    useEffect(() => {

        setLoading(true)
        postResource('Notifications', 'AllNotification', token, ``, {
            page: paginationState?.page,
            per_page: paginationState?.per_page
        }).then(response => {
            setNotifications(response)
            setLoading(false)
        })


    }, [paginationState])

    const onPaginationChange = (page, per_page) => {
        setPaginationState({
            page: page,
            per_page: per_page
        })

    }
    console.log(notifications)

    return(
        <div style={{marginTop: -75}}>
            <Space>
                <div className={'all_notification_title'}>
                    All notification
                </div>
                <Button type={'primary'}>Mark as read</Button>
            </Space>

            {
                loading ? <Preloader /> : <div style={{marginTop: 48}}>
                    {
                        notifications?.items?.map((el, key) => {
                            return (
                                <div key={key} className={'all_notifications_map_div'}>
                                    <div className={'notification_icon_div'}>
                                        {
                                            el?.data?.icon === "calendar-check" ? <img src={checked_calendar_icon}
                                                                                       alt={'checked_calendar_icon'}/> : el?.data?.icon === "yellow_calendar" ?
                                                <img src={yellow_calendar} alt={'yellow_calendar'}/> :
                                                el?.data?.icon === "map_icon" ? <img src={map_icon}
                                                                                     alt={'map_icon'}/> : el?.data?.icon === "message_icon" ?
                                                    <img src={message_icon} alt={'message_icon'}/> : <div></div>
                                        }
                                    </div>
                                    <div>
                                        <div className={'notifications_drop_title_div'}>
                                            {el?.data?.title}
                                        </div>
                                        <div className={'notifications_drop_descript_div'}>
                                            {el?.data?.description}
                                        </div>
                                    </div>


                                </div>
                            )
                        })
                    }
                </div>
            }
            <div align={'center'} >
                <Pagination style={{marginBottom: 20}} defaultCurrent={1} onChange={onPaginationChange} total={notifications?.total_items} pageSize={15}/>
            </div>

        </div>
    )
}
export default AllNotifications;
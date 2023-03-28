import React, {useEffect, useState} from "react";
import {CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar, Button, Space} from "antd";
import Slider from "react-slick";
import {useSelector} from "react-redux";
import {postResource} from "../../../Functions/api_calls";

function AppTime({setDataState, dataState, data}) {
    let token = useSelector((state) => state.auth.token);

    const [times, setTimes] = useState([])

    useEffect(() => {
        if(dataState?.doctor_id && dataState?.date) {
            postResource('PublicClinicDoctorAvailableTimes','single', token, dataState?.doctor_id + '/' + data?.clinic?.id, {service:'home_visit', date:dataState?.date}).then(response => {
                setTimes(response[0]);
            })
        }
    }, [dataState?.date])

    const onTime = (time) => {
        setDataState((prevState)=>({
            ...prevState,
            time: time,
        }))
    }
    const onChangeTime = () => {
        setDataState((prevState)=>({
            ...prevState,
            time: '',
            number: ''
        }))
    }

    const settings = {

        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }


    return(
        <div>
            <Space>
                <CheckCircleOutlined style={{color:dataState?.time ?'#2ce310':'gray', fontSize:22}} />
                <h2 style={{fontWeight: 600, marginTop:8}}>time</h2>
            </Space>
            {
                dataState?.doctor_id && dataState?.date && dataState?.time ? <div>
                    <Space>
                        Selected Time : 01:00
                        <Button type={'secondary'} onClick={onChangeTime} style={{borderRadius:15}}>Change Selected Doctor</Button>
                    </Space>
                </div> : (dataState?.doctor_id && dataState?.date) || dataState?.time ? <div className={'date_carousel_div'}>
                    <div style={{position:'absolute', width:'98%'}}>
                        <Slider {...settings}>
                            {
                                times?.map((time, key) => {
                                    return <div key={key} onClick={()=>onTime(time)} style={{width:100}} className={'date_div'} align={'center'}>
                                        <div style={{padding:15}} className={'date_div_inn'}>
                                            <Space>
                                                <ClockCircleOutlined style={{color:'gray'}}/>
                                                {time}
                                            </Space>
                                        </div>
                                    </div>
                                })
                            }

                        </Slider>
                    </div>

                </div> :<div></div>
            }



        </div>
    )
}
export default AppTime;
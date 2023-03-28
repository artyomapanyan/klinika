import React, {useEffect, useRef, useState} from "react";
import {Button, Space} from "antd";
import {CalendarOutlined, CheckCircleOutlined} from "@ant-design/icons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import dayjs from "dayjs";
import Resources from "../../../../store/Resources";
import {postResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";

function AppDate({setDataState, dataState, data}) {
    let token = useSelector((state) => state.auth.token);
    const [dayOff, setDayOff] = useState([]);

    useEffect(() => {
        if(dataState?.doctor_id) {
            postResource('PublicClinicDoctorWorkingHours','single', token,  dataState?.doctor_id+ '/' + data?.clinic?.id, {service:'home_visit'}).then(response => {
                const res = response?.working_hours
                let day = [];
                Object.values(res)?.map((el, i) => {
                    return el.filter((el1) => el1.is_day_off ===true)
                }).map((el, i) => {
                    if (el.length > 0) {
                        day.push(i+1)
                    }
                })
                setDayOff(day)
            })
        }
    }, [dataState?.doctor_id])

    const onDate = (date) => {
        setDataState((prevState)=>({
            ...prevState,
            date: date?.format('YYYY-MM-DD'),
        }))
    }

    const onChangeDate = () => {
        setDataState((prevState)=>({
            ...prevState,
            date: "",
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



    const currentDate = dayjs();

    // let arrDays = [...Array(30).keys()].map((el) => {
    //     const date = currentDate.add(el,'day').day();
    //     return date
    // }).filter((el) => {
    //     return !dayOff.includes(el)
    // })


    return(
        <div>
            <Space>
                <CheckCircleOutlined style={{color:dataState?.date ?'#2ce310':'gray', fontSize:22}} />
                <h2 style={{fontWeight: 600, marginTop:8}}>Date</h2>
            </Space>
            {
                dataState?.doctor_id && dataState?.date ? <div>
                    <Space>
                        Selected Date : 2023-03-20
                        <Button type={'secondary'} onClick={onChangeDate} style={{borderRadius:15}}>Change Selected Doctor</Button>
                    </Space>
                </div> : dataState?.doctor_id || dataState?.date ? <div className={'date_carousel_div'}>
                    <div style={{position:'absolute', width:'98%'}}>
                        <Slider {...settings}>
                            {[...Array(30).keys()].map((key, i)=>{
                                const date = currentDate.add(key,'day')

                                return <div key={key} onClick={()=>onDate(date)} style={{width:50}} className={'date_div'} align={'center'}>
                                    <div className={'date_div_inn'}>
                                        <div style={{fontSize:12, color:'gray'}}>{Resources.Days[date.day()]}</div>
                                        <Space>
                                            <CalendarOutlined style={{color:'gray'}}/>
                                            <div>{date.format('DD-MM-YYYY')}</div>
                                        </Space>
                                    </div>
                                </div>
                            })}

                        </Slider>
                    </div>

                </div> :<div></div>
            }



        </div>
    )
}
export default AppDate;
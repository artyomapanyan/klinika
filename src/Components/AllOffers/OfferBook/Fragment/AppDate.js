import React, {useEffect, useState} from "react";
import {Button, Space} from "antd";
import {CalendarOutlined, CheckCircleOutlined} from "@ant-design/icons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import dayjs from "dayjs";
import Resources from "../../../../store/Resources";
import {postResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";
import {t} from "i18next";
import Preloader from "../../../Preloader";

function AppDate({setDataState, dataState, data, setDate}) {
    let token = useSelector((state) => state.auth.token);
    const [dayOff, setDayOff] = useState([]);
    const [loadingDate, setLoadingDate] = useState(false);
    const [availableDay, setAvailableDay] = useState([]);


    useEffect(() => {
        if(dataState?.doctor_id) {
            postResource('PublicClinicDoctorWorkingHours','single', token,  dataState?.doctor_id+ '/' + data?.clinic?.id, {service:'clinic_visit'}).then(response => {
                const res = response?.working_hours
                let day = [];
                Object.values(res)?.map((el) => {
                    return el.filter((el1) => el1.is_day_off ===true)
                }).map((el, i) => {
                    if (el.length > 0) {
                        day.push(i+1)
                    }
                })
                setDayOff(day)


            })
        }

        if(dataState?.doctor_id) {
            setLoadingDate(true)
            let b = [...Array(10)?.keys()]?.map((el, key) => {
                return dayjs().add(key, 'day').format('YYYY-MM-DD')
            })



            let s = []
            for(let i = 0; i < b.length; i++) {
                postResource('PublicClinicDoctorAvailableTimes','single', token, dataState?.doctor_id + '/' + data?.clinic?.id, {service:'clinic_visit', date:b[i]}).then(response => {
                    //setTimes(response[0]);

                    s.push(response)
                    setLoadingDate(false)
                })
            }
            setAvailableDay(s)

            console.log(s, 's')


        }


    }, [dataState?.doctor_id])

    const onDate = (date) => {
        setDataState((prevState)=>({
            ...prevState,
            date: date?.format('YYYY-MM-DD'),
        }))
        setDate({date: date?.format('YYYY-MM-DD')})
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

    return(
        <div>
            <Space>
                <CheckCircleOutlined style={{color:dataState?.date ?'#2ce310':'gray', fontSize:22}} />
                <h2 style={{fontWeight: 600, marginTop:8}}>{t('Date')}</h2>
            </Space>
            {
                dataState?.doctor_id && dataState?.date ? <div>
                    <div className={'all_offers_app_div'}>
                        {t('Selected Date')} : <span className={'selected_text'}>{dataState?.date}</span>
                        <Button type={'secondary'} onClick={onChangeDate} style={{borderRadius:15}}>{t('Change Date')}</Button>
                    </div>
                </div> : dataState?.doctor_id || dataState?.date ? <div className={'date_carousel_div'}>
                    <div style={{position:'absolute', width:'98%'}}>
                        <Slider {...settings}>
                            {[...Array(30).keys()].map((key)=>{
                                const date = currentDate.add(key,'day')

                                return !dayOff.includes(date.day()) ? <div key={key} onClick={()=>onDate(date)} style={{width:50}} className={'date_div'} align={'center'}>
                                    <div className={'date_div_inn'}>
                                        <div style={{fontSize:12, color:'gray'}}>{Resources.Days[date.day()]}</div>
                                        <Space>
                                            <CalendarOutlined style={{color:'gray'}}/>
                                            <div>{date.format('DD-MM-YYYY')}</div>
                                        </Space>
                                    </div>
                                </div>:null
                            })}

                        </Slider>
                    </div>

                </div> :<div></div>
            }



        </div>
    )
}
export default AppDate;
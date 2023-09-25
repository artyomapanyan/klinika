import React, {useEffect, useRef, useState} from "react";
import {Button, Space, Spin} from "antd";
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
    let sliderRef = useRef()
    const [dayOff, setDayOff] = useState([]);
    const [sliderIndex, setSliderIndex] = useState(-1);
    const [loadingDate, setLoadingDate] = useState(false);

    const [daysData,setDaysData] = useState([])



    useEffect(() => {
        if(dataState?.doctor_id) {
            setLoadingDate(true)
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

                setDaysData([...Array(30).keys()].filter(key=> !day.includes(currentDate.add(key,'day').day())).map(key=>({
                    key,
                    disabled:false
                })))
                setSliderIndex(0)
                setDayOff(day)
                setLoadingDate(false)


            })
        }


    }, [dataState?.doctor_id])


    useEffect(()=>{

        //console.log(sliderIndex)
       let callableDays =  [...daysData].slice(sliderIndex,sliderIndex+5).filter(e=>!e.called)
        // console.log(callableDays,daysData,'sdsd')
        //setLoadingDate(true)
        Promise.all(callableDays.map((callableDay)=>{
          return   postResource('PublicClinicDoctorAvailableTimes','single', token, dataState?.doctor_id + '/' + data?.clinic?.id, {service:'clinic_visit', date:dayjs().add(callableDay.key, 'day').format('YYYY-MM-DD')}).then(response => {

                return {
                    key:callableDay.key,
                    hasDays: response ? response[0]?.length : 0
                }

            })
        })).then(responses=>{

            //console.log(responses)
            setDaysData(prevState => prevState.map(e=>{
                let data = responses.find(u=>e.key===u.key);
                if(data){
                    e.disabled =!data.hasDays
                        e.called = true
                }

                return e
            }))
        })

    },[sliderIndex])

    const onDate = (date) => {
        setDataState((prevState)=>({
            ...prevState,
            date: date?.format('YYYY-MM-DD'),
        }))
        setDate({date: date?.format('YYYY-MM-DD')})
    }

    useEffect(()=>{

    },[sliderIndex])



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
                    {
                        loadingDate ? <Preloader small={10}/> : <div style={{position:'absolute', width:'98%'}}>
                            <Slider {...settings} ref={sliderRef} afterChange={(e)=>setSliderIndex(e)}>
                                {daysData.map(({key,disabled,called},i)=>{
                                    const date = currentDate.add(key,'day')
                                    return  <div key={key} onClick={()=>called && !disabled && onDate(date)} style={{width:50}} className={'date_div'} align={'center'}>
                                        <div className={disabled ? 'disabled_date' : 'date_div_inn'}>
                                            <div style={{fontSize:12, color:'gray'}}>{Resources.Days[date.day()]}</div>
                                            <Space>
                                                <CalendarOutlined style={{color:'gray'}}/>
                                                <Spin spinning={!called}><div>{date.format('DD-MM-YYYY')}</div>  </Spin>
                                                {/*{disabled?<div>Disabled</div>:null}*/}
                                            </Space>
                                        </div>
                                    </div>

                                })}

                            </Slider>
                        </div>
                    }


                </div> :<div></div>
            }



        </div>
    )
}
export default AppDate;
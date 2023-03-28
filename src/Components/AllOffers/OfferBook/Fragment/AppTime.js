import React, {useState} from "react";
import {CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar, Button, Space} from "antd";
import Slider from "react-slick";

function AppTime({setDataState, dataState}) {


    const onTime = () => {
        setDataState((prevState)=>({
            ...prevState,
            time: "time",
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

        infinite: true,
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


    let date = [
        {
            key: 1,
            content: <div>01:00</div>
        },
        {
            key: 2,
            content: <div>01:00</div>
        },
        {
            key: 3,
            content: <div>01:00</div>
        },
        {
            key: 4,
            content: <div>01:00</div>
        },
        {
            key: 5,
            content: <div>01:00</div>
        },
        {
            key: 6,
            content: <div>01:00</div>
        },
        {
            key: 7,
            content: <div>01:00</div>
        },
        {
            key: 8,
            content: <div>01:00</div>
        },
    ]

    return(
        <div>
            <Space>
                <CheckCircleOutlined style={{color:dataState?.time ?'#2ce310':'gray', fontSize:22}} />
                <h2 style={{fontWeight: 600, marginTop:8}}>time</h2>
            </Space>
            {
                dataState?.doctor && dataState?.date && dataState?.time ? <div>
                    <Space>
                        Selected Time : 01:00
                        <Button type={'secondary'} onClick={onChangeTime} style={{borderRadius:15}}>Change Selected Doctor</Button>
                    </Space>
                </div> : (dataState?.doctor && dataState?.date) || dataState?.time ? <div className={'date_carousel_div'}>
                    <div style={{position:'absolute', width:'98%'}}>
                        <Slider {...settings}>
                            {
                                date.map((el) => {
                                    return <div key={el.key} onClick={onTime} style={{width:100}} className={'date_div'} align={'center'}>
                                        <div style={{padding:15}} className={'date_div_inn'}>
                                            <Space>
                                                <ClockCircleOutlined style={{color:'gray'}}/>
                                                {el.content}
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
import React, {useRef} from "react";
import {Button, Space} from "antd";
import {CalendarOutlined, CheckCircleOutlined} from "@ant-design/icons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function AppDate({setDataState, dataState}) {

    const onDate = () => {
        setDataState((prevState)=>({
            ...prevState,
            date: "date",
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
            content: <div>12.11.2022</div>
        },
        {
            key: 2,
            content: <div>12.11.2022</div>
        },
        {
            key: 3,
            content: <div>12.11.2022</div>
        },
        {
            key: 4,
            content: <div>12.11.2022</div>
        },
        {
            key: 5,
            content: <div>12.11.2022</div>
        },
        {
            key: 6,
            content: <div>12.11.2022</div>
        },
        {
            key: 7,
            content: <div>12.11.2022</div>
        },
        {
            key: 8,
            content: <div>12.11.2022</div>
        },
    ]

    return(
        <div>
            <Space>
                <CheckCircleOutlined style={{color:dataState?.date ?'#2ce310':'gray', fontSize:22}} />
                <h2 style={{fontWeight: 600, marginTop:8}}>Date</h2>
            </Space>
            {
                dataState?.doctor && dataState?.date ? <div>
                    <Space>
                        Selected Date : 2023-03-20
                        <Button type={'secondary'} onClick={onChangeDate} style={{borderRadius:15}}>Change Selected Doctor</Button>
                    </Space>
                </div> : dataState?.doctor || dataState?.date ? <div className={'date_carousel_div'}>
                    <div style={{position:'absolute', width:'98%'}}>
                        <Slider {...settings}>
                            {
                                date.map((el) => {
                                    return <div key={el.key} onClick={onDate} style={{width:100}} className={'date_div'} align={'center'}>
                                        <div style={{fontSize:12, color:'gray'}}>Fri</div>
                                        <Space>
                                            <CalendarOutlined style={{color:'gray'}}/>
                                            {el.content}
                                        </Space>
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
export default AppDate;
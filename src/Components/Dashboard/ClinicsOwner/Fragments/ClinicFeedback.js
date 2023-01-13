import React, {useRef} from "react";
import {Avatar, Button, Col, Row, Space} from "antd";
import arrowLeftPurple from "../../../../dist/icons/arrow-left-purple.svg";
import arrowRightPurple from "../../../../dist/icons/arrow-right-purple.svg";
import frame5 from "../../../../dist/icons/frame5.svg";
import starRed from "../../../../dist/icons/star-red.svg";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


function ClinicFeedback() {
    const slideRef = useRef();


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: false,
        prevArrow: false
    }

    let sliderConteiner = [
        {
            key: 1,
            content: <div></div>
        },
        {
            key: 2,
            content: <div></div>
        },
        {
            key: 3,
            content: <div></div>
        },
        {
            key: 4,
            content: <div></div>
        },
    ]

    const onNext = () => {
        return slideRef?.current?.slickNext()
    }

    const onBack = () => {
        return slideRef?.current?.slickPrev()
    }

    return (
        <div style={{position:'relative',minHeight:'400px',background:'rgba(255,255,255,0)'}}>
            <div style={{position:"absolute", width:'99%'}}>
                <div className={'clinic_fid_head'}>
                    <Space>
                        <h1 className={'h1'}>Clinic feedback  </h1>
                        <Space></Space>
                        <h1 className={'h1'}> 4.7 <img alt={'icons'} src={frame5}/></h1>
                    </Space>
                    <Space>
                        <Button onClick={onBack}><img alt={'icons'} src={arrowLeftPurple}/></Button>
                        <Button onClick={onNext}><img alt={'icons'} src={arrowRightPurple}/></Button>
                    </Space>
                </div>
                <Slider {...settings} ref={slideRef}>
                    {
                        sliderConteiner.map((el, key) => {
                            return<div>
                                <div className={'clinic_fid_conteiner'} >
                                    <Row>
                                        <Col lg={4}>
                                            <Avatar size={60}/>
                                        </Col>
                                        <Col lg={20}>
                                            <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between", padding:10}}>
                                                <div className={'clinic_fid_patient_name'}>Daryl Nehls</div>
                                                <div className={'clinic_fid_patient_name'}>2.7 <img alt={'icons'} src={starRed}/></div>
                                            </div>
                                            <div className={'clinic_fid_text'}>
                                                I came to the clinic with skin rashes on my hands. Dermatologist Alexander
                                                Ivanovich was very attentive and prescribed treatment in the form of tablets and
                                                ointments. After treatment, Alexander Ivanovich's skin rashes began to pass.
                                            </div>
                                            <Space style={{padding:15}}><span style={{color:'#BF539E'}}>Doctor name</span> <span style={{color:'rgba(99, 93, 107, 1)'}}>25 April</span> </Space>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                        })
                    }

                </Slider>

            </div>
            </div>

    );
}

export default ClinicFeedback;

import React from "react";
import {Avatar, Button, Col, Divider, Rate, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";

function OfferCard({el}) {
    return(
        <Col lg={8} >
            <div className={'offer_card'}>
                <div className={'offer_card_image_div'}>
                    {el?.image}
                    <div style={{width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'right'}} >
                        <div className={'offer_card_percent'}>
                            50%
                        </div>
                    </div>
                    <div className={'offer_card_big_text'}>
                        Long name of offer name will be placed here
                    </div>
                    <div className={'offer_card_smoll_text'}>
                        5 Test Hair Fall Package
                    </div>
                    <div className={'offer_card_stars'}>
                        <Rate disabled value={5} />
                        <span style={{marginLeft:10}}>32 Reviews</span>
                    </div>
                    <div align={'center'} >
                        <div style={{width: '90%'}}>
                            <Divider style={{background:'#aaa6ab'}}/>
                        </div>
                    </div>
                    <div className={'offer_card_avatar'}>
                        <Space >
                            <Avatar size={50} icon={<UserOutlined />} />
                            <div style={{display:"block"}}>
                                <h2 style={{fontWeight: 600}}>Clinic Name here</h2>
                                <div  className={'offer_card_smoll_text1'}>King Fahd Rd, Al Olaya, Riyadh</div>
                            </div>

                        </Space>
                    </div>
                    <div align={'center'} >
                        <div style={{width: '90%'}}>
                            <Divider style={{background:'#aaa6ab'}}/>
                        </div>
                    </div>
                    <div className={'offer_card_avatar'}>
                        <div className={'off_card_price_btn'}>
                            <Space >
                                <div style={{display:"block"}}>
                                    <h2 style={{fontWeight: 600}}>369 SAR</h2>
                                    <div>
                                        <span style={{fontSize: 14, }}>562 SAR</span><span style={{marginLeft: 10, color:'#CD499B'}}>Save 223 SAR</span>
                                        <div className={'line'}></div>
                                    </div>
                                </div>
                            </Space>
                            <Button size={'large'} type={'primary'}>Book now</Button>
                        </div>

                    </div>

                </div>
            </div>
        </Col>
    )
}
export default OfferCard;
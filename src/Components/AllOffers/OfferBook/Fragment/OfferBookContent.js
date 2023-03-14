import React from "react";
import clinic1 from "../../../../dist/Img/clinic1.jpg";
import {Avatar, Button, Divider, Rate, Space, Badge, Tag} from "antd";
import {RightOutlined, UserOutlined} from "@ant-design/icons";
import "../../AllOffers.sass";

function OfferBookContent() {
    return (
        <div className={'offer_book_card'}>
            <div className={'offer_book_card_image_div'}>
                <Badge.Ribbon text="50.0%" color={'red'} style={{marginTop:'30%', height: 60, width:150, fontWeight:700, fontSize: 32, display:'flex',  alignItems:"center"}}>
                <img src={clinic1} alt={'clinic1'} className={'offer_card_image'}/>
                </Badge.Ribbon>
                <div className={'avatar_and_price_div'}>
                    <div className={'offer_card_avatar'}>
                        <Space >
                            <Avatar shape="square" size={130} icon={<UserOutlined />} style={{marginTop:-40, background:'grey'}}/>
                            <div style={{display:"block"}}>
                                <h2 style={{fontWeight: 600}}>Fractional Laser Session</h2>
                                <div>
                                    <Rate disabled value={4} />
                                    <span style={{marginLeft:15}}>(5 Reviews)</span>
                                </div>
                                <div  className={'offer_pink_text'}>2 months Left</div>
                            </div>

                        </Space>
                    </div>

                    <div className={'big_price_div'}>
                        <div>
                            <Tag color="#63183e" style={{marginBottom:-5, marginLeft:15, fontWeight:600}}>Save 50%</Tag>
                            <div className={'price_div'}>
                                <div>
                                    <div className={'line'}></div>
                                    <span style={{fontSize: 14}}>300.00 SAR</span><span style={{marginLeft: 10, color:'#ffffff'}}>150 SAR</span>

                                </div>
                                <Divider type={'vertical'} style={{backgroundColor: '#ffffff', height: 25}} />
                                <div style={{display: 'flex'}}>
                                    <div>Claim Now</div>
                                    <RightOutlined />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div align={'center'} >
                        <Divider style={{background:'#aaa6ab'}}/>
                </div>

            </div>
        </div>
    )
}
export default OfferBookContent;
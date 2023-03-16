import React from "react";
import {Avatar, Button, Col, Divider, Rate, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import off_image_1 from "../../../dist/Img/off_image_1.jpg";
import {useNavigate} from "react-router";

function OfferCard({data, id}) {
    const navigate = useNavigate()
    const onBookNow = () => {
        navigate(`/all-offers/${id}`)
    }

    return(
        <Col lg={8} >
            <div className={'offer_card'}>
                <div className={'offer_card_image_div'}>
                    <img src={off_image_1} alt={'off_image_1'} className={'offer_card_image'}/>
                    <div style={{width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'right'}} >
                        <div className={'offer_card_percent'}>
                            {(100 - (data?.new_price *100 / data?.old_price)).toFixed(1)}%
                        </div>
                    </div>
                    <div className={'offer_card_big_text'}>
                        {data?.title}
                    </div>
                    <div className={'offer_card_smoll_text'}>
                        {data?.category?.name}
                    </div>
                    <div className={'offer_card_stars'}>
                        <Rate disabled value={+data?.avg_rating} />
                        <span style={{marginLeft:10}}>{data?.rating_count} Reviews</span>
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
                                <h2 style={{fontWeight: 600}}>{data?.clinic?.name}</h2>
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
                                    <h2 style={{fontWeight: 600}}>{data?.new_price} SAR</h2>
                                    <div>
                                        <span style={{fontSize: 14, }}>{data?.old_price} SAR</span><span style={{marginLeft: 20, color:'#CD499B'}}>Save {data?.old_price - data?.new_price} SAR</span>
                                        <div className={'line'}></div>
                                    </div>
                                </div>
                            </Space>
                            <Button size={'large'} type={'primary'} onClick={onBookNow}>Book now</Button>
                        </div>

                    </div>

                </div>
            </div>
        </Col>
    )
}
export default OfferCard;
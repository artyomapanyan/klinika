import React, { useState } from 'react'
import clinic1 from '../../../../dist/Img/clinic1.jpg'
import { Avatar, Divider, Rate, Space, Badge, Tag } from 'antd'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import '../../AllOffers.sass'
import OfferBookDetails from './OfferBookDetails'
import { useGetResourceSingle } from '../../../Functions/api_calls'
import { useParams } from 'react-router'
import BookAnAppointment from './BookAnAppointment'
import { t } from 'i18next'
import { useSelector } from 'react-redux'

function OfferBookContent() {
	const params = useParams()
	let lngs = useSelector(state => state?.app?.current_locale)

	const { loadingState, dataState } = useGetResourceSingle(
		'PublicOffer',
		params.id
	)

	const { data, setData } = dataState
	const { loading, setLoading } = loadingState

	return (
		<div className={'offer_book_card'}>
			<div className={'offer_book_card_image_div'}>
				<Badge.Ribbon
					text={`${(100 - (data?.new_price * 100) / data?.old_price).toFixed(
						1
					)}%`}
					color={'red'}
					style={{
						marginTop: '300px',
						height: 60,
						width: 150,
						fontWeight: 700,
						fontSize: 32,
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<img src={data?.cover?.url ? data?.cover?.url : clinic1} alt={'clinic1'} className={'offer_card_image'} />
				</Badge.Ribbon>
				<div className={'avatar_and_price_div'}>
					<div className={'offer_card_avatar'}>
						<Space>
							<Avatar
								shape='square'
								size={130}
								src={<img src={data?.cover?.url} />}
								style={{ marginTop: -40, background: 'grey' }}
							/>
							<div style={{ display: 'block' }}>
								<h2 style={{ fontWeight: 600 }}>{data?.title}</h2>
								<div>
									<Rate disabled value={data?.avg_rating} />
									<span style={{ marginLeft: 15 }}>{`(${data?.avg_rating}${t(
										'Reviews'
									)})`}</span>
								</div>
								{/*<div  className={'offer_pink_text'}>2 months Left</div>*/}
							</div>
						</Space>
					</div>

					<div className={'big_price_div'}>
						<div>
							<Tag
								color='#63183e'
								style={{ marginBottom: -5, marginLeft: 15, fontWeight: 600 }}
							>
								{t('Save')}{' '}
								{(100 - (data?.new_price * 100) / data?.old_price).toFixed(1)}%
							</Tag>
							<div className={'price_div'}>
								<div style={{ marginTop: 8 }}>
									<div className={'line'}></div>
									<span style={{ fontSize: 20 }}>{data?.old_price}.0</span>{' '}
									<span style={{ fontSize: 12 }}>{t('SAR')}</span>
									<span
										style={{ marginLeft: 10, color: '#ffffff', fontSize: 20 }}
									>
										{data?.new_price}.0
									</span>
									<span style={{ fontSize: 12 }}>{t('SAR')}</span>
								</div>
								<Divider
									type={'vertical'}
									style={{ backgroundColor: '#ffffff', height: 25 }}
								/>
								<div style={{ display: 'flex' }}>
									<div>{t('Claim Now')}</div>
									{lngs === 'en' ? <RightOutlined /> :
                                    <div style={{margin:'5px'}}>
                                    <LeftOutlined />
                                    </div>
                                    }

								</div>
							</div>
						</div>
					</div>
				</div>

                <div align={'center'} >
                    {/*<div className={'purple_text'}>{t('Offer Details')}</div>*/}
                        <Divider style={{background:'#e3e0e3'}}/>
                </div>
                <div style={{width: '100%'}}>
                    <OfferBookDetails data={data} />
                </div>
                <div align={'center'} >
                    <div className={'purple_text'} >{t('Book an appointment')}</div>
                    <Divider style={{background:'#e3e0e3'}}/>
                </div>
                <div className={'app_border_div'}>
                    <BookAnAppointment data={data}/>
                </div>
            </div>
        </div>
    )
}
export default OfferBookContent;
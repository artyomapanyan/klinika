import React from 'react'
import { Avatar, Button, Col, Divider, Rate, Space } from 'antd'
import off_image_1 from '../../../dist/Img/off_image_1.jpg'
import { useNavigate } from 'react-router'
import { t } from 'i18next'
import { useSelector } from 'react-redux'

function OfferCard({ data, id }) {
	let lngs = useSelector((state) => state?.app?.current_locale);
	const navigate = useNavigate()
	const onBookNow = () => {
  	  navigate(`/offers/${id}`)
	}

	return (
		<Col lg={12} xl={8} xxl={8} sm={24}>
			<div className={'offer_card'}>
				<div className={'offer_card_image_div'}>
					<div className={'offer_card_image_1'}>
						<img
							src={data?.logo ? data?.logo?.url : off_image_1}
							alt={'image'}
							className={'offer_card_image_1'}
							onError={({ currentTarget }) => {
								currentTarget.onerror = null // prevents looping
								currentTarget.src = off_image_1
							}}
						/>
					</div>
					<div
						style={
							lngs === 'en'
								? {
										width: '100%',
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'right'
								  }
								: {
										width: '100%',
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'left'
								  }
						}
					>
						<div className={'offer_card_percent'}>
							{(100 - (data?.new_price * 100) / data?.old_price).toFixed(1)}%
						</div>
					</div>
					<div className={'offer_card_big_text'}>{data?.title}</div>
					<div className={'offer_card_smoll_text'}>{data?.category?.name}</div>
					<div className={'offer_card_stars'}>
						<Rate disabled value={+data?.avg_rating} />
						<span style={{ marginLeft: 10 }}>
							{data?.rating_count} {t('Reviews')}
						</span>
					</div>
					<div align={'center'}>
						<div style={{ width: '90%' }}>
							<Divider style={{ background: '#aaa6ab' }} />
						</div>
					</div>
					<div className={'offer_card_avatar'}>
						<Space>
							<Avatar
								size={50}
								src={
									<img
										src={data?.clinic?.logo?.url}
										alt='avatar'
										onError={({ currentTarget }) => {
											currentTarget.onerror = null // prevents looping
											currentTarget.src = off_image_1
										}}
									/>
								}
							/>
							<div style={{ display: 'block' }}>
								<h2 style={{ fontWeight: 600 }}>{data?.clinic?.name}</h2>
								<div className={'offer_card_smoll_text1'}>
									{data?.clinic?.location?.address1?.en}
								</div>
							</div>
						</Space>
					</div>
					<div align={'center'}>
						<div style={{ width: '90%' }}>
							<Divider style={{ background: '#aaa6ab' }} />
						</div>
					</div>
					<div className={'offer_card_avatar'}>
						<div
							style={
								lngs === 'en'
									? {}
									: {
											direction: 'rtl'
									  }
							}
						>
							<div className={'off_card_price_btn'}>
								<Space>
                                <div style={{display:"block"}}>
                                    <h2 style={{fontWeight: 600}}>{data?.new_price} {t('SAR')}</h2>
                                    <div>
                                        <span style={{fontSize: 14, textDecoration: 'line-through'}}>{data?.old_price} {t('SAR')}</span><span style={{marginLeft: 20, color:'#CD499B'}}> {t('Save')} {(data?.old_price - data?.new_price).toFixed(1)} {t('SAR')}</span>

                                    </div>
                                </div>
								</Space>
								<Button size={'large'} type={'primary'} onClick={onBookNow}>
									{t('Book_now')}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Col>
	)
}
export default OfferCard

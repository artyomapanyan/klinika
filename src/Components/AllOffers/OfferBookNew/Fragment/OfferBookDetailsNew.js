import React, { useEffect, useState } from 'react'
import { t } from 'i18next'
import {Avatar, Button, Divider} from 'antd'
import off_image_1 from '../../../../dist/Img/off_image_1.jpg'
import Group from '../../../../dist/Img/Group.png'
import map from '../../../../dist/Img/map.png'
import global from '../../../../dist/Img/global-line.png'
import OfferMap from './OfferMap'
import { useSelector } from 'react-redux'
import clinic_logo from "../../../../dist/Img/clinic1.jpg";

function OfferBookDetails({ data, showDrawer }) {
	let lngs = useSelector(state => state?.app?.current_locale)
	const [isMobile, setIsMobile] = useState(false)
	const [lengthState, setLengthState] = useState(300)
		//choose the screen size
		const handleResize = () => {
			if (window.innerWidth < 720) {
				setIsMobile(true)
			} else {
				setIsMobile(false)
			}
		}
	
		// create an event listener
		useEffect(() => {
			window.addEventListener('resize', handleResize)
		})

	const onLoadMore = () => {
		setLengthState(data?.content?.length)
	}

	const onShowLess = () => {
		setLengthState(300)
	}




	return (
		<div className={'offer_book_div'}>
			<div className={'offer_desc'}>
				<h2 className={'offer_book_title'}>{data?.title}</h2>

				<div
					className={'offer_book_desc'}
					dangerouslySetInnerHTML={{ __html: data?.content?.slice(0, lengthState) + `${lengthState < data?.content?.length ? '...' : ''}`}}
				/>

				{
					data?.content?.length > 300 ? lengthState < data?.content?.length ? <div className={'read_more_less'} onClick={onLoadMore}>{t('Read more')}</div> : <div className={'read_more_less'} onClick={onShowLess}>{t('Show less')}</div> : <div></div>
				}

			</div>

			{isMobile ? (
					''
				) : (
					<div>
					<Divider />
				</div>
				)}
		

			<div>
				<div className={'offer_clinic_div'}>
					<div>
						<Avatar
							size={40}
							src={
								<img
									src={data?.clinic?.logo?.url ? data?.clinic?.logo?.url : clinic_logo}
									alt='avatar'
									onError={({ currentTarget }) => {
										currentTarget.onerror = null // prevents looping
										currentTarget.src = off_image_1
									}}
								/>
							}
						/>
					</div>
					<div className={'offer_clinic_container'}>
						<p className={'offer_clinic_name'}>{data?.clinic?.name}</p>
						<p className={'offer_clinic_address'}>
							{data?.clinic?.location?.region?.name}, {data?.clinic?.location?.city?.name}
						</p>
					</div>
				</div>

				<div className={'offer_clinic_location'}>
					<div className={'offer_location_div'}>
						<OfferMap data={data} />
					</div>
					<div
						style={
							lngs === 'en'
								? {}
								: {
										marginRight: '15px'
								  }
						}
					>
						<div className={'clinic_location_div'}>
							{data?.clinic?.location?.address1 && (
								<>
									<div>
										<span className={'clinic_location_name'}>{t('Location')}</span>
										<div className={'clinic_div'}>
											<p className={'clinic_content_name'}>
												{data?.clinic?.location?.address1}
											</p>
											<Avatar size={20} src={<img src={map} alt='avatar' />} />
										</div>
									</div>
								</>
							)}

							{data?.clinic?.website && (
								<>
									<hr />
									<div>
										<span className={'clinic_location_name'}>{t('Website')}</span>
										<div className={'clinic_div'}>
											<p className={'clinic_content_name'}>
												{data?.clinic?.website}
											</p>
											<Avatar
												size={20}
												src={<img src={global} alt='avatar' />}
											/>
										</div>
									</div>
								</>
							)}

							{data?.clinic?.phone_number && (
								<>
									<hr />
									<div>
										<span className={'clinic_location_name'}>{t('Phone')}</span>
										<div className={'clinic_div'}>
											<p className={'clinic_content_name'}>
												{
													lngs === 'ar' ?  `${data?.clinic?.phone_number} ${data?.clinic?.phone_country_code} +` : `+ ${data?.clinic?.phone_country_code} ${data?.clinic?.phone_number}`
												}

											</p>
											<p>
												<Avatar
													size={20}
													src={<img src={Group} alt='avatar' />}
												/>
											</p>
										</div>
									</div>
								</>
							)}

						</div>
					</div>
				</div>
			</div>
			{
				<div className={'bottom_drawer_div'}>
					<Button type="primary" onClick={showDrawer} style={{width: '100%', height: 56}}>
						{t('Select doctor and time')}
					</Button>
				</div>
			}

		</div>
	)
}

export default OfferBookDetails

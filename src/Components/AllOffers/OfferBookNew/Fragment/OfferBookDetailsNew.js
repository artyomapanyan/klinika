import React from 'react'
import { t } from 'i18next'
import { Avatar, Divider } from 'antd'
import off_image_1 from '../../../../dist/Img/off_image_1.jpg'
import Group from '../../../../dist/Img/Group.png'
import map from '../../../../dist/Img/map.png'
import global from '../../../../dist/Img/global-line.png'
import OfferMap from './OfferMap'
import { useSelector } from 'react-redux'

function OfferBookDetails({ data }) {
	let lngs = useSelector(state => state?.app?.current_locale)
	return (
		<div className={'offer_book_div'}>
			<h2 className={'offer_book_title'}>{data?.title}</h2>

			<div
				className={'offer_book_desc'}
				dangerouslySetInnerHTML={{ __html: data?.content }}
			/>

			<Divider className={'offer_book_divider'} />

			<div>
				<div className={'offer_clinic_div'}>
					<div>
						<Avatar
							size={40}
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
					</div>
					<div className={'offer_clinic_container'}>
						<p className={'offer_clinic_name'}>{data?.clinic?.name}</p>
						<p className={'offer_clinic_address'}>
							{data?.clinic?.location?.address1?.en}
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
							{data?.clinic?.location?.address1?.en && (
								<>
									<div>
										<span className={'clinic_location_name'}>Location</span>
										<div className={'clinic_div'}>
											<p className={'clinic_content_name'}>
												{data?.clinic?.location?.address1?.en}
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
										<span className={'clinic_location_name'}>Website</span>
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
										<span className={'clinic_location_name'}>Phone</span>
										<div className={'clinic_div'}>
											<p className={'clinic_content_name'}>
												{data?.clinic?.phone_number}
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
		</div>
	)
}

export default OfferBookDetails

import React, { useEffect, useState } from 'react'

import '../../AllOffers.sass'
import OfferBookDetailsNew from './OfferBookDetailsNew'
import {postResource, useGetResourceSingle} from '../../../Functions/api_calls'
import { useParams } from 'react-router'
import { t } from 'i18next'
import { useSelector } from 'react-redux'
import BookAnAppointmentNew from './BookAnAppointmentNew'
import OfferPrice from './OfferPrice.js'
import OfferHours from './OfferHours.js'
import off_image_1 from '../../../../dist/Img/off_image_1.jpg'
import Preloader from '../../../Preloader'
import { useNavigate } from 'react-router'
import {  LeftOutlined } from '@ant-design/icons'
import { Drawer, Result} from "antd";

function OfferBookContent() {
	const params = useParams()
	let token = useSelector((state) => state.auth.token);
	let lngs = useSelector(state => state?.app?.current_locale)
	const [isMobile, setIsMobile] = useState(false)
	const navigate = useNavigate()
	const [open, setOpen] = useState(false);
	const [response404, setResponse404] = useState({});




	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	const onClick = () => {
		navigate(-1)
	}

	//choose the screen size
	const handleResize = () => {
		if (window.innerWidth < 600) {
			setIsMobile(true)
		} else {
			setIsMobile(false)
		}
	}

	// create an event listener
	useEffect(() => {
		window.addEventListener('resize', handleResize)
	}, [isMobile])


	const { loadingState, dataState } = useGetResourceSingle(
		'PublicOffer',
		params.id
	)

	useEffect(() => {
		if(params?.id) {
			postResource('PublicOffer', 'single', token, params.id).then(response => {
				setResponse404(response?.response)
			})
		}

	}, [])



	const { loading } = loadingState
	const { data, setData } = dataState



	return (
		<>
			{
				response404?.status === 404 ? <Result
					status="404"
					title="404"
					subTitle="Sorry, the page you visited does not exist."

				/> : <>

					<div
						style={{
							position: 'absolute',
							top: '20px',
							left:'10px',
							width: '40px',
							height: '40px',
							zIndex: '999'
						}}
					>
						<div className={'tab_div_mobile_new_offer_arrow'}>
							<div onClick={onClick}>
								<LeftOutlined style={{color:'white'}}/>
							</div>
						</div>
					</div>

					{loading ? (
						<Preloader />
					) : (
						<div className={'offer_book_card_new'}>
							<div className={'offer_book_card_image_div'}>

								<img
									src={data?.cover?.url ? data?.cover?.url : off_image_1}
									alt='cover'
									className={'offer_card_image_new'}
								/>

								<h2 className={'offer_book_title1'} style={{paddingRight: lngs === 'en' ? 20 : 0, paddingLeft: lngs === 'en' ? 0 : 15}}>{data?.title}</h2>


								<div className={'offer_details_new'}>
									<OfferBookDetailsNew data={data} showDrawer={showDrawer} />

									<div className={'offer_section'}>
										<div>
											{isMobile ? (
												<div>
													<OfferHours data={data} />
													<div style={{ marginTop: '10px' }}>
														<OfferPrice data={data} />
													</div>
												</div>
											) : (
												<div>
													<OfferPrice data={data} />
													<OfferHours data={data} />
												</div>
											)}
										</div>

										<div className={'offer_appointment_sec'}>
											<BookAnAppointmentNew data={data} setOpen={setOpen} />
										</div>


										<div>

											<Drawer
												placement={'bottom'}
												closable={false}
												onClose={onClose}
												open={open}
												height={600}
												style={{borderRadius: '12px 12px 0 0'}}



											>
												<BookAnAppointmentNew data={data} setOpen={setOpen} />
											</Drawer>
										</div>

									</div>
								</div>
							</div>
						</div>
					)}
				</>
			}

		</>
	)
}
export default OfferBookContent

/**
 * <div
				style={{
					position: 'sticky',
					bottom: '10px',
					left:'0px',
					width: '100%',
					height: '40px',
					zIndex: '999'
				}}
			>
				<div>
					<div className={'tab_div_mobile_new_appointment'}>
							<div className={'select_mobile_appointment'}>
								<p>Select doctor and time</p>
							</div>
						</div>
				</div>
			</div>
 * 
 */
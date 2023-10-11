import React, { useEffect, useState } from 'react'
import clinic2 from '../../../../dist/Img/clinic2.png'
import '../../AllOffers.sass'
import OfferBookDetailsNew from './OfferBookDetailsNew'
import { useGetResourceSingle } from '../../../Functions/api_calls'
import { useParams } from 'react-router'
import { t } from 'i18next'
import { useSelector } from 'react-redux'
import BookAnAppointmentNew from './BookAnAppointmentNew'
import OfferPrice from './OfferPrice.js'
import OfferHours from './OfferHours.js'
import off_image_1 from '../../../../dist/Img/off_image_1.jpg'
import Preloader from '../../../Preloader'
import { useNavigate } from 'react-router'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import {Button, Drawer} from "antd";

function OfferBookContent() {
	const params = useParams()
	let lngs = useSelector(state => state?.app?.current_locale)
	const [isMobile, setIsMobile] = useState(false)
	const navigate = useNavigate()
	const [open, setOpen] = useState(false);

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

	const { loading } = loadingState
	const { data, setData } = dataState

	return (
		<>
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
									src={data?.cover?.url ? data?.cover?.url : clinic2}
									alt='cover'
									className={'offer_card_image_new'}
								/>


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
									<BookAnAppointmentNew data={data} />
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
										<BookAnAppointmentNew data={data} />
									</Drawer>
								</div>

							</div>
						</div>
					</div>
				</div>
			)}
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
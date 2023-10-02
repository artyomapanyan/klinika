import React from 'react'
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

function OfferBookContent() {
	const params = useParams()
	let lngs = useSelector(state => state?.app?.current_locale)

	const { loadingState, dataState } = useGetResourceSingle(
		'PublicOffer',
		params.id
	)

	const { loading } = loadingState
	const { data, setData } = dataState

	return (
		<>
			{loading ? (
				<Preloader />
			) : (
				<div className={'offer_book_card_new'}>
					<div className={'offer_book_card_image_div'}>
						{data?.cover?.url ? (
							<>
								<img
									src={data?.cover?.url}
									alt='avatar'
									className={'offer_card_image_new'}
								/>
							</>
						) : (
							<img
								src={clinic2}
								alt={'clinic2'}
								className={'offer_card_image_new'}
							/>
						)}

						<div className={'offer_details_new'}>
							<OfferBookDetailsNew data={data} />

							<div className={'offer_section'}>
								<div className={'offer_order'}>
									
										<OfferPrice data={data} />
									
									
										<OfferHours data={data} />
								
								</div>

								<div className={'offer_appointment_sec'}>
									<BookAnAppointmentNew data={data} />
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

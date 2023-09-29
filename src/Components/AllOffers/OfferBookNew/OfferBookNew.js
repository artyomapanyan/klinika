import React from 'react'
import off_head from '../../../dist/Img/off_head.png'
import OffersFooter from '../Fragments/OffersFooter'
import OfferBookContentNew from './Fragment/OfferBookContentNew'
import AllOffersHeader from '../Fragments/AllOffersHeader'
import { useSelector } from 'react-redux'

function OfferBookNew() {
	let lngs = useSelector(state => state?.app?.current_locale)

	return (
		<>
			<div>
				<div className={'offer_logo_div'}>
					<AllOffersHeader headerState={true} />
				</div>
				<div
					style={
						lngs === 'en'
							? {}
							: {
									direction: 'rtl'
							  }
					}
				>
					<div className={'menu_div'} style={{ minHeight: 500 }}>
						<OfferBookContentNew />
					</div>

					<OffersFooter />
				</div>
			</div>
		</>
	)
}
export default OfferBookNew

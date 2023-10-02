import React from 'react'
import off_head from '../../../dist/Img/off_head.png'
import OffersFooter from '../Fragments/OffersFooter'
import OfferBookContentNew from './Fragment/OfferBookContentNew'
import AllOffersHeader from '../Fragments/AllOffersHeader'
import { useSelector } from 'react-redux'
import AllOffersMobileHeader from '../Fragments/AllOffersMobileHeader'
import mobile_filter_icon from '../../../dist/icons/mobile_filter_icon.png'

function OfferBookNew() {
	let lngs = useSelector(state => state?.app?.current_locale)

	return (
		<>
			
			<div>
			{/**	<div className={'tab_div_mobile_new'}>
					<AllOffersMobileHeader />
				</div>**/}

				<div className={'offer_logo_div_new'}>
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
				
					<div className={'menu_div_new'} style={{ minHeight: 500 }}>
						<OfferBookContentNew />
					</div>

					<OffersFooter />
				</div>
			</div>
		</>
	)
}
export default OfferBookNew

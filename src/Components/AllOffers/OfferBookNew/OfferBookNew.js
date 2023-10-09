import React from 'react'
import off_head from '../../../dist/Img/off_head.png'
import OffersFooter from '../Fragments/OffersFooter'
import OfferBookContentNew from './Fragment/OfferBookContentNew'
import AllOffersHeader from '../Fragments/AllOffersHeader'
import { useSelector } from 'react-redux'
import NavbarOffersHeader from '../OfferBookNew/Fragment/NavbarOffersHeader'
import mobile_filter_icon from '../../../dist/icons/mobile_filter_icon.png'

function OfferBookNew() {
	let lngs = useSelector(state => state?.app?.current_locale)

	return (
		<>
			{/*<div
				style={{
					backgroundColor: 'black',
					width: '100%',
					position: 'sticky',
					top: '0%',
					zIndex: '999',
					padding: '10px'
				}}
			>
				back to offers
			</div>*/}

			<div style={{paddingBottom: 100}}>
				<div className={'offer_logo_div_new'}>
					<NavbarOffersHeader headerState={true} />
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

					{/**<OffersFooter />**/}
				</div>
			</div>
		</>
	)
}
export default OfferBookNew

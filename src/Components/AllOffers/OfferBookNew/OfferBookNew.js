import React, {useEffect} from 'react'

import OfferBookContentNew from './Fragment/OfferBookContentNew'

import {useDispatch, useSelector} from 'react-redux'
import NavbarOffersHeader from '../OfferBookNew/Fragment/NavbarOffersHeader'

import {changeLanguage} from "i18next";

function OfferBookNew() {
	let lngs = useSelector(state => state?.app?.current_locale)
	let dispatch = useDispatch()

	useEffect(()=>{
		if(lngs!=='ar'){
			changeLanguage('ar')
			dispatch({
				type:'LANGUAGE_STATE',
				payload:'ar'
			})
			window.location.reload()
		}
	},[])

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

			<div className={'offers_book_padding_bottom'}>
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

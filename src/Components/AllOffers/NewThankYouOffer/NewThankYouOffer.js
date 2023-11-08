import {useSelector} from "react-redux";
import NavbarOffersHeader from "../OfferBookNew/Fragment/NavbarOffersHeader";
import React from "react";
import NewThankYouBookContent from "./Fragment/NewThankYouBookContent";

function NewThankYouOffer() {
    let lngs = useSelector(state => state?.app?.current_locale)

    return (
        <div>
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
                    <div className={'menu_div_new'} style={{ minHeight: 500}}>
                        <NewThankYouBookContent />
                    </div>

                    {/**<OffersFooter />**/}
                </div>
            </div>
        </div>
    )
}
export default NewThankYouOffer
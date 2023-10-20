import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {useSearchParams} from "react-router-dom";
import {useGetResourceIndex} from "../../../Functions/api_calls";
import {paramsToObject} from "../../../../functions";

import img_thank_you from '../../../../dist/Img/thank_you.png'
import {t} from "i18next";

function ThankYouOffer() {
	const currentUrl = window.location.href;
    let clinicRedux = useSelector((state) => state?.publicClinic);
    let navigate = useNavigate();
    let lngs = useSelector(state => state?.app?.current_locale)

    let [searchParams, setSearchParams] = useSearchParams();
    const [params, setParams] = useState({
        clinic: clinicRedux?.id,
     //   ...paramsToObject(searchParams.entries())
    })

    const [resetState, setResetState] = useState(false)

    const {loadingState, dataState, addData} = useGetResourceIndex('PublicOffer', params,false,false,false,false, {
        PublicClinic:{per_page:5000},
        PublicCategory:{},
    })


 
	return (
		<div className={'thank_div'} >
			<img
				src={img_thank_you}
				alt={'img_thank_you'}
				className={'thank_image'}
			/>
			<p className={'thank_offer_title'}>{t('You book an offer!')}</p>
			<p className={'thank_offer_description'}>
				{t('A brief instruction on what to do next, that the manager will contact him and remind him about the reception.')}
			</p>
			<button className={'button_style_cancel'}>{t('Close')}</button>
		</div>
	)
}
export default ThankYouOffer

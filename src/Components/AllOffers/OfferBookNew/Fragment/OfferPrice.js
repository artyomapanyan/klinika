import React from 'react'
import { t } from 'i18next'

function OfferPrice({ data }) {

	return (
		<div>
			<div className={'offer_price_div'}>
				<div>
					<span className={'offer_new_price'}>{data?.new_price}.0</span>
					<span className={'offer_new_price'}>{t('SAR')}</span>
					<span className={'offer_old_price'}>
					  {data?.old_price}.0
					</span>
					<span className={'offer_old_price'}>{t('SAR')}</span>
				</div>
			</div>

			<div className={'offer_save_price'}>
				{t('Save')}
				<span className={'offer_percent'}>
					{(100 - (data?.new_price * 100) / data?.old_price).toFixed(1)}%
				</span>
				(<span className={'offer_save'}>
					{( data?.old_price - data?.new_price ).toFixed(1)} 
				</span>
				<span className={'offer_sar'}>{t('SAR')}</span>
				)
			
			</div>
		</div>
	)
}

export default OfferPrice

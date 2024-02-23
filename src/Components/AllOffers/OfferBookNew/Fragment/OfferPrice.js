import React from 'react'
import { t } from 'i18next'

function OfferPrice({ data, verifyResponseNationality, totalState }) {

	console.log(verifyResponseNationality, data)

	return (
		<div>
			{
				totalState ? <div>
						<div className={'offer_price_div'}>
							<div className={'offer_new_price'}>
								{t('Total with taxes')}
								<span className={'offer_percent'}>:</span>
								<span className={'offer_percent'}>{verifyResponseNationality ? data?.new_price_after_vat_saudi : data?.new_price_after_vat_non_saudi}</span>
								<span className={'offer_sar'}> {t('SAR')}</span>
							</div>
							<div className={'offer_save_price_new'}>
								{t('Original Price')}
								<span className={'offer_percent'}>:</span>
								<span className={'offer_percent'}>{data?.old_price}</span>
								<span className={'offer_sar'}> {t('SAR')}</span>

							</div>
							<div className={'offer_save_price'}>
								{t('Discount')}
								<span className={'offer_percent'}>:</span>
								<span className={'offer_percent'}>{parseFloat((100 - (data?.new_price * 100) / data?.old_price).toFixed(2))}%</span>
								(<span className={'offer_save'}>{parseFloat((data?.old_price - data?.new_price ).toFixed(2))}</span>
								<span className={'offer_sar'}> {t('SAR')}</span>
								)
							</div>
							<div className={'offer_save_price'} style={{marginTop: -7}}>
								{t('Tax')}
								<span className={'offer_percent'}>:</span>
								<span className={'offer_percent'}>{verifyResponseNationality ? data?.tax_percentage_for_saudies : data?.tax_percentage_for_non_saudies}%</span>
								(<span className={'offer_save'}>{parseFloat((verifyResponseNationality ? (data?.new_price_after_vat_saudi - data?.new_price) : (data?.new_price_after_vat_non_saudi - data?.new_price)).toFixed(2))}</span>
								<span className={'offer_sar'}> {t('SAR')}</span>
								)

							</div>
						</div>
					</div> : <div>
					<div className={'offer_price_div'}>
						<div>
							<span className={'offer_new_price'}>{data?.new_price}</span>
							<span className={'offer_new_price'}> {t('SAR')}</span>
							<span className={'offer_old_price'}> {data?.old_price}</span>
							<span className={'offer_old_price'}> {t('SAR')}</span>
						</div>
					</div>

					<div className={'offer_save_price'}>
						{t('Save')}
						<span className={'offer_percent'}>{(100 - (data?.new_price * 100) / data?.old_price).toFixed(1)}%</span>
						(<span className={'offer_save'}>{( data?.old_price - data?.new_price ).toFixed(1)}</span>
						<span className={'offer_sar'}>{t('SAR')}</span>
						)

					</div>
				</div>

			}




		</div>
	)
}

export default OfferPrice

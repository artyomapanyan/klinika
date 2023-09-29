import img_thank_you from '../../../../dist/Img/thank_you.png'
function ThankYouOffer() {
	return (
		<div className={'thank_div'} >
			<img
				src={img_thank_you}
				alt={'img_thank_you'}
				className={'thank_image'}
			/>
			<p className={'thank_offer_title'}>You book an offer!</p>
			<p className={'thank_offer_description'}>
				A brief instruction on what to do next, that the manager will contact
				him and remind him about the reception.
			</p>
			<button className={'button_style_cancel'}>Close</button>
		</div>
	)
}
export default ThankYouOffer

import payment_failed_image from "../../../dist/Img/payment_failed_image.png";
import React from "react";
import {Button} from "antd";
import {t} from "i18next";


function PaymentFailed() {

    return <div align={'center'} className={'payment_failed_big_div'}>
        <div style={{padding: '32px 32px 24px 32px'}}>
            <img src={payment_failed_image} alt={'payment_failed_image'}  />
        </div>
        <div className={'payment_failed_bold_text'}>
            {t("Payment failed")}
        </div>
        <div className={'payment_failed_light_text'}>
            {t('There are some problems with paying for a visit to the doctor. You can try again or choose another payment method')}.
        </div>
        <div style={{marginTop: 24}}>
            <Button className={'all_offers_book_btns'} type={'primary'}>{t('Try again')}</Button>

        </div>
        <div style={{marginTop: 12}}>
            <Button className={'all_offers_book_btns'} type={'secondary'}>{t('Go back')}</Button>
        </div>

    </div>
}
export default PaymentFailed;
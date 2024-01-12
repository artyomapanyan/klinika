import './AccountDeleteProcess.sass'
import clinic_logo_only_bird from "../../dist/Img/clinic_logo_only_bird.png";
import React, {useState} from "react";
import {Button, Form} from "antd";
import {t} from "i18next";
import FormInput from "../../Components/Fragments/FormInput";
import {postResource} from "../Functions/api_calls";
import {useSelector} from "react-redux";
import Preloader from "../Preloader";
function AccountDeleteProcess() {
    let token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false)

    const onFinish = (values) => {
        setLoading(true)
        postResource('PublicDeleteAccountRequest', 'DeleteAccountRequest', token, '', values).then((response) => {
            setLoading(false)

        })
    }


    return <div className={'delete_account_big_div'}>
        <div className={'delete_account_inn_big_div'} >
            <Form
                style={{lineHeight: 3}}
                onFinish={onFinish}
            >
                <div className={'delete_account_logo_and_names_div'}>
                    <div className={'delete_account_logo_big_div'}>
                        <div className={'delete_account_logo_div'}>
                            <img src={clinic_logo_only_bird} alt={'clinic_logo_only_bird'} className={'delete_account_logo'} />
                        </div>

                    </div>
                    <div className={'delete_account_names_div'}>
                        <div>
                            App Name: <span className={'delete_account_bold_text'}>Klinika</span>
                        </div>
                        <div>
                            Developer name: <span className={'delete_account_bold_text'}>Smartech Industry</span>
                        </div>
                    </div>

                </div>
                <div className={'delete_account_information_text_big_div'}>

                    <div style={{lineHeight: 1.5}}>

                           We understand that you want to delete your account and all the information from our service,
                        but we kindly ask you not to do so. This is because this information is medical and important for your health.
                            We respect your privacy and we want to help you take care of yourself.


                    </div>
                    <div>
                        We store the following types of data during all periods of your use of our service:
                    </div>
                    <div>
                        <ul>
                            <li>
                                Your personal information, such as your name, email, phone number.
                            </li>
                            <li>
                                Your medical data, such as your symptoms, diagnoses, treatments, medications, and allergies.
                            </li>
                            <li>
                                Your appointment history, such as the date, time, duration, and provider of each visit.
                            </li>
                            <li>
                                Some analytics statistics that help us to develop our service and improve your experience.
                            </li>
                        </ul>
                    </div>
                    <div>
                        If you are sure that you want to delete your account, please follow these steps:
                    </div>
                    <div>
                        1) Fill out the form below with your email address.
                    </div>
                    <div>
                        2) We will review your request within 5 days and contact you by email to discuss the way of deleting your information.
                    </div>
                    {
                        loading ? <Preloader/> : <div dir='ltr'>
                            <div style={{marginTop: 15}}>
                                <FormInput  label={t('Account email')} name={'email'} rules={[{
                                    required: true,
                                    type: 'email',

                                }]}/>

                            </div>
                            <div>
                                Also, please tell us the reason you leave us. It is important for us to grow
                            </div>
                            <div className={'delete_account_textarea_div'} dir='ltr'>

                                <FormInput textareaHeight={true} inputType={'textArea'} label={t('Reason for deleting account')} name={'message'} />

                            </div>
                        </div>
                    }

                    <div>
                        <Button loading={loading} type={'primary'} size={'large'} htmlType={'submit'}>{t('Send request')}</Button>
                    </div>
                    <div>
                        We hope that you will reconsider your decision and keep using our service. We value your feedback and we are always working to improve our service. Thank you for choosing Klinika!😊
                    </div>


                </div>
            </Form>
        </div>

    </div>
}
export default AccountDeleteProcess
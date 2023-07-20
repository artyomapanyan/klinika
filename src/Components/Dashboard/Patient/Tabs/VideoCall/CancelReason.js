import React, {useState} from "react";
import {Button, Checkbox, Form, Radio} from "antd";
import {t} from "i18next";
import FormInput from "../../../../Fragments/FormInput";

function CancelReason({setIsModalOpen}) {

    const [radioState, setRadioState] = useState();

    const onChange = (e) => {
        console.log(`checked = ${e.target.value}`);
        setRadioState(e.target.value)
    };

    const onFinish = (values) => {
        console.log(values)
        setIsModalOpen(false)
    }

    return(
        <div>
            <Form
                onFinish={onFinish}
            >
                <div style={{marginTop: 20}}>
                    Please specify reason of cancellation
                </div>
                <Form.Item name={'radio'}>
                    <Radio.Group
                        direction="vertical"
                        onChange={onChange}
                        value={radioState}
                        buttonStyle={'solid'}
                    >
                        <div style={{marginTop: 19}}>
                            <Radio  render  value="1">The patient did not answer the call</Radio>
                        </div>
                        <div style={{marginTop: 29}}>
                            <Radio  value="2">Technical issues. There is no way to connect.</Radio>
                        </div>
                        <div style={{marginTop: 29}}>
                            <Radio  value="3">Technical issues. There is no way to connect.</Radio>
                        </div>

                    </Radio.Group>
                </Form.Item>
                <FormInput inputDisabled={radioState != 3}  label={t('description')} name={'description'} inputType={'textArea'}/>
                <div style={{ marginLeft: 5}}>
                    <Button size={'large'} type={'primary'} htmlType="submit">{t("Submit reason")}</Button>
                    <Button onClick={()=>setIsModalOpen(false)} style={{marginLeft: 10}} size={'large'} type={'secondary'}>{t("Cancel")}</Button>
                </div>

            </Form>



        </div>
    )
}
export default CancelReason;
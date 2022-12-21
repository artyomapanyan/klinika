import React, {useRef, useState} from 'react';
import {Button, Form, Input,Space} from 'antd';
import "./Country.sass"
import {createResource, updateResource, useGetResourceSingle} from "../../../Functions/api_calls";
import {useNavigate, useParams} from "react-router";
import Preloader from "../../../Preloader";
import {useSelector} from "react-redux";
import resourceLinks from "../../../ResourceLinks";
import {t} from "i18next";
import FormInput from "../../../Fragments/FormInput";
import "../../../../dist/styles/Styles.sass";
import moment from "moment";

const resource = 'Country';

function Country() {
    const params = useParams();
    const navigate = useNavigate();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [valuesState, setValuesState] = useState('')
    const formRef = useRef();

    const onFinish = (values) => {
        setLoading(true)
        if (params.id) {
            updateResource(resource, params.id, values, token).then(response => {
                setData(response)
            }).finally(() => {
                setLoading(false)
            })
        } else {
            createResource(resource, values, token).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks[resource] + response.id)
                }

            }).finally(() => {
                setLoading(false)
            })
        }
        setValuesState(values)

    }


    return (
        <div className={"add_edit_content"}>
            {data?.name ? <h3>{t(`Editing Country - ${data?.name}`)}</h3> : <h3>{t(`Editing Country`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                initialValues={data}
            >
                <div>
                    <FormInput label={t('Date')} name={'date'} initialValue={moment()} inputType={'date'} />
                </div>
                <div>
                    <FormInput
                        label={t('Alpha2 code')}
                        name={'alpha2_code'}
                        rules={[
                            {
                                required: true,
                                len:2
                            },

                        ]}
                    >

                    </FormInput>
                </div>
                <div>
                    <FormInput
                        label={t('Alpha3 code')}
                        name={'alpha3_code'}
                        rules={[
                            {
                                required: true,
                                len:3
                            },
                        ]}

                    >
                    </FormInput>
                </div>




                <Space>
                    <Button className={'button_add'} type={'primary'} htmlType="submit">{t('Save')}</Button>

                </Space>
            </Form>}
        </div>

    )
}

export default Country;

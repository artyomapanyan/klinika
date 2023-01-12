import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Form, Space} from "antd";
import React from "react";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";

const resource = 'Region';

function Region() {

    const params = useParams();
    const navigate = useNavigate();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState


    const onFinish = (values) => {
        setLoading(true)
        setData((prevState)=>({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token).then(response => {
                if(response?.id){
                    navigate(resourceLinks[resource])
                }
            }).finally(() => {
                setLoading(false)
            })
        } else {
            createResource(resource, values, token).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks[resource])
                }

            }).finally(() => {
                setLoading(false)
            })
        }

    }

    const textChange = () => {

    }
    return(
        <div className={'add_edit_content'}>
            {data?.name ? <h3 onClick={textChange}>{t(`Editing Area - ${data?.name}`)}</h3> : <h3>{t(`Add new Area`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
            >
                <FormInput label={t('name')} name={'name'} initialValue={data?.name} rules={[{required: true}]} />
                <FormInput label={t('Country')} name={'country_id'} inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={data?.country?.id}
                           initialData={data?.country?[data.country]:[]}
                           resource={'Country'}/>

                <Space>
                    <Button size={'large'} type={'primary'} htmlType="submit">{t('Save')}</Button>
                    <Button size={'large'} onClick={()=>(navigate(resourceLinks[resource]))} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                </Space>
            </Form>}
        </div>
    )
}
export default Region;

import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import Preloader from "../../Preloader";
import {Button, Form, Space} from "antd";
import React, {useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import CancelComponent from "../../Fragments/CancelComponent";

const resource = 'Region';

function Region() {
    let dispatch = useDispatch()
    let menuState = useSelector((state) => state.dashboardMenuState);
    const formRef = useRef();
    const params = useParams();
    const navigate = useNavigate();
    let token = useSelector((state) => state.auth.token);

    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)
    const [changeValuesState, setChangeValuesState] = useState({})


    const onFinish = (values) => {
        setSaveLoading(true)
        setData((prevState)=>({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token).then(response => {
                if(response?.id){
                    navigate(-1)
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        } else {
            createResource(resource, values, token).then((response) => {
                if (response?.id) {
                    navigate(-1)
                }

            }).finally(() => {
                setSaveLoading(false)
            })
        }

    }
    const handleValuesChange = (changed)=>{
        setChangeValuesState(changed)

        if(Object.keys(changed).length > 0) {
            dispatch({
                type: 'DASHBOARD_STATE',
                payload: true
            })
        }

    }

    console.log(menuState, changeValuesState)



    return(
        <div>
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing Area - ${data?.name}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Area`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
                ref={formRef}
                layout="vertical"
                className={'add_create_form'}
            >
                <div className={'add_edit_content'}>
                    <FormInput label={t('name')} name={'name'} initialValue={data?.name} rules={[{required: true}]} />
                    <FormInput label={t('Country')} name={'country_id'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.country?.id}
                               initialData={data?.country?[data.country]:[]}
                               resource={'Country'}/>
                </div>


                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t('Save')}</Button>
                    <CancelComponent changeValuesState={changeValuesState} resource={resource}/>
                </Space>
            </Form>}
        </div>
    )
}
export default Region;

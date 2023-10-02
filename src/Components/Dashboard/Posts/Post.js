
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import Preloader from "../../Preloader";
import {Button, Form, Space} from "antd";
import React, {useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";
import DraftEditor from "../../Fragments/DraftEditor";
import CancelComponent from "../../Fragments/CancelComponent";

const resource = 'Post';

function Post() {
    let dispatch = useDispatch()
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)
    const [changeValuesState, setChangeValuesState] = useState({})


    const onFinish = (values) => {
        setSaveLoading(true)
        setData((prevState)=>({
            ...prevState,
            ...values
        }))

        values?.content ? values.content = values?.content : values.content = ''

        if (params.id) {
            updateResource(resource, params.id, values, token).then(response => {
                if(response?.id){
                    navigate(-1)
                }
            }).finally(() => {
                dispatch({
                    type: 'DASHBOARD_STATE',
                    payload: false
                })
                setSaveLoading(false)
            })
        } else {
            createResource(resource, values, token).then((response) => {
                if (response?.id) {
                    navigate(-1)
                }

            }).finally(() => {
                dispatch({
                    type: 'DASHBOARD_STATE',
                    payload: false
                })
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

    return(
        <div>
            {data?.title ? <h3 className={'create_apdate_btns'}>{t(`Editing post`)} - {data?.title}</h3> : <h3  className={'create_apdate_btns'}>{t(`Add new post`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
                layout="vertical"
                ref={formRef}
                className={'add_create_form'}
            >
                <div className={'add_edit_content'}>
                    <FormInput label={t('Name')} name={'title'} initialValue={data?.title} rules={[{required: true}]}/>
                    <FormInput label={t('Type')} name={'type'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.type}
                               initialData={Resources.PostTypes}
                    />
                    <FormInput label={t('Category')} name={'category_id'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.category?.id}
                               initialData={data.category?[data.category]:[]}
                               resource={'Taxonomy'}
                               resourceParams={{type:Resources.TaxonomyTypes.POST_CATEGORY}}
                    />

                    <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.status}
                               initialData={Resources.Status}
                    />
                    <Form.Item name={'content'} label={t('Content')}>
                        <DraftEditor initialValue={data?.content} formRef={formRef} name={'content'} />
                    </Form.Item>
                    <FormInput label={t('Excerpt')} name={'excerpt'} inputType={'textArea'} initialValue={data?.excerpt}/>
                    <FormInput label={t('Notes')} name={'notes'} inputType={'textArea'} initialValue={data?.notes}/>

                    <Space>
                        <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                        <CancelComponent changeValuesState={changeValuesState} resource={resource}/>
                    </Space>
                </div>

            </Form>}
        </div>
    )
}
export default Post;

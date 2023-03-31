
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Form, Popconfirm, Space} from "antd";
import React, {useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";
import DraftEditor from "../../Fragments/DraftEditor";
import {QuestionCircleOutlined} from "@ant-design/icons";

const resource = 'Post';

function Post() {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)


    const onFinish = (values) => {
        setSaveLoading(true)
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
                setSaveLoading(false)
            })
        } else {
            createResource(resource, values, token).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks[resource])
                }

            }).finally(() => {
                setSaveLoading(false)
            })
        }
    }

    return(
        <div>
            {data?.title ? <h3 className={'create_apdate_btns'}>{t(`Editing Lab Test - ${data?.title}`)}</h3> : <h3  className={'create_apdate_btns'}>{t(`Add new Lab Test`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
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
                        <Popconfirm
                            title={t("Your hours will not be protected")}
                            onConfirm={() => navigate(resourceLinks[resource]) }
                            okText={t("Yes")}
                            cancelText={t("No")}
                            icon={<QuestionCircleOutlined style={{color: 'red'}}/>}>
                            <Button size={'large'} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                        </Popconfirm>
                    </Space>
                </div>

            </Form>}
        </div>
    )
}
export default Post;

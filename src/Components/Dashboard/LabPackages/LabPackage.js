import {t} from "i18next";
import Preloader from "../../Preloader";
import {Button, Form, Popconfirm, Space} from "antd";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import FormInput from "../../Fragments/FormInput";
import React, {useRef, useState} from "react";
import FileManager from "../../Fragments/FileManager";
import Resources from "../../../store/Resources";
import {InboxOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import DraftEditor from "../../Fragments/DraftEditor";

const resource = 'LabPackage';

function LabPackage() {
    let dispatch = useDispatch()
    const params = useParams();
    const formRef = useRef();
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
            updateResource(resource, params.id, values, token,true).then(response => {
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
            createResource(resource, values, token,true).then((response) => {
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

    let res = "Taxonomy"
    return (
        <div>
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing Lab Package - ${data?.name}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Lab Package`)}</h3>}

            {loading ? <Preloader/> : <Form

                name="edit"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
                layout="vertical"
                ref={formRef}
                className={'add_create_form'}
            >
                <div  className={"add_edit_content"}>
                    <FormInput label={t('name')} name={'name'} initialValue={data?.name} rules={[{required: true}]}/>
                    <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.status}
                               initialData={Resources.Status}
                    />
                    <Form.Item name={'description'} label={t('Description')}>
                        <DraftEditor initialValue={data?.description} formRef={formRef} name={'description'} />
                    </Form.Item>

                    <FormInput inputProps={{mode:'multiple'}} label={t('Category')} name={'categories'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.categories?.map(e=>e.id)??[]}
                               initialData={data?.categories??[]}
                               resource={'Taxonomy'}
                               resourceParams={{type:Resources.TaxonomyTypes.LAB_PACKAGE_CATEGORY}}
                    />

                    <FormInput inputProps={{mode:'multiple'}} label={t('Lab tests')} name={'lab_tests'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.lab_tests?.map(e=>e.id)}
                               initialData={data?.lab_tests??[]}
                               resource={'Taxonomy'}
                               resourceParams={{type:Resources.TaxonomyTypes.LAB_TEST_CATEGORY}}
                    />

                    <FileManager text1={'Click or drag file to this area to upload'}
                                 text2={'Download file'}
                                 name={'cover'}
                                 uploadIcon={<InboxOutlined/>}
                                 initialFileList={[data.cover]} limit={1} formRef={formRef} type={'drag'}/>
                </div>
                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t('Save')}</Button>
                    {
                        Object.keys(changeValuesState).length > 0 ? <Popconfirm
                            title={t("your changes will not be saved")}
                            onConfirm={() => {
                                navigate(-1)
                                dispatch({
                                    type: 'DASHBOARD_STATE',
                                    payload: true
                                })
                            }}
                            okText={t("Yes")}
                            cancelText={t("No")}
                            icon={<QuestionCircleOutlined style={{color: 'red'}}/>}>
                            <Button size={'large'} type={'secondary'} >{t('Cancel')}</Button>
                        </Popconfirm> : <Button onClick={() => navigate(-1)} size={'large'} type={'secondary'} >{t('Cancel')}</Button>
                    }

                </Space>
            </Form>}
        </div>

    )
}

export default LabPackage;

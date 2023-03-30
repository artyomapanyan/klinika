import React, {useMemo, useRef, useState} from "react";
import {t} from "i18next";
import Preloader from "../../../Preloader";
import {Button, Form, Popconfirm, Space, Tree} from "antd";
import FormInput from "../../../Fragments/FormInput";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../../Functions/api_calls";
import resourceLinks from "../../../ResourceLinks";
import {QuestionCircleOutlined} from "@ant-design/icons";

const resource = 'Role';
function Role() {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const [checkKeysState, setCheckKeysState] = useState([]);
    const handleFilterResponse = (data)=>{
        setCheckKeysState(data.permissions.map(e=>e.id))
        return data
    }
    const {loadingState, dataState,addDataState} = useGetResourceSingle(resource, params.id,{
        Permission: {},
    },handleFilterResponse)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const {addData} = addDataState


    const onFinish = (values) => {
        values.permissions = checkKeysState.filter(el=>Number.isInteger(el))
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

    let treeData = useMemo(()=>Object.entries(addData?.Permission??{}).map((el) => {
        return {
            title:el[0],
            key: el[0],
            children: el[1].map((el) => {
                return {
                    title: `${el.entry} ${el.ability}`,
                    key: el.id
                }
            })
        }
    }),[addData])

    const onCheck = (checkedKeys) => {
        setCheckKeysState(checkedKeys)
    };

    return(
        <div>
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing Role - ${data?.name}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Role`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
                className={'add_create_form'}
            >
                <div className={'add_edit_content'}>
                    <FormInput label={t('name')} name={'name'} initialValue={data?.name}/>
                    <Form.Item name={'permissions'}
                               valuePropName={'selectedKeys'}>
                        <Tree
                            checkable
                            checkedKeys={checkKeysState}
                            onCheck={onCheck}
                            treeData={treeData}
                        />
                    </Form.Item>

                    <Space>
                        <Button size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
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
export default Role;

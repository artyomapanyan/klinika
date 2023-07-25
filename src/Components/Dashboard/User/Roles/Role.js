import React, {useMemo, useRef, useState} from "react";
import {t} from "i18next";
import Preloader from "../../../Preloader";
import {Button, Form, Space, Tree} from "antd";
import FormInput from "../../../Fragments/FormInput";
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../../Functions/api_calls";
import CancelComponent from "../../../Fragments/CancelComponent";

const resource = 'Role';
function Role() {
    let dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const [checkKeysState, setCheckKeysState] = useState([]);
    const [changeValuesState, setChangeValuesState] = useState({})
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
                    navigate(-1)
                }
            }).finally(() => {
                dispatch({
                    type: 'DASHBOARD_STATE',
                    payload: false
                })
                setLoading(false)
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
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing Role - ${data?.name}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Role`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
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
                        <CancelComponent changeValuesState={changeValuesState} resource={resource}/>
                    </Space>
                </div>

            </Form>}
        </div>
    )
}
export default Role;

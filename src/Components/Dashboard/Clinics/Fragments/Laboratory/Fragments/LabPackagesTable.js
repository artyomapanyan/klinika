import React, {useEffect, useRef, useState} from "react";
import {t} from "i18next";
import {Button, Form, Space, Table} from "antd";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {postResource, updateResource} from "../../../../../Functions/api_calls";
import FormInput from "../../../../../Fragments/FormInput";
import {DeleteOutlined} from "@ant-design/icons";
import resourceLinks from "../../../../../ResourceLinks";


const resource = "Clinic";
const service = 'laboratory_clinic_visit'
function LabPackagesTable() {
    const params = useParams();
    let token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const LabTestRef = useRef();
    const [loading, setLoading] = useState(false)

    const [testData, setTestData] = useState([]);
    const [labPackages, setLabPackages] = useState([]);



    useEffect(()=>{
        Promise.all([
            postResource(resource,'LabPackage',token,params.id,{service}),
            postResource('LabPackage','list',token,null,{per_page:5000}),

        ]).then(responses => {
            const testDataKeys = responses[0].map((el) => {
                return el.lab_package_id
            })

            LabTestRef.current = responses[1].items;

            setTimeout(()=>setLabPackages(LabTestRef.current.filter(item => !testDataKeys.includes(item.id))),50)
            setLabPackages(LabTestRef.current)
            setTestData(responses[0])
        })
    },[])



    const onFinish = (values) => {
        values = Object.values(values)
        let data = {
            lab_packages:values
        }
        setLoading(true)

        if (params.id) {
            updateResource('ClinicLabPackage', params.id, data, token, ).then(response => {

            }).finally(() => {
                setLoading(false)
            })
        }
    }



    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render:(e, record, key)=> {
                return <FormInput resourceSelectStyle={{width: '100%'}} label={t('Test')} name={[key,'lab_package_id']} inputType={'resourceSelect'}
                                  resource={'LabPackage'} initialValue={record?.lab_package_id} resourceData={labPackages}/>
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render:(e, record, key)=> {
                return <FormInput inputNumberStyle={{width:'100%'}} label={t('Price')} name={[key,'price']} inputType={'number'} initialValue={e}/>
            }
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            render:(e,v,key)=> {
                return <Button onClick={()=>onDelete(key)}><DeleteOutlined /></Button>
            }
        },

    ];

    const addNewTest = () => {
        setTestData([
            ...testData,
            {
                lab_package_id: null,
                price: null,
            }
        ])
    }


    const formOnChange = (changedValues, allValues) => {
        let testDataKeys = Object.values(allValues).map((el) => {
            return el?.lab_package_id
        })
        setLabPackages(LabTestRef.current.filter(item => !testDataKeys.includes(item.id)))
    }

    const onDelete = (key) => {
        setTestData(
            testData.filter((el, keys)=> {
                return keys !== key
            })
        )
    }

    return(
        <div  className={'add_edit_content'}>
            <h1 className={'h1'}>{t(`Packages`)}</h1>


            <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                onValuesChange={formOnChange}
            >

                <Table loading={loading} dataSource={testData} columns={columns} footer={false} pagination={false} rowKey={(e,v)=>v} />
                <Button type={'primary'} size={'large'} style={{margin:20}} onClick={addNewTest}>+</Button>
                <div>
                    <Space className={'lab_save'}>
                        <Button size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                        <Button size={'large'} onClick={()=>(navigate(resourceLinks[resource]))} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                    </Space>
                </div>
            </Form>

        </div>
    )
}
export default LabPackagesTable;
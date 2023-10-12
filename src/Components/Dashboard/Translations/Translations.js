import React, {useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Input, Modal, Table} from "antd";
import {createResource} from "../../Functions/api_calls";
import {SearchOutlined} from "@ant-design/icons";
import Preloader from "../../Preloader";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";


function Translations(){
    let token = useSelector((state) => state.auth.token);
    const translations = useSelector(state=>state.app.translations)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);



    const filteredTranslations = useMemo(()=>{
       let transArray = []
       Object.keys(translations).forEach(key=>{
           transArray.push({
               key:key,
               value:translations[key]
           })
       })
       return transArray
    },[translations])


   const handleSaveTranslation = (record) =>{
       setLoading(true)
        let data = {
            translations:{
            ...translations,
            [record.key]:record.value
            }
        }
        createResource('Translation',data,token).then(data=>{
            dispatch({
                type:'UPDATE_TRANSLATIONS',
                payload:data
            })
            setLoading(false)
        })
   }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };



    const onFinish = (values) => {
        handleSaveTranslation(values)
        setIsModalOpen(false)
    }






    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm) => {
        confirm();

    };
    const handleReset = (clearFilters, confirm) => {
        clearFilters();
        confirm(clearFilters)

    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 10,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={t('Search')}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}

                />
                <div style={{marginTop: 10}}>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,

                        }}
                    >
                        {t('Search')}
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters, confirm)}
                        size="small"
                        style={{
                            width: 90,
                            margin: '0 10px'
                        }}
                    >
                        {t('Reset')}
                    </Button>

                </div>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },

    });
    return(
        <div style={{marginTop: -50}}>
            <div style={{marginBottom: 20, marginLeft: 20, fontSize: 20, fontWeight: 700}}>
                {t('Translations')}
                <Button style={{margin: '0 10px'}} onClick={showModal} type={'primary'} >{t('Add')}</Button>
            </div>

            <Modal key={'modal_translation'+ Math.random().toString()} title="Add translation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
                <Form
                    name="basic"
                    onFinish={onFinish}
                >

                       <FormInput label={t('Key')} name={'key'} />
                        <FormInput label={t('Value')} name={'value'}/>

                    <Button htmlType={'submit'} type={'primary'} style={{margin: '0 8px'}}>Ok</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </Form>
            </Modal>
            {
                loading ? <Preloader/> : <Table
                    columns={[
                        {
                            title:t('Key'),
                            dataIndex:'key',
                            key:'key',
                             ...getColumnSearchProps('key'),
                        },
                        {
                            title:t('Value'),
                            dataIndex:'value',
                            key:'value',
                            shouldCellUpdate:(record, prevRecord)=>record.value!==prevRecord.value,
                            render:(i,record)=><Input defaultValue={record.value} onChange={(value)=>record.value=value.target.value}/>
                        },
                        {
                            title:t('Submit'),
                            dataIndex:'submit',
                            key:'submit',
                            render:(i,record)=><Button onClick={()=>handleSaveTranslation(record)}>{t('Save')}</Button>
                        },
                    ]}
                    dataSource={filteredTranslations}/>
            }


        </div>
    )
}

export default Translations

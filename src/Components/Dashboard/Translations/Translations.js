import React, {useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Input, Table} from "antd";
import {createResource} from "../../Functions/api_calls";
import {SearchOutlined} from "@ant-design/icons";


function Translations(){
    let token = useSelector((state) => state.auth.token);
    const translations = useSelector(state=>state.app.translations)
    const dispatch = useDispatch();


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
        })
   }










    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm) => {
        confirm();

    };
    const handleReset = (clearFilters) => {
        clearFilters();

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
                    placeholder={`Search ${dataIndex}`}
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
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                            margin: '0 10px'
                        }}
                    >
                        Reset
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
        <div>
            <Table
                columns={[
                    {
                        title:'Key',
                        dataIndex:'key',
                        key:'key',
                        ...getColumnSearchProps('key'),
                    },
                    {
                        title:'Value',
                        dataIndex:'value',
                        key:'value',
                        shouldCellUpdate:(record, prevRecord)=>record.value!==prevRecord.value,
                        render:(i,record)=><Input defaultValue={record.value} onChange={(value)=>record.value=value.target.value}/>
                    },
                    {
                        title:'Submit',
                        dataIndex:'submit',
                        key:'submit',
                        render:(i,record)=><Button onClick={()=>handleSaveTranslation(record)}>Save</Button>
                    },
                ]}
                dataSource={filteredTranslations}/>

        </div>
    )
}

export default Translations

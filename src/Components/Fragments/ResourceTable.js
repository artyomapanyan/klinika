import React, {useEffect, useMemo, useState} from 'react'
import {Content} from "antd/es/layout/layout";
import {Button, Col, Form, Input, message, Modal, Popconfirm, Row, Space, Switch, Table, Tooltip, Upload} from "antd";
import {deleteResource, useGetResourceIndex} from "../Functions/api_calls";
import {
    CarryOutOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    PlusOutlined,
    QuestionCircleOutlined, UploadOutlined
} from "@ant-design/icons";
import {useNavigate} from "react-router";
import ResourceLinks from "../ResourceLinks";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {clearObject, paramsToObject} from "../../functions";
import axios from "axios";
import api from "../../Api";
import PermCheck from "./PermCheck";

import new_table_delete_icon from "../../dist/icons/new_table_delete_icon.png";
import dayjs from "dayjs";
import arrow_prev from "../../dist/icons/arrow-prev.svg";
import arrow_next from "../../dist/icons/arrow-next.svg";
import ResourceTableHeader from "./ResourceTableHeader";
import SwitchStatus from "./SwitchStatus";
import {t} from "i18next";
import printIcon from "../../dist/icons/printIcon.svg";

let resourceInvoice = 'Invoice'

function ResourceTable ({
                            resource, tableColumns,
                            title, tableParams = {},
                            resourceLink = null,
                            hideActions = false,
                            exportButton = true,
                            exportDatabase = false,
                            addButtonChange = true,
                            except = {},
                            handleTableBelowData,
                            getAll = false,
                            noHeader = false,
                            eyeShow = false,
                            customActions,
                            initialParams = {},
                            showHeader = true,
                            editBtnStyle = {},
                            tableSFilters,
                            customTableButton,
                            customHeader=null,
                            resourceTablemarginTop=false,
                            noData= false,
                            addBtn = true,
                            tableClassname='',
                            containermargin=false,
                            andStatus=false,
                            newDelete=false,
                            invoiceSwitches=false,
    pdfPrint=false,
    tableSmall=false,
    paginationResourceTable = true,
    editStyle=false,
    updateTable = 0
                        }) {

    let [searchParams, setSearchParams] = useSearchParams();
    const [params, setParams] = useState({...paramsToObject(searchParams.entries()),
        ...tableParams,
        ...initialParams,
        ...(getAll?{per_page:9999}:{})
    })
    let token = useSelector((state) => state?.auth?.token);
    let lngs = useSelector((state) => state?.app?.current_locale);

    const {t} = useTranslation()
    let navigate = useNavigate();

    const [pdfState, setPdfState] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [importFile, setImportFile] = useState({});
    const [importLoading, setImportLoading] = useState(false);


    const {loadingState, dataState} = useGetResourceIndex(resource, params,false,false,false,getAll)
    const handleTableChange = (pagination, filters, sorter) => {
        let data = {
            ...params,
            ...filters,
            ...tableParams,
            order_by: sorter.order?sorter?.column?.translatable ? `${sorter.columnKey}->${lngs}` : sorter.columnKey:null,
            order: sorter.order ? sorter.order === 'ascend' ? 'asc' : 'desc' : null,
            page: pagination.current,
            per_page: pagination.pageSize
        }

        clearObject(data)
        setSearchParams(data)
        setParams(data)

    }

    useEffect(()=>{
        if(typeof updateTable === 'object'){
            setParams({...params,...updateTable})
        }else{
            setParams({...params})
        }

    },[updateTable])



    useEffect(()=>{
        if(tableSFilters && Object.keys(tableSFilters).length){
            setParams((prevState)=>({
                ...prevState,
                ...(tableSFilters??{})
            }))
            clearObject(params)
            setSearchParams({
                ...params,
                ...(tableSFilters??{})
            })
            setParams({
                ...params,
                ...(tableSFilters??{})
            })
        }

    },[tableSFilters])
    const {setLoading, loading} = loadingState;
    const {setData, data} = dataState


    const onResourceEdit = (record) => {

        if(customActions?.edit){
            return customActions.edit(record)
        }
        navigate(ResourceLinks[resourceLink??resource] + record.id)

    }
    const onResourceShow = (record) => {

        if(customActions?.show){
            return customActions.show(record)
        }
        navigate(ResourceLinks[resourceLink??resource] + record.id+'/show')

    }
    const onResourceDelete = (record) => {

        setLoading(true)
        deleteResource(resource, record.id, token).then(resp => {
            setData((prevState)=>({
                ...prevState, items: prevState?.items?.slice(0)?.filter(e => e.id !== resp.id)
            }))
            setLoading(false)
        })
    }


    useEffect(()=>{
        if(getAll){
            getAll(data.items)
        }


    },[data])

    const handleExportPDF =(record)=>{
        setPdfState(true)
        axios.request({
            url: `${api[resourceInvoice].exportPdf.url}/${record.id}/export-pdf`,
            method: api[resourceInvoice].exportPdf.method,
            headers: {
                'Authorization': token,
            },
            responseType: 'blob',

        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', resourceInvoice+'.pdf');
            document.body.appendChild(link);
            link.click();
            setPdfState(false);
        });
    }



    const columns = useMemo(() => {
        let filterKeys = Object.keys(params);
        return [...tableColumns?.map(e => {
            if (params.order_by?.includes(e.key)) {
                e = {
                    ...e, defaultSortOrder: params.order === 'asc' ? 'ascend' : 'descend'
                }
            }
            if(filterKeys.includes(e.key)){
                e = {
                    ...e,
                    defaultFilteredValue:params[e.key]
                }
            }
            return e
        }),

            ...(hideActions?[]:[{
                dataIndex: 'id', title: t('Actions'), key: 'id', render: (e,record) => <Space>

                    {
                        pdfPrint ? <Button disabled={pdfState} style={{border: 'none', backgroundColor: '#f6f5f5'}} onClick={()=>handleExportPDF(record)}>
                            <img alt={'icons'} src={printIcon}/>
                        </Button> : <div></div>
                    }


                    {!except.edit ? <Tooltip title={editStyle ? 'Schedule an Appointment' : "Update"}>
                        {
                            editStyle ?
                                <Button
                                    className={'edit-button'}
                                    type={editBtnStyle ? editBtnStyle.type : {}}
                                    onClick={() => onResourceEdit(record)}
                                    size={editBtnStyle?.size ? editBtnStyle?.size : 'small'}
                                    style={{border: 'none'}}>
                                    <CarryOutOutlined style={{color: '#c98a1e'}}/>
                                </Button> : <Button
                                className={'edit-button'}
                                type={editBtnStyle ? editBtnStyle.type : {}}
                                onClick={() => onResourceEdit(record)}
                                size={editBtnStyle?.size ? editBtnStyle?.size : 'small'}
                                style={editBtnStyle?.btnStyle ? editBtnStyle.btnStyle : {}}>
                                <EditOutlined style={editBtnStyle?.iconStyle ? editBtnStyle?.iconStyle : {}}/>
                            </Button>
                        }


                    </Tooltip> :  <div></div>}
                    {!except.delete&&<Tooltip title="Delete">
                        <Popconfirm
                            title={t("Are you sure to delete this entry?")}
                            onConfirm={() => onResourceDelete(record)}
                            okText={t("Yes")}
                            cancelText={t("No")}
                            icon={<QuestionCircleOutlined style={{color: 'red'}}/>}>
                            {
                                newDelete ? <Button className={'delete-button'} size={'small'}><DeleteOutlined/></Button> :
                                    <div className={'new_delete_button'} ><img src={new_table_delete_icon} alt={'new_table_delete_icon'}/></div>
                            }

                        </Popconfirm>
                    </Tooltip>}
                    {
                        eyeShow ? <Tooltip title="Show">
                            <Button style={{border:'none'}} onClick={() => onResourceShow(record)} ><EyeOutlined style={{color: '#c98a1e'}} /></Button>
                        </Tooltip> : <div></div>
                    }

                </Space>
            }]),

            ...(andStatus ? [{
                dataIndex: 'status',
                title: 'Status',
                key: 'status',
                shouldCellUpdate:(record,prevRecord)=>record.status!==prevRecord.status,
                render: (e,record) =><SwitchStatus record={record} resource={resource} name={'status'}/>

            }] : [])
        ]


    }, [tableColumns, params])
    const onAddNew = () => {
        navigate(ResourceLinks[resourceLink??resource] + 'new')
    }

    const handleExportExcel =()=>{
        axios.request({
            url: api[resource].exportExcel.url,
            method: api[resource].exportExcel.method,
            headers: {
                'Authorization': token,
            },
            responseType: 'blob',

        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', resource+'.xlsx');
            document.body.appendChild(link);
            link.click();
        });
    }

    const importChange = (e) => {

        setImportFile(e.target.files[0])

    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setImportLoading(true)
        axios.request({
            url: api[resource].importExcel.url,
            method: api[resource].importExcel.method,
            data: {file: importFile},
            headers: {
                'Authorization': token,
                'Content-Type': 'multipart/form-data'
            },


        }).then((response) => {

        }).finally(() => {
            setIsModalOpen(false);
            setImportLoading(false)
        })

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (<Content className={containermargin ? 'layout-conatiner1' : 'layout-conatiner'}>
        {customHeader?<Row>
            <Col lg={24}>{customHeader({
                setParams,
                params,
                data
            })}</Col>
        </Row>:null}
        {!noHeader&&<Row className={'resource-header'}>
            <Col lg={12} style={{display: 'flex', flexDirection: 'row', }}>
                <div style={{display:'flex', gap: 4}}>
                    <div className={'recource_table_title'}>{t(title)}</div>
                    {PermCheck(`${resource}:create`) ? addBtn ? <Tooltip title="Add new entry">
                        <Button style={{marginLeft:10}} className={addButtonChange ? 'resource_table_btn' : ''} icon={<PlusOutlined/>} type={'primary'} onClick={onAddNew}>{addButtonChange ? t('Add') : ''}</Button>
                    </Tooltip>: <div></div> : <div></div>}
                    {
                        PermCheck(`${resource}:export`) ?  exportButton ? <Button className={'resource_table_btn'} onClick={handleExportExcel} type={'secondary'}>{t("Export to Excel")}</Button>
                            : null : null
                    }

                    {
                        exportDatabase ? <Button onClick={showModal} className={'resource_table_btn'} type={'secondary'}>{t("Import to Database")}</Button> : null
                    }

                    {/*{*/}
                    {/*    <div>*/}
                    {/*        <input type={'file'} onInput={(e)=>importChange(e)} id={'upload-btn-lg'} />*/}
                    {/*    </div>*/}
                    {/*}*/}
                    <Modal  title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width={400}>
                        <div>
                            <div style={{marginTop: 30}}>
                                <label className={'resource_table_import'}>
                                    <input style={{display: 'none'}} type={'file'} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onInput={(e)=>importChange(e)} id={'upload-btn-lg'} />
                                    <span>{<UploadOutlined />}</span><span >Import file</span>
                                </label>
                                <div style={{marginTop: 15}}>
                                    {importFile?.name}
                                </div>

                            </div>
                            <div style={{marginTop: 40, display: 'flex', gap: 8,}} >
                                <Button type={'secondary'} onClick={handleCancel} >{t('Cancel')}</Button>
                                <Button loading={importLoading} type={'primary'} onClick={handleOk} >{t('Save')}</Button>
                            </div>
                        </div>


                    </Modal>


                </div>


            </Col>

                {
                    invoiceSwitches ? <Col lg={1}><div style={{display: 'flex', gap: 15, alignItems: 'center' }}>
                        {/*<Switch onChange={(e)=>onPayed(e)}></Switch>  New*/}
                        {/*<Switch ></Switch>  Payed*/}
                        {/*<ResourceTableHeader params={params} setParams={setParams} data={data} setData={setData}/>*/}


                    </div> </Col>: <div></div>
                }


        </Row>}
        <Row style={{marginTop: resourceTablemarginTop ? 10 : 42}}>
            <Col lg={24}>
                <Form>
                    {noData && data?.items?.length===0 && !loading ? noData():
                        <Table
                        columns={columns}
                        loading={loading}
                        className={tableClassname}
                        pagination={paginationResourceTable ? {
                            ...data.pagination,
                            showTotal: (total) =>handleTableBelowData ? handleTableBelowData(dataState,loadingState,total):null,
                            pageSize: data.pagination.pageSize,
                            showSizeChanger:true,

                        } : false}
                        showHeader={showHeader}
                        onChange={handleTableChange}
                        dataSource={data?.items}
                        rowKey={e => e.id}
                        size={tableSmall ? 'small' : ''}

                    />}
                </Form>
                {customTableButton?<Button loading={loading} type={'primary'} size={'large'} style={{margin:20}} icon={customTableButton.icon} onClick={()=>customTableButton.onClick()}>{customTableButton.title}</Button>:null}
            </Col>
        </Row>
    </Content>)
}

export default ResourceTable

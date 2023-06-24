import ResourceTable from "../../../Fragments/ResourceTable";
import {t} from "i18next";
import DateParser from "../../../Fragments/DateParser";
import React, {useState} from "react";
import ColorSelect from "../../../Fragments/ColorSelect";
import Resource from "../../../../store/Resources";
import axios from "axios";
import api from "../../../../Api";
import {useSelector} from "react-redux";
import {FilePdfFilled} from "@ant-design/icons";
import {Button} from "antd";
import TableFilterElement from "../../../Fragments/TableFilterElements/TableFilterElement";
import DateFilterElement from "../../../Fragments/TableFilterElements/DateFilterElement";
import dayjs from "dayjs";

let resource = 'Invoice'
function Invoices() {
    let token = useSelector((state) => state.auth.token);
    let reduxInfo = useSelector((state) => state?.auth);
    const [pdfState, setPdfState] = useState(false);


    const handleExportPDF =(record)=>{
        setPdfState(true)
        axios.request({
            url: `${api[resource].exportPdf.url}/${record.id}/export-pdf`,
            method: api[resource].exportPdf.method,
            headers: {
                'Authorization': token,
            },
            responseType: 'blob',

        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', resource+'.pdf');
            document.body.appendChild(link);
            link.click();
            setPdfState(false);
        });
    }

    return(
        <div>
            <ResourceTable resource={resource}
                           except={{
                               delete: reduxInfo?.selected_role?.key === 'clinic-owner' ? true : false,
                           }}
                           addBtn={reduxInfo?.selected_role?.key !== 'clinic-owner' ? true : false}

                           tableColumns={[
                               {
                                   dataIndex:'id',
                                   title:t('Id'),
                                   key:'id',
                                   sorter:true,
                               },
                               {
                                   dataIndex:['due_date','iso_string'],
                                   title:t('Due date'),
                                   key:'due_date',
                                   render:(e, record) => {
                                       return dayjs(record?.due_date?.iso_string).format('DD-MM-YYYY')
                                   },
                                   sorter:true,
                                   //filterDropdown: (props)=><DateFilterElement filterProps={props}/>
                               },
                               {
                                   title:t('Invoice number'),
                                   dataIndex:'invoice_number',
                                   key:'invoice_number',
                                   render:(e, record)=> {

                                       return record?.invoice_number
                                   }
                               },
                               {
                                   dataIndex:'diagnosis_price',
                                   title:t('Price'),
                                   key:'diagnosis_price',
                                   render:(e, record) => {
                                       return <div>{record?.diagnosis_price} SAR</div>
                                   }
                               },
                               {
                                   dataIndex:'client_name',
                                   title:t('Client name'),
                                   key:'client_name',
                                   sorter:true,
                                   filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                               },
                               {
                                   dataIndex:['status'],
                                   title:t('Status'),
                                   key:'category',
                                   shouldCellUpdate:(record,prevRecord)=>record.status!==prevRecord.status,
                                   render:(e,record)=><ColorSelect items={Resource.StatusInvoices} initialValue={e.toString()} record={record} resource={resource} name={'status'}/>
                               },
                               {
                                   title: 'pdf',
                                   dataIndex: 'pdf',
                                   key: 'pdf',
                                   render: (e, record) => {
                                       return <Button disabled={pdfState} style={{border: 'none'}} onClick={()=>handleExportPDF(record)}><FilePdfFilled style={{color: 'red'}} /></Button>
                                   }
                               },

                           ]} title={t('Invoices')}/>
        </div>
    )
}
export default Invoices;
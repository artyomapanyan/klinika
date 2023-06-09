import ResourceTable from "../../../Fragments/ResourceTable";
import {t} from "i18next";
import DateParser from "../../../Fragments/DateParser";
import React from "react";
import ColorSelect from "../../../Fragments/ColorSelect";
import Resource from "../../../../store/Resources";
import axios from "axios";
import api from "../../../../Api";
import {useSelector} from "react-redux";
import {FilePdfFilled} from "@ant-design/icons";

let resource = 'Invoice'
function Invoices() {
    let token = useSelector((state) => state.auth.token);
    let reduxInfo = useSelector((state) => state?.auth);


    const handleExportPDF =(record)=>{
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
        });
    }

    return(
        <div>
            <ResourceTable resource={resource}
                           except={{
                               edit: reduxInfo?.selected_role?.key === 'clinic-owner' ? true : false,
                               delete: reduxInfo?.selected_role?.key === 'clinic-owner' ? true : false,
                           }}
                           addBtn={reduxInfo?.selected_role?.key !== 'clinic-owner' ? true : false}

                           tableColumns={[
                               {
                                   dataIndex:'id',
                                   title:t('Id'),
                                   key:'id',

                               },
                               {
                                   dataIndex:['date','iso_string'],
                                   title:t('Date'),
                                   key:'date',
                                   render:i=><DateParser date={i}/>
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
                                       return <div style={{cursor:'pointer'}} onClick={()=>handleExportPDF(record)}><FilePdfFilled style={{color: 'red'}} /></div>
                                   }
                               },

                           ]} title={t('Invoices')}/>
        </div>
    )
}
export default Invoices;
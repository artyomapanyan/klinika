import ResourceTable from "../../../Fragments/ResourceTable";
import {t} from "i18next";
import React, {useState} from "react";
import axios from "axios";
import api from "../../../../Api";
import {useSelector} from "react-redux";
import {Button, Switch} from "antd";
import TableFilterElement from "../../../Fragments/TableFilterElements/TableFilterElement";
import DateFilterElement from "../../../Fragments/TableFilterElements/DateFilterElement";
import dayjs from "dayjs";
import InvoicesGraphics from "./Fragments/InvoicesGraphics";
import calendar_dark_purpule_icon from "../../../../dist/icons/calendar_dark_purpule_icon.png";
import search_icon_darkPurpole from "../../../../dist/icons/search_icon_darkPurpole.png";
import new_sorter_icon from "../../../../dist/icons/new_sorter_icon.png";
import printIcon from "../../../../dist/icons/printIcon.svg";

import ResourceTableHeader from "../../../Fragments/ResourceTableHeader";
import PermCheck from "../../../Fragments/PermCheck";

let resource = 'Invoice'
function Invoices() {
    let token = useSelector((state) => state.auth.token);
    let reduxInfo = useSelector((state) => state?.auth);
    const [pdfState, setPdfState] = useState(false);
    const [updateTable,setUpdateTable] = useState({})



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

    const onNew = (e) => {
        setUpdateTable(prevState => ({
            ...prevState,
            status_new:e?1:0
        }))

    }
    const onPayed = (e) => {
        setUpdateTable(prevState => ({
            ...prevState,
            status_paid:e?2:0
        }))

    }

    return(
        <div style={{marginTop: -20, zIndex: 999}}>
            {/*<ClinicOwnerHeader dashboardText={true}/>*/}
            <InvoicesGraphics />
            <div className={'invoices_table'}>
                <ResourceTable resource={resource}
                               except={{
                                   delete: PermCheck(`Invoice:delete`) ? false : true,
                                   edit: PermCheck(`Invoice:update`) ? false : true
                               }}
                               updateTable={updateTable}

                               customHeader={(props)=> {

                                   return <div  style={{display: 'flex', gap: 15, alignItems: 'center', justifyContent: 'flex-end', width: '100%', marginBottom: -30, marginTop:15}}>

                                       <Switch onChange={(e)=> onNew(e)}></Switch>  New
                                       <Switch  onChange={(e)=> onPayed(e)} ></Switch>  Payed
                                       <ResourceTableHeader props={props}/>
                                   </div>
                               }}




                               andStatus={true}
                               invoiceSwitches={true}
                               // except={{
                               //     delete: reduxInfo?.selected_role?.key === 'clinic-owner' ? true : false,
                               // }}
                               //addBtn={reduxInfo?.selected_role?.key !== 'clinic-owner' ? true : false}
                               resourceTablemarginTop={true}
                               containermargin={true}
                               exportDatabase={false}
                               exportButton={false}
                               addButtonChange={false}


                               tableColumns={[
                                   {
                                       dataIndex:'id',
                                       title:t('Id'),
                                       key:'id',
                                       sorter:true,
                                       sortIcon: (sortOrder)=> {
                                           return <img alt={'new_sorter_icon'} src={new_sorter_icon}/>
                                       }
                                   },
                                   {
                                       dataIndex:['date','iso_string'],
                                       title:t('date'),
                                       key:'date',
                                       render:(e, record) => {
                                           return dayjs(record?.date?.iso_string).format('YYYY-MM-DD')
                                       },
                                       sorter:true,
                                       filterDropdown: (props)=><DateFilterElement filterProps={props}/>,
                                       filterIcon: (filtered) => (<img alt={'calendar_dark_purpule_icon'} src={calendar_dark_purpule_icon}/>),
                                       sortIcon: (sortOrder)=> {
                                           return <img alt={'new_sorter_icon'} src={new_sorter_icon}/>
                                       }

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
                                       dataIndex:'total_price',
                                       title:t('Price'),
                                       key:'total_price',
                                       render:(e, record) => {
                                           return <div>{record?.total_price} SAR</div>
                                       }
                                   },
                                   {
                                       dataIndex:'client_name',
                                       title:t('Client name'),
                                       key:'client_name',

                                       filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                                       filterIcon: (filtered) => (<img alt={'search_icon_darkPurpole'} src={search_icon_darkPurpole}/>),
                                       sorter:true,
                                       sortIcon: (sortOrder)=> {
                                           return <img alt={'new_sorter_icon'} src={new_sorter_icon}/>
                                       }
                                   },

                                   // {
                                   //     dataIndex:['status'],
                                   //     title:t('Status'),
                                   //     key:'status',
                                   //     shouldCellUpdate:(record,prevRecord)=>record.status!==prevRecord.status,
                                   //     render:(e,record)=><ColorSelect items={Resource.StatusInvoices} initialValue={e.toString()} record={record} resource={resource} name={'status'}/>
                                   // },
                                   {
                                       title: '',
                                       dataIndex: 'pdf',
                                       key: 'pdf',
                                       render: (e, record) => {
                                           return <Button disabled={pdfState} style={{border: 'none', backgroundColor: '#f6f5f5'}} onClick={()=>handleExportPDF(record)}><img alt={'icons'} src={printIcon}/></Button>
                                       }
                                   },

                               ]} title={t('Invoices')}/>
            </div>

        </div>
    )
}
export default Invoices;
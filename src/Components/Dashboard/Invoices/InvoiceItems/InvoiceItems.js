import React from 'react'

import {t} from "i18next";
import TableFilterElement from "../../../Fragments/TableFilterElements/TableFilterElement";
import ResourceTable from "../../../Fragments/ResourceTable";
import DateParser from "../../../Fragments/DateParser";
import {useSelector} from "react-redux";
import PermCheck from "../../../Fragments/PermCheck";



function InvoiceItems() {
    let reduxInfo = useSelector((state) => state?.auth?.selected_role?.key);

    return(
        <div>
            <ResourceTable resource={'InvoiceItem'}
                           except={{
                               delete: PermCheck(`InvoiceItem:delete`) ? false : true,
                               edit: PermCheck(`InvoiceItem:update`) ? false : true
                           }}
                           tableParams={reduxInfo === 'super' ? null : {
                               not_null: true,
                           }}

                           tableColumns={[
                {
                    title:'ID',
                    dataIndex:'id',
                    key:'id',
                    sorter:true,
                },
                {
                    title:t('Name'),
                    dataIndex:'name',
                    key:'name',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:'price',
                    title:t('Price'),
                    key:'price',
                },
                {
                    dataIndex:'tax_percentage',
                    title:t('Tax percentage'),
                    key:'tax_percentage',
                },

                                   reduxInfo === 'super' || reduxInfo === 'clinic-owner' ?

                {
                    dataIndex:'clinic',
                    title:t('Clinics'),
                    key:'clinic',
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                    // render:(e, record) => {
                    //     console.log(record)
                    //     return<div></div>
                    // }
                } : {},
                {
                    dataIndex:['created_at','iso_string'],
                    title:t('Create date'),
                    key:'date',
                    render:i=><DateParser date={i}/>
                },
            ]} title={t('Invoice items')}/>
        </div>
    )
}
export default InvoiceItems;

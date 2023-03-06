import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
import DateParser from "../../Fragments/DateParser";
import TableEditable from "../../Fragments/TableEditable";
import Resources from "../../../store/Resources";
import Resource from "../../../store/Resources";
import ColorSelect from "../../Fragments/ColorSelect";
const resource = 'Doctor';
function Doctors() {
    return(
        <div>
            <ResourceTable resource={resource} tableColumns={[
                {
                    title:'ID',
                    dataIndex:'id',
                    key:'id',
                    sorter:true,
                },
                {
                    title:t('First Name'),
                    dataIndex:'first',
                    key:'First Name',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    title:t('Last Name'),
                    dataIndex:'last',
                    key:'Last Name',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    title:t('Email'),
                    dataIndex:'email',
                    key:'email',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    title:t('Phone number'),
                    dataIndex:'phone_number',
                    key:'phone_number',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    title:t('PLID'),
                    dataIndex:'plid',
                    key:'plid',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:['status'],
                    title:t('Status'),
                    key:'category',
                    shouldCellUpdate:(record,prevRecord)=>record.status!==prevRecord.status,
                    render:(e,record)=>{
                        return<ColorSelect items={Resource.Status} initialValue={e.toString()} record={record} resource={resource} name={'status'}/>}
                },
                {
                    dataIndex:['created_at','iso_string'],
                    title:t('Create date'),
                    key:'date',
                    render:i=><DateParser date={i}/>
                },
            ]} title={t('Doctors')}/>
        </div>
    )
}
export default Doctors;

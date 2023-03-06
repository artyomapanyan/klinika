import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
import TableEditable from "../../Fragments/TableEditable";
import Resources from "../../../store/Resources";
import ColorSelect from "../../Fragments/ColorSelect";
import Resource from "../../../store/Resources";

const resource='Clinic';
function Clinics() {
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
                    title:t('Clinics'),
                    dataIndex:'name',
                    key:'name',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:'email',
                    title:t('Email'),
                    key:'email',
                    filterDropdown: (props)=><TableFilterElement filterProps={props} resource={'Region'}/>,
                },
                {
                    dataIndex:['status'],
                    title:t('Status'),
                    key:'category',
                    shouldCellUpdate:(record,prevRecord)=>record.status!==prevRecord.status,
                    render:(e,record)=><ColorSelect items={Resource.Status} initialValue={e.toString()} record={record} resource={resource} name={'status'}/>
                },
            ]} title={t('Clinics')}/>
        </div>
    )
}
export default Clinics;

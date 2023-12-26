import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
import DateParser from "../../Fragments/DateParser";
import Resource from "../../../store/Resources";
import ColorSelect from "../../Fragments/ColorSelect";
import PermCheck from "../../Fragments/PermCheck";
const resource = 'Doctor';
function Doctors() {
    return(
        <div >
            <ResourceTable resource={resource}
                           tableSmall={true}
                           except={{
                               delete: PermCheck(`Doctor:delete`) ? false : true,
                               edit: PermCheck(`Doctor:update`) ? false : true
                           }}
                           eyeShow={true}
                           tableColumns={[
                {
                    title:'ID',
                    dataIndex:'id',
                    key:'id',
                    sorter:true,
                    className: 'table_clinics_column',
                },
                {
                    title:t('First Name'),
                    dataIndex:'first',
                    key:'first',
                    sorter:true,
                    className: 'table_clinics_column',
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,

                },
                {
                    title:t('Last Name'),
                    dataIndex:'last',
                    key:'last',
                    className: 'table_clinics_column',
                    sorter:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    title:t('Email'),
                    dataIndex:'email',
                    key:'email',
                    translatable:true,
                    className: 'table_clinics_column',
                },
                {
                    title:t('Phone number'),
                    dataIndex:'phone_number',
                    key:'phone_number',
                    className: 'table_clinics_column',
                    translatable:true,
                },
                {
                    title:t('PLID'),
                    dataIndex:'plid',
                    key:'plid',
                    translatable:true,
                    className: 'table_clinics_column',
                },
                {
                    title:t('Clinic'),
                    dataIndex:'clinics',
                    key:'clinics',
                    translatable:true,
                    className: 'table_clinics_column',
                    render:(e, record) => {

                        return record?.clinics?.map((e, i) => {
                                    return e?.name + (i === record?.clinics.length - 1 ? '' : ', ')
                                })
                            }

                },
                {
                    dataIndex:['status'],
                    title:t('Status'),
                    key:'category',
                    className: 'table_clinics_column',
                    shouldCellUpdate:(record,prevRecord)=>record.status!==prevRecord.status,
                    render:(e,record)=>{
                        return<ColorSelect items={Resource.Status1} initialValue={e.toString()} record={record} resource={resource} name={'status'}/>}
                },
                {
                    dataIndex:['created_at','iso_string'],
                    title:t('Create date'),
                    key:'date',
                    className: 'table_clinics_column',
                    render:i=><DateParser date={i}/>
                },
            ]} title={t('Doctors')}/>
        </div>
    )
}
export default Doctors;

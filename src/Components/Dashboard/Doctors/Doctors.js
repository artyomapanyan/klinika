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
        <div>
            <ResourceTable resource={resource}
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
                },
                {
                    title:t('First Name'),
                    dataIndex:'first',
                    key:'first',
                    sorter:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,

                },
                {
                    title:t('Last Name'),
                    dataIndex:'last',
                    key:'last',
                    sorter:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    title:t('Email'),
                    dataIndex:'email',
                    key:'email',
                    translatable:true,
                },
                {
                    title:t('Phone number'),
                    dataIndex:'phone_number',
                    key:'phone_number',
                    translatable:true,
                },
                {
                    title:t('PLID'),
                    dataIndex:'plid',
                    key:'plid',
                    translatable:true,
                },
                // {
                //     title:t('Clinic'),
                //     dataIndex:'clinics',
                //     key:'clinics',
                //     translatable:true,
                //     render:(e, record) => {
                //
                //         return record?.clinics?.map((e, i) => {
                //                     return e?.name + (i === record?.clinics.length - 1 ? '' : ', ')
                //                 })
                //             }
                //
                // },
                {
                    dataIndex:['status'],
                    title:t('Status'),
                    key:'category',
                    shouldCellUpdate:(record,prevRecord)=>record.status!==prevRecord.status,
                    render:(e,record)=>{
                        return<ColorSelect items={Resource.Status1} initialValue={e.toString()} record={record} resource={resource} name={'status'}/>}
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

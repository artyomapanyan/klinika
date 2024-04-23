import ResourceTable from "../../Fragments/ResourceTable";
import PermCheck from "../../Fragments/PermCheck";
import Resources from "../../../store/Resources";
import {t} from "i18next";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import DateParser from "../../Fragments/DateParser";
import React from "react";
import ColorSelect from "../../Fragments/ColorSelect";
import Resource from "../../../store/Resources";

let resource='MedicalStaff'
function MedicalStaffs() {
    return(
        <div>
            <ResourceTable resource={'MedicalStaff'}
                           // except={{
                           //     delete: PermCheck(`Taxonomy:delete`) ? false : true,
                           //     edit: PermCheck(`Taxonomy:update`) ? false : true
                           // }}
                           // resourceLink={'Specialty'}
                           // tableParams={{type:Resources.TaxonomyTypes.SPECIALTY, has_parent: 0}}
                           tableColumns={[
                               {
                                   dataIndex:'id',
                                   title:'ID',
                                   key:'id',
                                   sorter:true,
                               },
                               {
                                   dataIndex:'first',
                                   title:t('First name'),
                                   key:'first',
                                   translatable:true,
                                   sorter: true,
                                   filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                               },
                               {
                                   dataIndex:'last',
                                   title:t('Last name'),
                                   key:'last',
                                   translatable:true,
                                   sorter: true,
                                   filterDropdown: (props)=><TableFilterElement filterProps={props}/>,

                               },
                               {
                                   dataIndex:'email',
                                   title:t('Email'),
                                   key:'email',
                               },
                               {
                                   dataIndex:'phone_number',
                                   title:t('Phone number'),
                                   key:'phone_number',
                               },
                               {
                                   dataIndex:'plid',
                                   title:t('Plid'),
                                   key:'plid',
                               },
                               {
                                   dataIndex:'clinics',
                                   title:t('clinics'),
                                   key:'clinics',
                                   render:(e, record) => {
                                       return record?.clinics?.map((el) => {
                                           return el?.name
                                       })
                                   }
                               },
                               {
                                   dataIndex:'role',
                                   title:t('Role'),
                                   key:'role',
                                   filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                               },

                               {
                                   dataIndex:['status'],
                                   title:t('Status'),
                                   key:'status',
                                   shouldCellUpdate:(record,prevRecord)=>record.status!==prevRecord.status,
                                   render:(e,record)=><ColorSelect items={Resource.Status1} initialValue={e.toString()} record={record} resource={resource} name={'status'}/>
                               },
                               {
                                   dataIndex:['created_at','iso_string'],
                                   title:t('Created date'),
                                   key:'date',
                                   render:i=><DateParser date={i}/>
                               },
                           ]} title={t('Medical staff')}/>
        </div>
    )
}
export default MedicalStaffs;
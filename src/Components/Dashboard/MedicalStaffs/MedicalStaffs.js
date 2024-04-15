import ResourceTable from "../../Fragments/ResourceTable";
import PermCheck from "../../Fragments/PermCheck";
import Resources from "../../../store/Resources";
import {t} from "i18next";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import DateParser from "../../Fragments/DateParser";
import React from "react";


function MedicalStaffs() {
    return(
        <div>
            <ResourceTable resource={'ClinicMedicalStaff'}
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
                                   dataIndex:'title',
                                   title:t('Title'),
                                   key:'title',
                                   translatable:true,
                                   sorter:true,
                                   filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                               },
                               {
                                   dataIndex:['created_at','iso_string'],
                                   title:t('Create date'),
                                   key:'date',
                                   render:i=><DateParser date={i}/>
                               },
                           ]} title={t('Specialties')}/>
        </div>
    )
}
export default MedicalStaffs;
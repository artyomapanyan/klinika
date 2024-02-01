import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import {t} from "i18next";
import Resources from "../../../store/Resources";
import DateParser from "../../Fragments/DateParser";
import PermCheck from "../../Fragments/PermCheck";

function SubSpecialties() {
    return(
        <div>
            <ResourceTable resource={'Taxonomy'}
                           except={{
                               delete: PermCheck(`Taxonomy:delete`) ? false : true,
                               edit: PermCheck(`Taxonomy:update`) ? false : true
                           }}
                           resourceLink={'SubSpecialty'}
                           tableParams={{type:Resources.TaxonomyTypes.SPECIALTY, has_parent: 1, order_by: 'id', order: 'asc'}}
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

                               },
                               {
                                   dataIndex:['created_at','iso_string'],
                                   title:t('Create date'),
                                   key:'date',
                                   render:i=><DateParser date={i}/>
                               },
                           ]} title={t('Sub Specialties')}/>
        </div>
    )
}
export default SubSpecialties;
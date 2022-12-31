import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import {t} from "i18next";
import Resources from "../../../store/Resources";
import DateParser from "../../Fragments/DateParser";

function SubSpecialties() {
    return(
        <div>
            <ResourceTable resource={'Taxonomy'}
                           resourceLink={'SubSpecialty'}
                           tableParams={{type:Resources.TaxonomyTypes.SUB_SPECIALTY}}
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
                           ]} title={t('Specialties')}/>
        </div>
    )
}
export default SubSpecialties;
import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import {t} from "i18next";
import Resources from "../../../store/Resources";
import DateParser from "../../Fragments/DateParser";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";

function LabPackagesCategories() {
    return(
        <div>
            <ResourceTable resource={'Taxonomy'}
                           resourceLink={'LabPackageCategory'}
                           tableParams={{type:Resources.TaxonomyTypes.LAB_PACKAGE_CATEGORY}}
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
                           ]} title={t('Lab Package Categories')}/>
        </div>
    )
}
export default LabPackagesCategories;

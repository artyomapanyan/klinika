import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import {t} from "i18next";
import Resources from "../../../store/Resources";
import DateParser from "../../Fragments/DateParser";

function BugReportTopics() {
    return(
        <div>
            <ResourceTable resource={'Taxonomy'}
                           resourceLink={'BugReport'}
                           tableParams={{type:Resources.TaxonomyTypes.REPORT_TOPIC}}
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
                },
                {
                    dataIndex:['created_at','iso_string'],
                    title:t('Create date'),
                     key:'date',
                    render:i=><DateParser date={i}/>
                },
            ]} title={t('Report Topics')}/>
        </div>
    )
}
export default BugReportTopics;

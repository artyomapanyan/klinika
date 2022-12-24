import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import {t} from "i18next";
import Resources from "../../../store/Resources";

function BugReportTopics() {
    return(
        <div>
            <ResourceTable resource={'Taxonomy'}
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
                    dataIndex:'date',
                    title:t('Create date'),
                    key:'date',
                },
            ]} title={t('Report Topics')}/>
        </div>
    )
}
export default BugReportTopics;

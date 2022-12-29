import ResourceTable from "../../Fragments/ResourceTable";
import {t} from "i18next";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import Resources from "../../../store/Resources";

import DateParser from "../../Fragments/DateParser";
import TableEditable from "../../Fragments/TableEditable";

function InsuranceCompanies() {

    return (
        <div>
            <ResourceTable resource={'InsuranceCompany'} tableColumns={[
                {
                    dataIndex:'id',
                    title:'ID',
                    key:'id',
                    sorter:true,
                },
                {
                    dataIndex:'name',
                    title:t('Name'),
                    key:'name',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:['status'],
                    title:t('Status'),
                    key:'category',
                    shouldCellUpdate:(record,prevRecord)=>record.status!==prevRecord.status,
                    render:(e,record)=><TableEditable
                        label={'Status'}
                        resource={'InsuranceCompany'}
                        initialData={Resources.Status}
                        updateKey={'status'}
                        value={e}
                        record={record}
                        inputType={'resourceSelect'}/>
                },
                {
                    dataIndex:['created_at','iso_string'],
                    title:t('Create date'),
                     key:'date',
                    render:i=><DateParser date={i}/>
                },
            ]} title={t('Insurance companie')}/>
        </div>
    )
}
export default InsuranceCompanies;

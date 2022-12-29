import ResourceTable from "../../../Fragments/ResourceTable";
import {t} from "i18next";
import TableFilterElement from "../../../Fragments/TableFilterElements/TableFilterElement";
import DateParser from "../../../Fragments/DateParser";


function Roles() {
    return (
        <div>
            <ResourceTable resource={'Role'} tableColumns={[
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
                    dataIndex:['created_at','iso_string'],
                    title:t('Create date'),
                    key:'created_at',
                    render:i=><DateParser date={i}/>
                },
                {
                    dataIndex:['updated_at','iso_string'],
                    title:t('Update date'),
                    key:'updated_at',
                    render:(i)=><DateParser date={i}/>
                },
            ]} title={t('Roles')}/>
        </div>
    )
}
export default Roles;

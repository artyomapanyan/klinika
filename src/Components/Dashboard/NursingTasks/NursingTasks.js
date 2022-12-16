import ResourceTable from "../../Fragments/ResourceTable";
import {t} from "i18next";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import Resources from "../../../store/Resources";
import {Select} from "antd";
import {updateResource} from "../../Functions/api_calls";
import {useSelector} from "react-redux";
import {useState} from "react";

function NursingTasks() {
    let token = useSelector((state) => state?.auth?.token);
    const [loading,setLoading] = useState({});

    const statusChange = (record) => {
        setLoading({
            [record.id]:true
        })
        updateResource('NursingTask',record.id,record,token).then((resp) => {
            setLoading({})
        })
    }
    return (
        <div>
            <ResourceTable resource={'NursingTask'} tableColumns={[
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
                    render:(e,record)=> <Select
                            defaultValue={e}
                            loading={loading[record.id]}
                            style={{width: 150, color:'red'}}
                            onChange={(e)=>statusChange({
                                ...record,
                            status:e
                            })}
                        >
                            {Resources.Status.map((el) => (
                                    <Select.Option key={el} value={el.id}>{el.name}</Select.Option>
                                ))
                            }
                        </Select>
                },
                {
                    dataIndex:'date',
                    title:t('Create date'),
                    key:'date',
                },
            ]} title={t('Nursing task')}/>
        </div>
    )
}
export default NursingTasks;

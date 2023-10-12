import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
import ColorSelect from "../../Fragments/ColorSelect";
import Resource from "../../../store/Resources";
import PermCheck from "../../Fragments/PermCheck";

const resource='Clinic';
function Clinics({resourceLink=null,}) {
    // let navigate = useNavigate();
    //
    // // const [record, setRecord] = useState({})
    // const onAddNew = () => {
    //     navigate(ResourceLinks[resourceLink??resource] + 'new')
    // }
    //
    // const onResourceEdit = (record) => {
    //     navigate(ResourceLinks[resourceLink??resource] + record.id)
    //
    // }

    return(
        // <div className={'owner_clinics_big_div'}>
        //     <div className={'own_clinic_head_div'}>
        //         <span className={'header_text'}>Clinics</span>
        //         <Button onClick={onAddNew} className={'add_btn'} size={'large'} type={'primary'}>Add new</Button>
        //     </div>
        //     <div className={'table_div'}>
        //         <ResourceTable resource={'Clinic'} except={{edit: true, delete: true}} showHeader={false} noHeader={true} tableColumns={[
        //             {
        //                 title: t('Clinic'),
        //                 dataIndex: 'name',
        //                 key: 'name',
        //                 render:(e, record)=>{
        //                     //setRecord(record)

        //                     return <div style={{cursor:"pointer"}} onClick={()=>onResourceEdit(record)} className={'avatar_div'}>
        //                         <Space >
        //                             <Avatar src={<img src={record?.cover?.url} alt="avatar" />}  hape="square" size={90} className={'owner_clinic_avatar'} style={{width: 120}} icon={<UserOutlined />} />
        //                             <div style={{display:"block"}}>
        //                                 <div className={'text_name_clinic'}>{record?.name}</div>
        //                                 <div className={'text_address'}>{record?.location?.address1}</div>
        //                             </div>
        //
        //                         </Space>
        //
        //                     </div>
        //                 }
        //             },
        //             {
        //                 title: t('HCPs'),
        //                 dataIndex: 'HCPs',
        //                 key: 'HCPs',
        //                 render:(e, record)=>{
        //
        //                     return<div className={'icon_text_div'}><img alt={'HCPs_icon'} src={HCPs_icon}/> <span className={'owner_clinic_table_texts'}>HCPs: 12</span></div>
        //                 }
        //             },
        //             {
        //                 title: t('Nurses'),
        //                 dataIndex: 'Nurses',
        //                 key: 'Nurses',
        //                 render:(e, record)=>{
        //                     return<div className={'icon_text_div'}><img alt={'Nurses_icon'} src={Nurses_icon}/> <span className={'owner_clinic_table_texts'}>Doctors: {record?.doctors_count}</span></div>
        //                 }
        //             },
        //             {
        //                 title: t('Other'),
        //                 dataIndex: 'Other',
        //                 key: 'Other',
        //                 render:(e, record)=>{
        //                     return<div className={'icon_text_div'}><img alt={'Other_icon'} src={Other_icon}/> <span className={'owner_clinic_table_texts'}>Other: 0</span></div>
        //                 }
        //             },
        //             {
        //                 title: t('Date'),
        //                 dataIndex: 'Date',
        //                 key: 'Date',
        //                 render:(e, record)=>{
        //                     return<div className={'icon_text_div'}> <img alt={'Offers_icon'} src={Offers_icon}/> <span className={'owner_clinic_table_texts'}>Offers: {record?.offers_count}</span></div>
        //                 }
        //             },
        //             {
        //                 title: t('Status'),
        //                 dataIndex: 'Status',
        //                 key: 'Status',
        //                 render:(e, record)=>{
        //                     return <ClinicStatusSelect items={Resource.Status1} initialValue={record?.status.toString()}  record={record} resource={resource} name={'status'}/>
        //                     //<div className={'icon_text_div'}><img alt={'Active_icon'} src={Active_icon}/> <span style={{color:'#4FB873'}} className={'owner_clinic_table_texts'}>Active</span></div>
        //                 }
        //             },
        //         ]} title={t('Cities')}/>
        //     </div>
        //
        // </div>
        <div>
            <ResourceTable resource={resource} eyeShow={PermCheck(`${resource}:view`) ? true : false}
                           except={{
                               edit: PermCheck(`${resource}:update`) ? false : true,
                               delete: PermCheck(`${resource}:delete`) ? false : true
                           }}

                           tableColumns={[
                {
                    title:'ID',
                    dataIndex:'id',
                    key:'id',
                    sorter:true,
                },
                {
                    title:t('Clinics'),
                    dataIndex:'name',
                    key:'name',
                    sorter:true,
                    translatable:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:'email',
                    title:t('Email'),
                    key:'email',
                    filterDropdown: (props)=><TableFilterElement filterProps={props} resource={'Region'}/>,
                },
                {
                    dataIndex:['status'],
                    title:t('Status'),
                    key:'status',
                    shouldCellUpdate:(record,prevRecord)=>record.status!==prevRecord.status,
                    render:(e,record)=><ColorSelect items={Resource.Status1} initialValue={e.toString()} record={record} resource={resource} name={'status'}/>
                },
            ]} title={t('Clinics')}/>
        </div>
    )
}
export default Clinics;

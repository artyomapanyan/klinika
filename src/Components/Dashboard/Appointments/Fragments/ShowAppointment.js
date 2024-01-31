import React, {useState} from "react";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {useGetResourceSingle} from "../../../Functions/api_calls";
import {Avatar, Button, Col, Divider, message, Row, Space, Tooltip} from "antd";
import {
    CopyOutlined,
    EditOutlined,
    FilePdfOutlined,
    LeftOutlined,
    MailOutlined,
    PhoneOutlined, UserOutlined
} from "@ant-design/icons";
import axios from "axios";
import api from "../../../../Api";
import Preloader from "../../../Preloader";
import dayjs from "dayjs";
import ResourceLinks from "../../../ResourceLinks";
import copyIcon from "../../../../dist/icons/copy.svg";
import {t} from "i18next";

const resource = 'Appointment';
const invoiceResource = 'Invoice';
function ShowAppointment() {
    const navigate = useNavigate();
    const params = useParams();
    let token = useSelector((state) => state.auth.token);
    let language = useSelector((state) => state.app.current_locale)
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [pdfState,setPdfState] = useState(false)

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        navigator.clipboard.writeText(data?.deep_link)
        messageApi.open({
            type: 'success',
            content: 'Successfully Done',
        });
    };


    const handleExportPDF =()=>{
        setPdfState(true)
        axios.request({
            url: `${api[resource].exportPdf.url}/${params.id}/export-pdf`,
            method: api[resource].exportPdf.method,
            headers: {
                'Authorization': token,
            },
            responseType: 'blob',

        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', resource+'.pdf');
            document.body.appendChild(link);
            link.click();
            setPdfState(false)
        });
    }

    const invoiceHandleExportPDF =(id)=>{
        setPdfState(true)
        axios.request({
            url: `${api[invoiceResource].exportPdf.url}/${id}/export-pdf`,
            method: api[invoiceResource].exportPdf.method,
            headers: {
                'Authorization': token,
            },
            responseType: 'blob',

        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', invoiceResource+'.pdf');
            document.body.appendChild(link);
            link.click();
            setPdfState(false)
        });
    }





    const onBack = () => {
        navigate(-1)
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        messageApi.open({
            type: 'success',
            content: 'Copied to clipboard',
        });
    }


    return(
        <div className={'app_show_big_div'}>
            <div>
                <Button style={{margin:"40px 24px", height:45, width:45}} onClick={onBack}><LeftOutlined /></Button>
            </div>
            {
                loading ? <Preloader /> : <div>
                    <div className={'add_edit_content'} id={'show_header'}>
                        <div style={{display: 'flex'}}>
                            <Avatar size={120} src={data?.logo?.url ? <img src={data?.logo?.url}  /> : <UserOutlined />}  style={{background:'gray'}}/>
                            <div style={{display:"block", marginLeft:20}}>
                                <div>id {data?.patient?.id}</div>
                                <h2 style={{fontWeight: 600}}>{data?.patient?.first}  {data?.patient?.last}</h2>
                                <div>
                                    <Space>
                                        <div className={'show_mail_btn'}><a href={`mailto:${data?.patient?.email}`}><MailOutlined style={{fontSize: 20, color:'black'}}/></a></div>
                                        <div className={'show_phone_btn'}><a href={`${data?.patient?.phone}`}><PhoneOutlined style={{color: "#ffffff", fontSize: 20}}/></a></div>
                                        <Button disabled={pdfState} type={'primary'} onClick={handleExportPDF} icon={<FilePdfOutlined />} className={'show_pdf_btn'}> {t('Appointment report')}</Button>
                                    </Space>
                                </div>
                            </div>

                        </div>

                        <div>
                            <button onClick={success} className={'show_copy_btn'}><CopyOutlined /> {t('Copy Deep Link')}</button>
                            {contextHolder}
                        </div>

                    </div>
                    <div className={'add_edit_content'} id={'app_show_tables_div'}>
                        <div className={'show_table'} style={{width: '100%'}}>
                            <table>
                                <tbody >
                                <tr>
                                    <td className={'show_td_1'}>{t('Service Type')}</td>
                                    <td className={'show_td_2'}>{data?.service_type[0]?.toUpperCase() + data?.service_type?.slice(1)?.replaceAll("_", " ") || <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                {
                                    data?.lab_packages?.length > 0 || data?.lab_tests?.length > 0 ? <tr>
                                        <td className={'show_td_1'}>{t('Lab tests')}</td>
                                        <td className={'show_td_2'}>{data?.lab_tests?.length > 0 ? data?.lab_tests?.map((el, i) => {
                                            return <span key={i}>{el?.name + (i === data?.lab_tests?.length - 1 ? '' : ', ')}</span>
                                        }) : <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                    </tr> : null
                                }
                                {
                                    data?.lab_packages?.length > 0 || data?.lab_tests?.length > 0 ? <tr>
                                        <td className={'show_td_1'}>{t('Lab packages')}</td>
                                        <td className={'show_td_2'}>{data?.lab_packages?.length > 0 ? data?.lab_packages?.map((el, i) => {
                                            return <span key={i}>{el?.name}</span>
                                        }) : <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                    </tr> : null
                                }
                                {
                                    data?.nursing_tasks?.length > 0 ? <tr>
                                        <td className={'show_td_1'}>{t('Nursing tasks')}</td>
                                        <td className={'show_td_2'}>{data?.nursing_tasks?.length > 0 ? data?.nursing_tasks?.map((el, i) => {
                                            return <span key={i}>{el?.name + (i === data?.nursing_tasks?.length - 1 ? '' : ', ')}</span>
                                        }) : <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                    </tr> : null
                                }
                                {
                                    data.service_type === 'home_visit' || data.service_type ==='physical_therapy_home_visit' ||
                                    data.service_type === 'laboratory_home_visit' || data.service_type ==='nursing'?
                                    <tr>
                                        <td className={'show_td_1'}>{t('Visit Address')}</td>
                                        <td className={'show_td_2'}>
                                            {data?.address?.address1 || <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Tooltip title="Copy address">
                                                <span onClick={() =>copyText(data?.address?.address1)}><img src={copyIcon} alt={'copy'} style={{width:20, cursor: 'pointer'}}/></span>
                                            </Tooltip>
                                        
                                        </td>
                                    </tr> : null  
                                }

                                <tr>
                                    <td className={'show_td_1'}>{t('Clinic')}</td>
                                    <td className={'show_td_2'}>{data?.clinic?.name || <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>{t('Doctors')}</td>
                                    <td className={'show_td_2'}>{ data?.doctor?.first ? `${data?.doctor?.first} ${data?.doctor?.last}` : <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>{t('Insurance Company')}</td>
                                    <td className={'show_td_2'}>{data?.insurance_company || <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>{t('Booking Date')}</td>
                                    <td className={'show_td_2'}>{dayjs(data?.booked_at?.iso_string).format('YYYY-MM-DD hh:mm A') || <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>{t('Appointment’s Status')}</td>
                                    <td className={'show_td_2'}>{data?.status || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>{t('Marked as completed in')}</td>
                                    <td className={'show_td_2'}>{data?.completed_at?.iso_string || <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>{t('Offer')}</td>
                                    <td className={'show_td_2'}>{data?.offer?.title || <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={'show_table_right'} style={{width:'100%'}}>
                            <table>
                                <thead>
                                <tr>
                                    <td>{t('Invoices')}</td>
                                    <td>{t('Date')}</td>
                                    <td>{t('Total Price')}</td>
                                    <td>{t('Print')}</td>
                                </tr>

                                </thead>
                                <tbody>

                                        {
                                            data?.invoices.map((el) => {
                                                return <tr key={el?.id}>
                                                    <td onClick={()=> navigate(ResourceLinks[invoiceResource] + el.id)} className={'app_show_invoce'}>{el.invoice_number}</td>
                                                    <td>{dayjs(el?.date?.iso_string).format('YYYY-MM-DD h:mm A')}</td>
                                                    <td>{el?.total_price}</td>
                                                    <td><Button disabled={pdfState} onClick={()=>invoiceHandleExportPDF(el.id)} size={'small'} style={{background:'red'}}><FilePdfOutlined style={{color: "#ffffff"}}/></Button></td>
                                                </tr>
                                            })

                                        }


                                    {/*<td><Button size={'small'} style={{background:'red'}}><FilePdfOutlined style={{color: "#ffffff"}}/></Button></td>*/}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={'add_edit_content'}>
                        <div className={'show_table_bottom'}>
                            <table>
                                <thead>
                                    <tr>
                                        <td>{t('Purpose')}</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{data?.purpose || <span style={{fontStyle: 'italic'}}>N/A</span>}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={'show_table_bottom'}>
                            <table>
                                <thead>
                                <tr>
                                    <td>{t('Personal info')}</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{data?.personal_info || <span style={{fontStyle: 'italic'}}>N/A</span>}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={'show_table_bottom'}>
                            <table>
                                <thead>
                                <tr>
                                    <td>{t('Doctor notes')}</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{data?.appointment_doctor_notes || <span style={{fontStyle: 'italic'}}>N/A</span>}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={'show_table_bottom'}>
                            <table>
                                <thead>
                                <tr>
                                    <td>{t('Prescriptions')}</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>




                                    <td>{data?.prescriptions ? <div style={{display: 'flex', gap: 20}}>{
                                        data?.prescriptions?.map((el, i) => {
                                            return <div key={i} className={'patient_card'} style={{width: 300}}>
                                                <div className={'patient_card_header'}>
                                                    <div>
                                                        <div style={{fontSize: 16, fontWeight: 700}}>{el?.name}</div>
                                                    </div>

                                                </div>
                                                <div style={{borderBottom: '1px solid #cbc9cb', marginTop: 12, marginBottom: 12}}></div>



                                                <Row>
                                                    <Col lg={7} align={language === 'en' ? 'left' : 'right'}>
                                                        <div className={"medication_card_text1"}>{t('Frequency')}</div>
                                                        <div className={"medication_card_text2"}>{el?.frequency} times/day</div>
                                                    </Col>
                                                    <Col lg={1} align={'center'}>
                                                        <Divider type={'vertical'} style={{border:'1px solid #cfceca', height:45}} />
                                                    </Col>
                                                    <Col lg={7} align={'center'}>
                                                        <div className={"medication_card_text1"}>{t('Dose')}</div>
                                                        <div className={"medication_card_text2"}>{el?.dose} {el?.unit_type == 1 ? 'PCS' : 'GM'}</div>
                                                    </Col>
                                                    <Col lg={1} align={'center'}>
                                                        <Divider type={'vertical'} style={{border:'1px solid #cfceca', height:45}} />
                                                    </Col>

                                                    <Col lg={7} align={language === 'en' ? 'right' : 'left'}>
                                                        <div className={"medication_card_text1"}>{t('Duration')}</div>
                                                        <div className={"medication_card_text2"}>{el?.duration} days</div>
                                                    </Col>
                                                </Row>

                                                <div style={{borderBottom: '1px solid #cbc9cb', marginTop: 12, marginBottom: 12}}></div>

                                                <div>
                                                    <div className={"medication_card_text1"}>{t('Note')}</div>
                                                    <div className={"medication_card_text2"}>{el?.note ? el?.note : 'No note'}</div>
                                                </div>
                                            </div>
                                        })
                                    }</div> : <span style={{fontStyle: 'italic'}}>N/A</span>}</td>





                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={'show_table_bottom'}>
                            <table>
                                <thead>
                                <tr>
                                    <td>{t('Follow up history')}</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{data?.follow_up_history || <span style={{fontStyle: 'italic'}}>N/A</span>}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={'add_edit_content'}>
                        <div className={'show_table_bottom'}>
                            <table>
                                <thead>
                                    <tr>
                                        <td>{t('Appointment Documents (Attachments)')}</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span style={{color:"#F5A348"}}>{t('Images')}</span>  </td>
                                    </tr>
                                    <tr>
                                        <td><span style={{color:"#F5A348"}}>{t('Files')}</span> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}
export default ShowAppointment;
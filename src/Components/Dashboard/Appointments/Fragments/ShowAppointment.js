import React, {useState} from "react";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {useGetResourceSingle} from "../../../Functions/api_calls";
import {Avatar, Button, Col, Divider, message, Row, Space} from "antd";
import {
    CopyOutlined,
    EditOutlined,
    FilePdfOutlined,
    LeftOutlined,
    MailOutlined,
    PhoneOutlined
} from "@ant-design/icons";
import axios from "axios";
import api from "../../../../Api";
import Preloader from "../../../Preloader";
import dayjs from "dayjs";
import ResourceLinks from "../../../ResourceLinks";
import closeLightGray from "../../../../dist/icons/close-lightGray.svg";


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

    console.log(data)
    return(
        <div className={'app_show_big_div'}>
            <div>
                <Button style={{margin:"40px 24px", height:45, width:45}} onClick={onBack}><LeftOutlined /></Button>
            </div>
            {
                loading ? <Preloader /> : <div>
                    <div className={'add_edit_content'} id={'show_header'}>
                        <div style={{display: 'flex'}}>
                            <Avatar size={120} src={<img src={data?.logo?.url} />} style={{background:'gray'}}/>
                            <div style={{display:"block", marginLeft:20}}>
                                <div>id {data?.patient?.id}</div>
                                <h2 style={{fontWeight: 600}}>{data?.patient?.first}  {data?.patient?.last}</h2>
                                <div>
                                    <Space>
                                        <div className={'show_mail_btn'}><a href={`mailto:${data?.patient?.email}`}><MailOutlined style={{fontSize: 20, color:'black'}}/></a></div>
                                        <div className={'show_phone_btn'}><a href={`${data?.patient?.phone}`}><PhoneOutlined style={{color: "#ffffff", fontSize: 20}}/></a></div>
                                        <Button disabled={pdfState} type={'primary'} onClick={handleExportPDF} icon={<FilePdfOutlined />} className={'show_pdf_btn'}> Appointment report</Button>
                                    </Space>
                                </div>
                            </div>

                        </div>

                        <div>
                            <button onClick={success} className={'show_copy_btn'}><CopyOutlined /> Copy Deep Link</button>
                            {contextHolder}
                        </div>

                    </div>
                    <div className={'add_edit_content'} id={'app_show_tables_div'}>
                        <div className={'show_table'} style={{width: '100%'}}>
                            <table>
                                <tbody >
                                <tr>
                                    <td className={'show_td_1'}>Service Type</td>
                                    <td className={'show_td_2'}>{data?.service_type[0]?.toUpperCase() + data?.service_type?.slice(1)?.replaceAll("_", " ") || <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Clinic</td>
                                    <td className={'show_td_2'}>{data?.clinic?.name || <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Doctors</td>
                                    <td className={'show_td_2'}>{ data?.doctor?.first ? `${data?.doctor?.first} ${data?.doctor?.last}` : <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Insurance Company</td>
                                    <td className={'show_td_2'}>{data?.insurance_company || <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Booking Date</td>
                                    <td className={'show_td_2'}>{data?.booked_at?.iso_string || <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Appointment’s Status</td>
                                    <td className={'show_td_2'}>{data?.status || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Marked as completed in</td>
                                    <td className={'show_td_2'}>{data?.completed_at?.iso_string || <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                <tr>
                                    <td className={'show_td_1'}>Offer</td>
                                    <td className={'show_td_2'}>{data?.offer?.title || <span style={{fontStyle: 'italic', fontWeight:600, color: '#969698'}}>N/A</span>}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={'show_table_right'} style={{width:'100%'}}>
                            <table>
                                <thead>
                                <tr>
                                    <td>Invoices</td>
                                    <td>Date</td>
                                    <td>Total Price</td>
                                    <td>Print</td>
                                </tr>

                                </thead>
                                <tbody>

                                        {
                                            data?.invoices.map((el) => {
                                                return <tr>
                                                    <td onClick={()=> navigate(ResourceLinks[invoiceResource] + el.id)} className={'app_show_invoce'}>{el.invoice_number}</td>
                                                    <td>{dayjs(el?.date?.iso_string).format('YYYY-MM-DD hh:mm')}</td>
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
                                        <td>Purpose</td>
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
                                    <td>Personal info</td>
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
                                    <td>Doctor notes</td>
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
                                    <td>Prescriptions</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>




                                    <td>{data?.prescriptions ? <div style={{display: 'flex', gap: 20}}>{
                                        data?.prescriptions?.map((el) => {
                                            return <div className={'patient_card'} style={{width: 300}}>
                                                <div className={'patient_card_header'}>
                                                    <div>
                                                        <div style={{fontSize: 16, fontWeight: 700}}>{el?.name}</div>
                                                    </div>

                                                </div>
                                                <div style={{borderBottom: '1px solid #cbc9cb', marginTop: 12, marginBottom: 12}}></div>



                                                <Row>
                                                    <Col lg={7} align={language === 'en' ? 'left' : 'right'}>
                                                        <div className={"medication_card_text1"}>Frequency</div>
                                                        <div className={"medication_card_text2"}>{el?.frequency} times/day</div>
                                                    </Col>
                                                    <Col lg={1} align={'center'}>
                                                        <Divider type={'vertical'} style={{border:'1px solid #cfceca', height:45}} />
                                                    </Col>
                                                    <Col lg={7} align={'center'}>
                                                        <div className={"medication_card_text1"}>Dose</div>
                                                        <div className={"medication_card_text2"}>{el?.dose} pcs</div>
                                                    </Col>
                                                    <Col lg={1} align={'center'}>
                                                        <Divider type={'vertical'} style={{border:'1px solid #cfceca', height:45}} />
                                                    </Col>

                                                    <Col lg={7} align={language === 'en' ? 'right' : 'left'}>
                                                        <div className={"medication_card_text1"}>Duration</div>
                                                        <div className={"medication_card_text2"}>{el?.duration} days</div>
                                                    </Col>
                                                </Row>

                                                <div style={{borderBottom: '1px solid #cbc9cb', marginTop: 12, marginBottom: 12}}></div>

                                                <div>
                                                    <div className={"medication_card_text1"}>Note</div>
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
                                    <td>Follow up history</td>
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
                                        <td>Appointment Documents (Attachments)</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span style={{color:"#F5A348"}}>Images</span>  </td>
                                    </tr>
                                    <tr>
                                        <td><span style={{color:"#F5A348"}}>Files</span> </td>
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
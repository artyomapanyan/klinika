import React from 'react';
import {Collapse, Tag} from 'antd';
import arrowDownPurple from "../../../../dist/icons/arrowDownPurple.svg";
import arrowUpPurple from "../../../../dist/icons/arrow-up-purple.svg";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
const { Panel } = Collapse;
function PatientCollapse({data}) {
    let language = useSelector((state) => state.app.current_locale)

    const onChange = () => {

    };
    return(
        <div style={{padding:8, marginRight: 20}}>
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                onChange={onChange}
                expandIconPosition={'end'}
                expandIcon={(panelProps) =><div style={{marginTop: 5}}>{panelProps.isActive ?
                                        <div><img alt={'icons'} src={arrowUpPurple} style={{marginTop: -2}}/> <span className={'patient_collapse_icon'}>Collapse</span></div> :
                                        <div><img alt={'icons'} src={arrowDownPurple} style={{marginTop: -2}}/> <span className={'patient_collapse_icon'}>Expend</span></div>}</div>}
            >
                <Panel className={'collapse_panel'} expandtextposition='end' header="Appointment Details" key="1">
                    <div className={'patient_panel_big_div'}>
                        <div>
                            <div className={'collapse_content_head'}>Scheduled Appt</div>
                            <div className={'collapse_content_foot'}>{dayjs(data?.created_at?.iso_string).format('DD MMMM YY')}</div>
                        </div>
                        <div>
                            <div className={'collapse_content_head'}>{language === 'en' ? 'Appt Time/Date' : 'Date/Appt Time'}</div>
                            <div className={'collapse_content_foot'}>
                                <span style={{fontWeight: 700}}>{dayjs(data?.booked_at?.iso_string).format('HH:mm')} </span>  / {dayjs(data?.booked_at?.iso_string).format('DD MMMM YY')}
                            </div>
                        </div>
                        <div>
                            <div className={'collapse_content_head'}>Referring doctor</div>
                            <div className={'collapse_content_foot'}>{data?.doctor?.first} {data?.doctor?.last}</div>
                        </div>
                        <div>
                            <div className={'collapse_content_head'}>Appt Doctor</div>
                            <div className={'collapse_content_foot'}>{data?.doctor?.first} {data?.doctor?.last}</div>
                        </div>
                        <div>
                            <div className={'collapse_content_head'}>Offer</div>
                            <div className={'collapse_content_foot'}>{data?.offer?.title}</div>
                        </div>
                        <div>
                            <div className={'collapse_content_head'}>Payment</div>
                            <div className={'collapse_content_foot'}>23 323 SAR <Tag className={'ant_tag'} color="green" >Paid</Tag></div>
                        </div>
                    </div>
                </Panel>
            </Collapse>
        </div>
    )
}
export default PatientCollapse;

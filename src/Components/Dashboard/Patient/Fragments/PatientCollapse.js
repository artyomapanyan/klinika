import React from 'react';
import {Col, Collapse, Row, Tag} from 'antd';
import arrowDownPurple from "../../../../dist/icons/arrowDownPurple.svg";
import arrowUpPurple from "../../../../dist/icons/arrow-up-purple.svg";
const { Panel } = Collapse;
function PatientCollapse() {
    const onChange = (key) => {

    };
    return(
        <div style={{margin:24}}>
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                onChange={onChange}
                expandIconPosition={'end'}
                expandIcon={(panelProps) =><div>{panelProps.isActive ?
                                        <div><img alt={'icons'} src={arrowUpPurple}/> <span className={'patient_collapse_icon'}>Collapse</span></div> :
                                        <div><img alt={'icons'} src={arrowDownPurple}/> <span className={'patient_collapse_icon'}>Expend</span></div>}</div>}
            >
                <Panel className={'collapse_panel'} expandTextPosition={'end'} header="PatientCardAppointment Details" key="1">
                    <Row>
                        <Col lg={4}>
                            <div className={'collapse_content_head'}>Scheduled Appt</div>
                            <div className={'collapse_content_foot'}>24 July 2021</div>
                        </Col>
                        <Col lg={4}>
                            <div className={'collapse_content_head'}>Appt Time/Date</div>
                            <div className={'collapse_content_foot'}>10:00 PM  / 28 July 2021</div>
                        </Col>
                        <Col lg={4}>
                            <div className={'collapse_content_head'}>Referring doctor</div>
                            <div className={'collapse_content_foot'}>Robert Fox</div>
                        </Col>
                        <Col lg={4}>
                            <div className={'collapse_content_head'}>Appt Doctor</div>
                            <div className={'collapse_content_foot'}>Darrell Steward</div>
                        </Col>
                        <Col lg={4}>
                            <div className={'collapse_content_head'}>Offer</div>
                            <div className={'collapse_content_foot'}>Physiotherapy Sessions</div>
                        </Col>
                        <Col lg={4}>
                            <div className={'collapse_content_head'}>Payment</div>
                            <div className={'collapse_content_foot'}>23 323 SAR <Tag className={'ant_tag'} color="green" >Paid</Tag></div>
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
        </div>
    )
}
export default PatientCollapse;
import React from "react";
import {Col, Row} from "antd";

import InvoiceIncomesGraphic from "./Graphics/InvoiceIncomesGraphic";
import InvoiceStatusesGraphic from "./Graphics/InvoiceStatusesGraphic";

function InvoicesGraphics() {
    return(
        <div style={{margin:20}} className={'clinics_owner'}>
            <Row gutter={[16,16]}>
                <Col  lg={6} md={12} sm={24} xs={24} >
                    <div className="gutter_row">
                        {/*<ClinicManagerProgressCount data={progressData1} />*/}
                        <InvoiceIncomesGraphic />
                    </div>
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                    <div className="gutter_row">
                        <InvoiceStatusesGraphic />
                    </div>
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                    <div className="gutter_row">
                        {/*<StatusesChart data={statusesData}/>*/}
                        <InvoiceIncomesGraphic />
                    </div>
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                    <div className="gutter_row">
                        {/*<ClinicManagerProgressCount data={progressData2} />*/}
                        <InvoiceIncomesGraphic />
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default InvoicesGraphics;
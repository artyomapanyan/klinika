
import React, {useState} from "react";
import {Avatar, Button} from "antd";
import {DownOutlined} from "@ant-design/icons";
import ClinicManagerCalendarInnCollapse from "./ClinicManagerCalendarInnCollapse";

function ClicicManagerCalendarCollapse() {
    const [btnCollapsed, setBtnCollapsed] = useState(false);

    const openCollapse = () => {
        setBtnCollapsed(!btnCollapsed)
    }

    return(
        <>
            <tr className="appointmentsProgressTable__shownRow">
                <td>
                    <Button className="appointmentsBranch" onClick={openCollapse} >
                        <span>Pediatrics</span>
                        <DownOutlined/>
                    </Button>
                </td>
                <td>
                    <div className="progress progressPurple">
                        <div className="progress-bar progressPurple__inside"
                             role="progressbar"
                             style={{width: '85%'}} aria-valuenow="85" aria-valuemin="0"
                             aria-valuemax="100">
                        </div>
                        <div className="progressText">85%</div>
                    </div>
                </td>
                <td>
                    <div className="progress progressPurple">
                        <div className="progress-bar progressPurple__inside"
                             role="progressbar"
                             style={{width: '85%',}} aria-valuenow="85" aria-valuemin="0"
                             aria-valuemax="100">
                        </div>
                        <div className="progressText">85%</div>
                    </div>
                </td>
                <td>
                    <div className="progress progressPurple">
                        <div className="progress-bar progressPurple__inside"
                             role="progressbar"
                             style={{width: '15%'}} aria-valuenow="15" aria-valuemin="0"
                             aria-valuemax="100">
                        </div>
                        <div className="progressText">15%</div>
                    </div>
                </td>
                <td>
                    <div className="progress progressPurple ">
                        <div className="progressInactive"></div>
                    </div>
                </td>
                <td>
                    <div className="progress progressPurple">
                        <div className="progress-bar progressPurple__inside"
                             role="progressbar"
                             style={{width: '58%'}} aria-valuenow="58" aria-valuemin="0"
                             aria-valuemax="100">
                        </div>
                        <div className="progressText">58%</div>
                    </div>
                </td>
                <td>
                    <div className="progress progressPurple">
                        <div className="progress-bar progressPurple__inside"
                             role="progressbar"
                             style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0"
                             aria-valuemax="100">
                        </div>
                        <div className="progressText">25%</div>
                    </div>
                </td>
                <td>
                    <div className="progress progressPurple">
                        <div className="progress-bar progressPurple__inside"
                             role="progressbar"
                             style={{width: '0'}} aria-valuenow="85" aria-valuemin="0"
                             aria-valuemax="100">
                        </div>
                        <div className="progressText">0%</div>
                    </div>
                </td>
            </tr>


            {
                btnCollapsed ? <ClinicManagerCalendarInnCollapse /> : null
            }


        </>

    )
}
export default ClicicManagerCalendarCollapse;
import {Avatar, Modal} from "antd";
import React, {useState} from "react";
import CalendarInnCollapseModal from "./CalendarInnCollapseModal";

function ClinicManagerCalendarInnCollapse({docItem}) {
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <tr id="hidden_row1" className="hide">


            <td className="hiddenTableRow__col">
                <div className="hiddenTableRow__col-item">
                    <div className="circleImageHolder">
                        <Avatar size={45}  src={docItem.doctor.avatar?.url}/>
                    </div>
                    <p>{docItem?.doctor?.first} {docItem?.doctor?.last}</p>
                </div>
            </td>
            {
                Object.keys(docItem?.availability??{}).map((key) => {
                    return <td className="hiddenTableRow__col" onClick={() => setIsModalOpen(true)}>

                        <div className="progress progressGreen">
                            <div className="progress-bar progressGreen__inside"
                                 role="progressbar" style={{width: docItem.availability[key]+'%'}}
                                 aria-valuenow="85" aria-valuemin="0"
                                 aria-valuemax="100">
                            </div>
                            <div className="progressText">{docItem.availability[key]}%</div>
                        </div>
                    </td>
                })
            }
            <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} width={'400px'} footer={null}>
                <CalendarInnCollapseModal/>
            </Modal>
        </tr>
    )
}

export default ClinicManagerCalendarInnCollapse;
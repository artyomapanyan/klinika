import {useSelector} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import {postResource} from "../../../Functions/api_calls";
import Preloader from "../../../Preloader";
import {Button, Col, Form, Input, Row} from "antd";
import {t} from "i18next";
import FormInput from "../../../Fragments/FormInput";
import dark_delete_icon from "../../../../dist/icons/dark_delete_icon.png";

function LabTechnician({appointmentId, setUpdateState, updateState, bigData}) {
    let token = useSelector((state) => state.auth.token);
    const formRef = useRef();
    let lngs = useSelector(state => state?.app?.current_locale)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        postResource('Appointment', 'AppointmentServices', token, `${appointmentId}/lab_test`).then((response) => {

            setLoading(false)

        })
    }, [updateState])






    return<div style={{background:"#ffffff", margin:'0 24px', borderRadius: '0 0 12px 12px', borderTop: '1px solid #d7d6d7'}}>
        <Row gutter={[40, 0]}>
            <Col lg={16}>
                {
                    <Form ref={formRef}>
                        <div style={{padding: '40px'}}>
                            <div>
                                <span className={'patient_card_lab_tests_text'}>{t('Lab Tests')}</span>
                            </div>

                            <div className={"lab_technician_patient_card_lab_test"}>
                                <div>
                                    Bilirubin Direct Serum Test (1 Parameter)
                                </div>
                                <div className={"lab_technician_patient_card_lab_test_id"}>
                                    dsf
                                </div>

                            </div>

                        </div>

                        <Button className={'submit_resalt_btn'} type={'secondary'}>
                            {t('Submit results')}
                        </Button>


                    </Form>
                }
            </Col>
        </Row>


    </div>
}
export default LabTechnician;
import {Button, Col, Divider, Row} from "antd";
import closeLightGray from "../../../../../dist/icons/close-lightGray.svg";
import {EditOutlined} from "@ant-design/icons";
import {deleteResource} from "../../../../Functions/api_calls";
import {useSelector} from "react-redux";

function MedicationCards({el, showModal, setAddDeleteState, add_update_btns=true}) {
    let token = useSelector((state) => state?.auth?.token);
    let language = useSelector((state) => state.app.current_locale)
    const deletePrescription = () => {

        deleteResource('prescriptions', el.id, token).then(resp => {
            setAddDeleteState((prevState) => prevState-1)
        })
    }



    return(
            <Col lg={8} style={{marginTop:16}} >
                <div className={'patient_card'}>
                    <div className={'patient_card_header'}>
                        <div>
                            <div style={{fontSize: 16, fontWeight: 700}}>{el?.name}</div>
                            <div  style={{fontSize:14, fontWeight:400}}>
                                #{el?.queuePrescription?.id} {' '}
                                {el?.queue_type === 1 ? 'After' : el?.queue_type === 2 ? 'Before' : el?.queue_type === 3 ? 'Same day' : ""} {' '}
                                {el?.gap ? `${el?.gap} days` : ''}
                            </div>
                        </div>
                        {
                            add_update_btns ? <div>
                                <Button className={'patient_card_x'} onClick={()=>showModal(el)}><EditOutlined style={{color: '#bdbbbb'}}/></Button>
                                <Button className={'patient_card_x'} onClick={deletePrescription}><img alt={'icons'} src={closeLightGray}/></Button>
                            </div> : <div></div>
                        }


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
            </Col>
    )
}
export default MedicationCards;
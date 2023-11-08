import React, {useRef} from 'react';
import {Button, Card, List, Modal, Tag} from 'antd';
import plusPurple from "../../../../../dist/icons/plus-purple.svg";
import { useEffect, useState } from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import {postResource} from "../../../../Functions/api_calls";
import AddMedications from "../CardAppointmentItems/AddMedications";
import Preloader from "../../../../Preloader";
import {t} from "i18next";

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
function PatientCardMedications({tab, dataClinic}) {

    // const [initLoading, setInitLoading] = useState(true);
    // const [loading, setLoading] = useState(false);
    // const [data, setData] = useState([]);
    // const [list, setList] = useState([]);
    //
    // useEffect(() => {
    //     fetch(fakeDataUrl)
    //         .then((res) => res.json())
    //         .then((res) => {
    //             setInitLoading(false);
    //             setData(res.results);
    //             setList(res.results);
    //         });
    // }, []);
    // const onLoadMore = () => {
    //     setLoading(true);
    //     setList(
    //         data.concat(
    //             [...new Array(count)].map(() => ({
    //                 loading: true,
    //                 name: {},
    //             })),
    //         ),
    //     );
    //     fetch(fakeDataUrl)
    //         .then((res) => res.json())
    //         .then((res) => {
    //             const newData = data.concat(res.results);
    //             setData(newData);
    //             setList(newData);
    //             setLoading(false);
    //
    //             window.dispatchEvent(new Event('resize'));
    //         });
    // };

    const token = useSelector((state) => state.auth.token);
    let params = useParams()


    const [prescriptions, setPrescriptions] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [addDeleteState, setAddDeleteState] = useState(1)
    const [prescriptionPerPage, setPrescriptionPerPage] = useState(3)
    const showModal = (data) => {
        setIsModalOpen(data??{});
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        setLoading(true)
        postResource('prescriptions','single', token,  '', {
                appointment: params.id,
                per_page: prescriptionPerPage
            }
        ).then((response) => {
            setPrescriptions(response?.items)
            setLoading(false)

        })
    }, [tab, addDeleteState, prescriptionPerPage])

    const onLoadMore = () => {
        setPrescriptionPerPage(prescriptionPerPage + 3)
    }

    return(
        <div className={'current_medications_card'}>
            {
                loading ? <Preloader /> : <Card
                    title="Current medications"
                    extra={<Button className={'patient_card_btn'} onClick={showModal}> <img alt={'icons'} src={plusPurple}/><span style={{marginLeft:10}}>{t('Add')}</span></Button>}
                    style={{ padding:20}}
                >
                    <List
                        className="demo-loadmore-list"
                        // loading={initLoading}
                        itemLayout="horizontal"
                        dataSource={prescriptions}
                        //style={{overflow: 'auto', height: 220}}
                        renderItem={(e) => {
                            return<List.Item >
                                <List.Item.Meta

                                    title={<div style={{fontWeight: 700}}>{e?.name}</div>}
                                    description={<div><span style={{color: '#000000'}}>{`${e?.frequency} times/day /`}</span>{`${e?.dose} pcs `}</div>}
                                />
                                <div>{e?.duration} {t('days')}</div>

                            </List.Item>
                        }}
                    />
                    <div style={{display: 'flex'}}>
                        {
                            dataClinic?.prescriptions?.length >= prescriptionPerPage ? (
                                <div style={{paddingTop: 10}}>
                                    <Tag onClick={onLoadMore} style={{cursor: 'pointer', fontSize:13}}  color="magenta" className={'ant_tag'}>{('Show More')}</Tag>
                                </div>
                            ) : null
                        }
                        {
                            prescriptionPerPage > 3 ? (
                                <div style={{paddingTop: 10}}>
                                    <Tag onClick={()=>setPrescriptionPerPage(prescriptionPerPage - 3)} style={{cursor: 'pointer', fontSize:13}}  color="magenta" className={'ant_tag'}>{t('Show Less')}</Tag>
                                </div>
                            ) : null
                        }
                    </div>

                </Card>
            }

            <Modal className={'medications_modal'} width={752} title="Add medication" footer={false} open={isModalOpen} onCancel={handleCancel}>
                <AddMedications key={Math.random()} handleCancel={handleCancel} setIsModalOpen={setIsModalOpen} data={isModalOpen} prescriptions={prescriptions} setAddDeleteState={setAddDeleteState}/>
            </Modal>

        </div>
    )
}
export default PatientCardMedications;

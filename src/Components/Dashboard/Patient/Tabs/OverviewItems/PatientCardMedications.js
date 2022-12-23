import React from 'react';
import {Button, Card, List, Tag} from 'antd';
import plusPurple from "../../../../../dist/icons/plus-purple.svg";
import { useEffect, useState } from 'react';

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
function PatientCardMedications() {

    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                setInitLoading(false);
                setData(res.results);
                setList(res.results);
            });
    }, []);
    const onLoadMore = () => {
        setLoading(true);
        setList(
            data.concat(
                [...new Array(count)].map(() => ({
                    loading: true,
                    name: {},
                })),
            ),
        );
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                const newData = data.concat(res.results);
                setData(newData);
                setList(newData);
                setLoading(false);

                window.dispatchEvent(new Event('resize'));
            });
    };


    return(
        <div className={'current_medications_card'}>
            <Card
                title="Current medications"
                extra={<Button className={'patient_card_btn'}> <img alt={'icons'} src={plusPurple}/><span style={{marginLeft:10}}>Add</span></Button>}
                style={{ padding:20}}
            >
                <List
                    className="demo-loadmore-list"
                    loading={initLoading}
                    itemLayout="horizontal"
                    dataSource={list}
                    renderItem={(item) => (
                        <List.Item>
                                <List.Item.Meta
                                    title={'Lipanthyl 145 mg '}
                                    description="4 times/day / by time"
                                />
                                <div>21 days</div>

                        </List.Item>
                    )}
                />
                {
                    !initLoading && !loading ? (
                        <div>
                            <Tag style={{cursor: 'pointer', fontSize:13}} onClick={onLoadMore} color="magenta" className={'ant_tag'}>and more 2 items</Tag>
                        </div>
                    ) : null
                }
            </Card>
        </div>
    )
}
export default PatientCardMedications;
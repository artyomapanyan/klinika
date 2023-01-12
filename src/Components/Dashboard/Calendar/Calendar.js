import {Col, Divider, List, Row, Tag} from "antd";
import React from 'react';
import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

function Calendar() {
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
        <div>
            <Row>
                <Col lg={16} style={{border: '1px solid black'}}>
                    <div style={{height:200}}>

                    </div>
                </Col>
                <Col lg={8} style={{border: '1px solid black'}}>
                    <div style={{margin:20, borderRadius:15, backgroundColor: "white", border:"1px solid #d2d9d4", padding:20}}>
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:20}}>
                            <h1 className={'h1'}>Notifications</h1>
                            <Tag color="magenta" className={'ant_tag'}>ID: 1561654</Tag>
                        </div>
                        <Divider/>
                        <div>
                            <List
                                className="demo-loadmore-list"
                                loading={initLoading}
                                itemLayout="horizontal"
                                dataSource={list}
                                renderItem={() => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={'Lipanthyl 145 mg '}
                                            description="4 times/day / by time"
                                        />
                                        <div>21 days</div>

                                    </List.Item>
                                )}
                            />
                        </div>

                        {
                            !initLoading && !loading ? (
                                <div style={{padding:20}}>
                                    <Link style={{color:'gray'}} onClick={onLoadMore}>Show all notifications 32</Link>
                                </div>
                            ) : null
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default Calendar;

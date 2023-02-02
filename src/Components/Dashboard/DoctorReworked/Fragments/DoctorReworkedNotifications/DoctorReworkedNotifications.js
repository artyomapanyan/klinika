import React, {useEffect, useState} from "react";
import {Divider, List, Tag} from "antd";
import {Link} from "react-router-dom";

const count = 6;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
function DoctorReworkedNotifications() {
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
        <div className={'chart_incomes_div'} >
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
    )
}
export default DoctorReworkedNotifications;
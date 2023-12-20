import {Avatar, Button, Card, Form, Table, Typography} from "antd";
import {t} from "i18next";
import TableFilterElement from "../../../../Fragments/TableFilterElements/TableFilterElement";
import DateParser from "../../../../Fragments/DateParser";
import ResourceTable from "../../../../Fragments/ResourceTable";
import React, {useEffect, useState} from "react";
import {UserOutlined} from "@ant-design/icons";
import {postResource} from "../../../../Functions/api_calls";
import {useSelector} from "react-redux";
import Preloader from "../../../../Preloader";

const ShowClinicDoctorsTab = ({dataState}) => {

    let dataDoctors = dataState?.data?.doctors?.map((el) => {
        return {
            key: el.id,
            doctor: <div key={el?.id} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div>
                    <Avatar size={64} icon={<UserOutlined />} />
                </div>
                <div  style={{padding:10, minWidth: 150}}>{el?.first} {el?.last}</div>
            </div>,
            specialty: <div>{el?.specialties?.map((specialty, key) => {
                return<span key={key}><span style={{backgroundColor: '#d24a9a', color: '#ffffff', marginLeft: 5, padding: 1, borderRadius: 2}}>{specialty?.title}</span></span>
            })}
            </div>
        }
    })


    const columns = [
        {
            title: 'Doctor',
            dataIndex: 'doctor',
            key: 'doctor',
        },
        {
            title: 'Specialty',
            dataIndex: 'specialty',
            key: 'specialty',
        },

    ];

  return (
    <div style={{width: '100%'}}>
        <Table rowKey={dataState?.data?.doctors?.key} dataSource={dataDoctors} columns={columns} style={{width: '100%'}} pagination={false}/>



    </div>
  );
};
export default ShowClinicDoctorsTab;
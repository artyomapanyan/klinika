import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Typography, Avatar, Progress, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { t } from 'i18next';

import ResourceTable from '../../../../Fragments/ResourceTable';
import ResourceLinks from '../../../../ResourceLinks';
import styles from './SecondClinicTabManageDoctors.module.scss';
import infoIcon from "../../../../../dist/icons/infoIcon.png";

const resource = 'Clinic';
const SecondClinicTabManageDoctors = ({ loadingState, resourceLink = null }) => {
  const [ record, setRecord ] = useState ({});
  const navigate = useNavigate ();

  const {Paragraph} = Typography

  const onResourceEdit = () => {
    navigate (ResourceLinks[resourceLink ?? resource] + record.id);
  };

  return (
    <div className={styles.root}>
      <ResourceTable
        title={t ('Cities')}
        resource={'Clinic'}
        except={{ edit: false, delete: true }}
        editBtnStyle={{
          type: "default",
          size: "large",
          btnStyle: {
            backgroundColor: "#F5F5F8",
          },
          iconStyle: {
            color: "#BF539E",
          }
      }}
        showHeader={false}
        noHeader={true}
        tableColumns={[
          {
            title: t ('Clinic'),
            dataIndex: 'clinic',
            key: 'clinic',
            render: (e, record) => {
              setRecord (record);
              return <div
                onClick={(record) => onResourceEdit (record)}
                className={styles.card}
              >
                <Space>
                  <Avatar
                    shape="square"
                    size={90}
                    className={styles.avatar}
                    icon={<UserOutlined/>}
                  />
                  <div className={styles.titleGroup}>
                    <div className={styles.title}>Cody Fisher</div>
                    <div className={styles.subtitle}>Ar Rihab, Diriyah 13717</div>
                  </div>
                </Space>
              </div>;
            },
          },
          {
            title: t (''),
            dataIndex: '',
            key: '',
            render: () => {
              return (
                <div className={styles.rightCol}>
                  <div className={styles.weekDays}>
                    <div className={styles.day}>
                      <Paragraph className={styles.dayTitle}><b>MON</b> 4h</Paragraph>
                      <Progress strokeColor={'#4FB873'} percent={50} steps={4}/>
                    </div>
                    <div className={styles.day}>
                      <Paragraph className={styles.dayTitle}><b>TUE</b> 4h</Paragraph>
                      <Progress strokeColor={'#4FB873'} percent={50} steps={4}/>
                    </div>
                    <div className={styles.day}>
                      <Paragraph className={styles.dayTitle}><b>WED</b> 4h</Paragraph>
                      <Progress strokeColor={'#4FB873'} percent={50} steps={4}/>
                    </div>
                    <div className={styles.day}>
                      <Paragraph className={styles.dayTitle}><b>THU</b> 4h</Paragraph>
                      <Progress strokeColor={'#4FB873'} percent={50} steps={4}/>
                    </div>
                    <div className={styles.day}>
                      <Paragraph className={styles.dayTitle}><b>FRI</b> 4h</Paragraph>
                      <Progress strokeColor={'#4FB873'} percent={50} steps={4}/>
                    </div>
                    <div className={styles.day}>
                      <Paragraph className={styles.dayTitle}><b>SAT</b> 4h</Paragraph>
                      <Progress strokeColor={'#4FB873'} percent={50} steps={4}/>
                    </div>
                    <div className={styles.day}>
                      <Paragraph className={styles.dayTitle}><b>SUN</b> 4h</Paragraph>
                      <Progress strokeColor={'#4FB873'} percent={50} steps={4}/>
                    </div>
                  </div>
                  <div className={styles.otherInfoGroup}>
                    <Paragraph className={styles.otherInfoGroupItem}>Working hours in month: <b>96 hours</b> <span className={styles.line}></span></Paragraph>
                    <Paragraph className={styles.otherInfoGroupItem}>Services: <b>12 services</b> <img src={infoIcon} alt={"Info"}/> <span className={styles.line}></span></Paragraph>
                    <Paragraph className={styles.otherInfoGroupItem}>Status: <b style={{color: "#4FB873"}}>Active</b></Paragraph>
                  </div>
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
};
export default SecondClinicTabManageDoctors;
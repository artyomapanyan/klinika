import React, { useState } from 'react';
import {useNavigate, useParams} from 'react-router';
import {Typography, Avatar, Progress, Space, Form, Divider, Button, Row, Col} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { t } from 'i18next';

import ResourceTable from '../../../../Fragments/ResourceTable';
import ResourceLinks from '../../../../ResourceLinks';
import styles from './SecondClinicTabManageDoctors.module.scss';
import infoIcon from "../../../../../dist/icons/infoIcon.png";
import Resources from "../../../../../store/Resources";
import FormInput from "../../../../Fragments/FormInput";
import suffix_select_icon from "../../../../../dist/icons/suffix_select_icon.png";

const resource = 'ClinicDoctor';
const SecondClinicTabManageDoctors = ({ loadingState, resourceLink = null }) => {
  const [ record, setRecord ] = useState ({});
    const params = useParams();
  const navigate = useNavigate ();

  const {Paragraph} = Typography

  const onResourceEdit = () => {
    navigate (ResourceLinks[resourceLink ?? resource] + record.id);
  };

  const onAddNew = () => {
    navigate(ResourceLinks[resourceLink??resource] + 'new')
  }

  const onReset = () => {

  }

  return (
    <div className={styles.root}>

      <ResourceTable
          customHeader={({setParams})=><Form onValuesChange={(e,v)=> {
            setParams(v)
          }}>
            <Row className={'manage_doc_filter_div'} gutter={24}>
              <Col lg={14}>
                <FormInput label={t('')} name={'specialty_id'}
                           inputProps={{mode: 'multiple'}}
                           suffixIcon={<div> <Divider type={"vertical"} style={{height: 30}}/> <span style={{color:'#635D6B', fontSize: '12',marginRight: 10 }}>Specialties</span>  <img alt={'suffix_select_icon'} src={suffix_select_icon}/></div>}
                           inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={null}
                           initialData={[]}
                           resource={'Taxonomy'}
                           resourceParams={{
                             type: Resources.TaxonomyTypes.SPECIALTY,
                             has_parent: 0
                           }}
                />
              </Col>
              <Col lg={8}>
                <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={null}
                           initialData={Resources.Status}
                />
              </Col>
              <Col lg={2} align={'center'}>
                <div onClick={()=>onReset(params)}  className={'reset_filter_div'} style={{width:90}}>
                  Reset filter
                </div>
              </Col>



            </Row>




          </Form>}

        title={t ('Cities')}
        resource={'ClinicDoctor'}
        except={{ edit: false, delete: true }}
        tableParams={{
            clinic: params.id,
            is_approved: 1
        }}
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
            title: t ('Doctor id'),
            dataIndex: 'id',
            key: 'plid',
            render: (e, record) => {
              return <div
                onClick={onResourceEdit}
                className={styles.card}
              >
                <Space>
                  <Avatar
                    shape="square"
                    size={72}
                    className={styles.avatar}
                    icon={<UserOutlined/>}
                  />
                  <div className={styles.titleGroup}>
                    <div className={styles.title}>
                      {record?.doctor?.first}{record?.doctor?.last}
                    </div>
                    <div className={styles.subtitle}>Specialty</div>
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
                      <Progress strokeColor={'#4FB873'} percent={50} steps={4} showInfo={false}/>
                    </div>
                    <div className={styles.day}>
                      <Paragraph className={styles.dayTitle}><b>TUE</b> 4h</Paragraph>
                      <Progress strokeColor={'#4FB873'} percent={50} steps={4} showInfo={false}/>
                    </div>
                    <div className={styles.day}>
                      <Paragraph className={styles.dayTitle}><b>WED</b> 4h</Paragraph>
                      <Progress strokeColor={'#4FB873'} percent={50} steps={4} showInfo={false}/>
                    </div>
                    <div className={styles.day}>
                      <Paragraph className={styles.dayTitle}><b>THU</b> 4h</Paragraph>
                      <Progress strokeColor={'#4FB873'} percent={50} steps={4} showInfo={false}/>
                    </div>
                    <div className={styles.day}>
                      <Paragraph className={styles.dayTitle}><b>FRI</b> 4h</Paragraph>
                      <Progress strokeColor={'#4FB873'} percent={50} steps={4} showInfo={false}/>
                    </div>
                    <div className={styles.day}>
                      <Paragraph className={styles.dayTitle}><b>SAT</b> 4h</Paragraph>
                      <Progress strokeColor={'#4FB873'} percent={50} steps={4} showInfo={false}/>
                    </div>
                    <div className={styles.day}>
                      <Paragraph className={styles.dayTitle}><b>SUN</b> 4h</Paragraph>
                      <Progress strokeColor={'#4FB873'} percent={50} steps={4} showInfo={false}/>
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
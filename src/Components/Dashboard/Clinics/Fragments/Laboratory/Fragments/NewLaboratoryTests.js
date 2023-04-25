import React, {useEffect, useState} from "react";
import {t} from "i18next";
import FormInput from "../../../../../Fragments/FormInput";
import {Checkbox, Col, Row} from "antd";
import {postResource} from "../../../../../Functions/api_calls";
import {useSelector} from "react-redux";
import Preloader from "../../../../../Preloader";
import x_black from "../../../../../../dist/icons/x_black.png";
import {SearchOutlined} from "@ant-design/icons";


const CheckboxGroup = Checkbox.Group;

function NewLaboratoryTests() {
    let token = useSelector((state) => state.auth.token);

    const [loading, setLoading] = useState(false)
    const [labTests, setLabTests] = useState([])
    const [searchState, setSearchState] = useState('')

    const defaultCheckedList = [];
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = useState(true);
    const onChange = (list, name) => {
        setCheckedList(list);
    };
    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? labTests : []);
    };



    useEffect(() => {
        setLoading(true)
        postResource('LabTest','list',token,'',{
            per_page: 5000
        }).then((responses)=> {
            setLabTests(responses.items.map((el)=> ({ label:el.name,value:el.id})))
            setLoading(false)
        })

    }, [])

    const onDeleteCard = (el) => {
        setCheckedList(checkedList.filter(list => list !== el))

    }

    const onSearch = (e) => {
         setSearchState(e.target.value)
    }


    return(
        <div>
            <Row >
                <Col lg={6}>
                    <div className={'lab_tests_inputs'}>
                        <div style={{width: '100%'}}>
                            <FormInput label={t('Duration, min')} name={'Duration'}  />
                        </div>
                        <div style={{width: '100%'}}>
                            <FormInput label={t('Slot time, min')} name={'Slot'}  />
                        </div>
                    </div>


                </Col>
                <Col lg={18}>

                </Col>
            </Row>
            <Row >
                <Col lg={6}>
                    <div className={'lab_tests_check_div'}>
                        <div className={'lab_tests_check_head_div'}>
                            <div>
                                <span className={'test_name'}>Test name</span>
                                <span className={'lab_test_quantity'}>{checkedList.length}</span>
                            </div>

                            <div onClick={onCheckAllChange} className={'delete_div'}>
                                Deselect all
                            </div>
                        </div>
                        <div>

                        </div>
                        <div className={'lab_tests_checkbox_div'}>
                            <div align={'right'}>
                                <FormInput onChange={(e)=>onSearch(e)} className={'search_input'} label={t('Search')} />
                                <SearchOutlined style={{color: '#BF539E', fontSize:20, marginTop: -63, position:'absolute', marginLeft: -40}} />
                            </div>

                            {loading?<Preloader/>: <div className={'lab_tests_checkbox_groups'}>

                                <CheckboxGroup  value={checkedList} options={labTests.filter(el=>el?.label?.toLowerCase()?.includes(searchState?.toLowerCase()))} onChange={onChange} />

                            </div>}
                        </div>
                    </div>



                </Col>
                <Col lg={18}>
                    <div className={'lab_tests_price_head_div'}>
                        <div>
                            <span className={'test_name'}>Price</span>
                        </div>

                        <div onClick={onCheckAllChange} className={'delete_div'}>
                            Delete  without prices
                        </div>
                    </div>
                    <div style={{display: 'flex', width: "100%", flexWrap: 'wrap'}}>
                        {
                            checkedList?.map((el) => {
                                return<div key={el} className={'clinic_test_card'}>
                                    <div>
                                        <div>{labTests.find(e=>e.value===el)?.label}</div>
                                        <div>120</div>
                                    </div>
                                    <div>
                                        <img onClick={()=>onDeleteCard(el)} className={'del_icin'} alt={'x_black'} src={x_black}/>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default NewLaboratoryTests;
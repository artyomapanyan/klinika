import React, {useEffect, useState} from "react";
import {t} from "i18next";
import FormInput from "../../../../../Fragments/FormInput";
import {Checkbox, Col, Divider, Row} from "antd";
import {postResource} from "../../../../../Functions/api_calls";
import {useSelector} from "react-redux";
import Preloader from "../../../../../Preloader";
import x_black from "../../../../../../dist/icons/x_black.png";
import {SearchOutlined} from "@ant-design/icons";
import dark_delete_icon from "../../../../../../dist/icons/dark_delete_icon.png";


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
        postResource('LabPackage','list',token,'',{
            per_page: 5000
        }).then((responses)=> {
            setLabTests(responses.items.map((el)=> ({
                label:el.name,
                value:el.id,
                description: el?.description
            })))
            setLoading(false)
        })

    }, [])

    const onDeleteCard = (el) => {
        setCheckedList(checkedList.filter(list => list !== el))

    }

    console.log(labTests, 'package')


    return(
        <div style={{marginTop: 20}}>

            <Row >
                <Col lg={6}>
                    <div className={'lab_tests_check_div'}>
                        <div className={'lab_tests_check_head_div'}>
                            <div>
                                <span className={'test_name'}>Packages</span>
                                <span className={'lab_test_quantity'}>{checkedList.length}</span>
                            </div>

                            <div onClick={onCheckAllChange} className={'delete_div'}>
                                Deselect all
                            </div>
                        </div>
                        <div>

                        </div>
                        <div className={'lab_tests_checkbox_div'}>


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
                    <div style={{ width: "100%"}}>
                        {
                            checkedList?.map((el) => {
                                return<div key={el} className={'package_price_big_div'} >

                                        <div>
                                            <div>{labTests.find(e=>e.value===el)?.label}</div>
                                            <div dangerouslySetInnerHTML={{__html: labTests.find(e=>e.value===el)?.description}}></div>
                                        </div>
                                        <div className={'package_price_right_big_div'}>
                                            <Divider type={'vertical'} style={{height:'100%'}}/>

                                            <div key={el} className={'clinic_package_small_card'}>
                                                <div>
                                                    <div>Price</div>
                                                    <div>120</div>
                                                </div>
                                                <div>
                                                    <img onClick={()=>onDeleteCard(el)} className={'del_icin'} alt={'x_black'} src={x_black}/>
                                                </div>
                                            </div>

                                            <div className={'delete_icon_div'}>
                                                <img onClick={()=>onDeleteCard(el)} className={'del_icin'} alt={'dark_delete_icon'} src={dark_delete_icon}/>
                                            </div>
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
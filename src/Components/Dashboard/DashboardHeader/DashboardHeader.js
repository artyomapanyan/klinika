import React from 'react'
import {Button, Col, Row} from "antd";
import axios from "axios";
import api from "../../../Api";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";

function DashboardHeader() {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleLogout = () => {
        axios.get(api.Auth.logout.url, {

            headers: {
                'Authorization': auth.token,
            }
        }).then(() => {
            dispatch({
                type: 'LOGOUT'
            })
            navigate('/')
        })

    }
    return <Row>
        <Col lg={12}></Col>
        <Col lg={12}><Button type={'primary'} onClick={handleLogout}>Logout</Button> </Col>
    </Row>
}

export default DashboardHeader

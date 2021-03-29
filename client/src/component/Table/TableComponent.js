import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Globalcontext } from '../../context/Reducers/Provider'
import './TableComponent.scss'

import ActionDeleteICon from '../../assets/action-delete.svg'
import ActionEditICon from '../../assets/action-edit.svg'


const TableComponent = (props) => {

    const { Array } = useContext(Globalcontext)
    const [filterarray] = Array;
    const [any] = props.value;

    const copyCoupon = (e) => {        
        const text = document.getElementById('')
        document.execCommand("copy")
    }

    const [data, setData] = useState("")
    useEffect(() => {
        if (any == "n") {
            setData("name")
        } if (any == "c") {
            setData('couponCode')
        }
       
    }, [data])
     const type =localStorage.getItem("type")
     
    return (
        <Container fluid className="Table">
            <Row className="TableHeaderRow">
                {props.header.map((head, i) => {
                    return <Col md={head.md} className="TableHeaderItem">{head.name}</Col>
                })}

            </Row>
            <Container fluid className="TableDataRowContainer">
                {props.TableData ?
                    <>
                        {props.TableData[0].hasOwnProperty('couponCode') &&
                            props.TableData.filter((ele) => {
                                if (filterarray == null) {
                                    return ele
                                } else if (ele.couponCode.includes(filterarray)) {
                                    return ele
                                }
                            })
                                .map((ele, i) => {
                                    return (
                                        <Row key={i} className="TableDataRow">
                                            <Col className="TableDataItemCon" md={9}
                                                onClick={(e) => props.ViewClick(e, ele)}>
                                                <Col md={1} className="TableDataItem sno">{i + 1}</Col>
                                                <Col md={4} className="TableDataItem code" id="couponCode" onselect={(e) => copyCoupon(e)}>{ele.couponCode.toUpperCase()}</Col>
                                                <Col md={2} className="TableDataItem dis">{ele.discount_perc > 0 ? ele.discount_perc + ' %' : 'FLAT ' + ele.discount_money}</Col>
                                                <Col md={2} className="TableDataItem statusBtn">
                                                    <Button
                                                        className={`BtnStatus ${(ele.expireByDate) ? (new Date(ele.dateOfExpiry) < new Date()) ? 'Expired':  ele.couponStatus ? 'Active' : 'Deactive' : ele.couponStatus ? 'Active' : 'Deactive'}`} >
                                                        {(ele.expireByDate) ? (new Date(ele.dateOfExpiry) < new Date()) ? 'Expired':  ele.couponStatus ? 'Active' : 'Deactive' : ele.couponStatus ? 'Active' : 'Deactive'}
                                                    </Button>
                                                </Col>
                                                <Col md={3} className="TableDataItem startDate">{ele.startingDate}</Col>
                                            </Col>
                                            <Col md={3} className="ActionBtnDiv">
                                               {props.userType === "super_admin" ? <Button
                                                    onClick={(e) => props.changeStatusClick(e, ele)}
                                                    className={`BtnActionStatus ${(ele.expireByDate) ? (new Date(ele.dateOfExpiry) < new Date()) ? 'Renew' : ele.couponStatus ? 'Deactivate' : 'Activate':ele.couponStatus ? 'Deactivate' : 'Activate'}`}>
                                                    {(ele.expireByDate) ? (new Date(ele.dateOfExpiry) < new Date()) ? null : ele.couponStatus ? 'Deactivate' : 'Activate' : ele.couponStatus ? 'Deactivate' : 'Activate'}</Button> :null}
                               
                                                
                                                
                                                {props.userType === "super_admin" ? <Button className="BtnActionIcon deleteBtn" onClick={() => props.DeleteClick(ele)}><img className="ActionIcon" src={ActionDeleteICon} /></Button> : null}

                                                <Button className="BtnActionIcon editBtn" onClick={() => props.EditClick(ele)}><img className="ActionIcon" src={ActionEditICon} /></Button>
                                            </Col>
                                        </Row>
                                    )
                                })
                        }
                        {props.TableData[0].hasOwnProperty('userType') &&
                            props.TableData.filter((ele) => {
                                if (filterarray == null) {
                                    return ele
                                } else if (ele.email.includes(filterarray)) {
                                    return ele
                                }
                            })
                                .map((ele, i) => {
                                    return (
                                        <Row key={i} className="TableDataRow">
                                            <Col className="TableDataItemCon" md={9}
                                                onClick={(e) => props.ViewClick(e, ele)}>
                                                <Col md={1} className="TableDataItem sno">{i + 1}</Col>
                                                <Col md={4} className="TableDataItem code" id="couponCode" onselect={(e) => copyCoupon(e)}>{ele.name}</Col>
                                                <Col md={2} className="TableDataItem dis">{ele.email}</Col>
                                                <Col md={2} className="TableDataItem statusBtn">
                                                    <Button
                                                        className={`BtnStatus ${ele.account_status ? 'Active' : 'Deactive'}`} >
                                                        {ele.account_status ? 'Active' : 'Deactive'}
                                                    </Button>
                                                </Col>
                                                <Col md={3} className="TableDataItem startDate">{ele.userType.replaceAll('_', ' ').toUpperCase()}</Col>
                                            </Col>
                                            <Col md={3} className="ActionBtnDiv">
                                                <Button
                                                    onClick={(e) => props.changeStatusClick(e, ele)}
                                                    className={`BtnActionStatus ${ele.account_status ? 'Deactivate' : 'Activate'}`}>
                                                    {ele.account_status ? 'Deactivate' : 'Activate'}</Button>
                                                {props.userType === "super_admin" ? <Button className="BtnActionIcon deleteBtn" onClick={() => props.DeleteClick(ele)}><img className="ActionIcon" src={ActionDeleteICon} /></Button> : null}

                                                <Button className="BtnActionIcon editBtn" onClick={() => props.EditClick(ele)}><img className="ActionIcon" src={ActionEditICon} /></Button>
                                            </Col>
                                        </Row>
                                    )
                                })
                        }
                    </>
                    : <Row className="NoRecordDataRow"><div>No Records to Show</div></Row>
                }

            </Container>
        </Container>
    )
}

export default TableComponent
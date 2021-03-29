import React, { useEffect, useState, useContext } from 'react'
import TableComponent from '../Table/TableComponent'
// import { Container, Row, Col, Button } from 'react-bootstrap'
import { Globalcontext } from '../../context/Reducers/Provider'
import { useHistory } from 'react-router'
import axios from 'axios'
import './CouponTable.scss'


const CouponTable = () => {
    const history = useHistory()
    const [TableData, setTableData] = useState()

    const { modals } = useContext(Globalcontext)
    const { View } = useContext(Globalcontext)
    const { Table } = useContext(Globalcontext)
    const { Edit } = useContext(Globalcontext)
    const { EditValue } = useContext(Globalcontext)
    const { Array } = useContext(Globalcontext)

    const [modal, setModal] = modals;
    const [editmodal, setEditmodal] = Edit
    const [TableDatas, setTableDatas] = Table
    const [viewmodal, setView] = View
    const [EditDatas, setEditDatas] = EditValue
    const [filterarray, setFilterarray] = Array;

    const UserType = localStorage.getItem("type")
   
    const getData = async () => {
        await axios.get('/coupon/view-all-coupons', {
            withCredentials: true,
        })
            .then(res => { 
                // console.log(res)
                setTableData(res.data.coupon)
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 403) {
                    history.push({
                        pathname: '/'
                    })
                }                
                setTableData()
            })
    }

    const changeStatusClick = async (e, ele) => {
        await axios.post(`/coupon/change-single-coupon-status/${ele._id}`)
            .then(res => {
                setTableData(data => {
                    let element = data.find(element => element._id === ele._id)
                    element.couponStatus = res.data.status
                    return data
                })
                getData()
            })
            .catch(err => { console.log(err) })
    }

    const ViewCouponClick = (e, ele) => {
        e.preventDefault()
        setView(true)
        setTableDatas(ele)
    }

    const EditCouponClick = (ele) => {
        setEditmodal(true)
        setEditDatas(ele)
    }
    const DeleteCouponClick = (ele) => {
        axios.delete(`/coupon/delete-single-coupon/${ele._id}`)
            .then(res => {                
                getData()
            })
            .catch(err => { console.log(err) })
    }

    useEffect(() => { getData() }, [modal])

    const [TableHeaders] = useState([
        { md: 1, name: 'S.no' },
        { md: 2, name: 'Coupon Code' },
        { md: 2, name: 'Discount' },
        { md: 2, name: 'Status' },
        { md: 2, name: 'Created on' },
        { md: 3, name: 'Actions' }
    ])
    const [data] =useState("couponCode")
    return (
        <>                
            {TableData &&         
                <TableComponent
                    TableData={TableData}
                    header={TableHeaders}
                    userType={UserType}
                    changeStatusClick={changeStatusClick}
                    ViewClick={ViewCouponClick}
                    DeleteClick={DeleteCouponClick}
                    EditClick={EditCouponClick}
                    value={data}
                />
            }
        </>
    )
}

export default CouponTable
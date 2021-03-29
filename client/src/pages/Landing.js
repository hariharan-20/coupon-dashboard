import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useHistory } from 'react-router'
// import {Globalprovider} from "../context/Reducers/Provider"

import Header from '../component/Header/Header'
import Sidebar from '../component/Sidebar/Sidebar'

import AddCoupon from '../component/Addcoupons/Addcoupon'
import Viewcoupon from '../component/Viewcoupons/Viewcoupon'
import Editcoupon from '../component/Editcoupons/Editcoupon'
import CouponTable from '../component/CouponTable/CouponTable'

import AddEmp from '../component/Addemp/AddData'

import Viewuser from "../component/ViewUser/ViewUser"
import Edituser from "../component/ViewUser/Edituser"
// import Coupon from './coupon'
import Employee from './Employee'

export const Landing = () => {

    const history = useHistory()
    const userType = localStorage.getItem('type')

    useEffect(() => {
        const  prevLoc = history.location.pathname.slice(8)
        if(!userType) {
            history.push('/')
        } else {
            history.push(`/coupon/${prevLoc}`)
        }        
    }, [])
    
    return (        
        <BrowserRouter>
            <div className="Landing" style={{display: 'flex'}}>                                                            
                <Header />
                <Sidebar />
            </div>
            <div className="landing-body">                                
                <Switch>
                    <Route path="/coupon/couponTable" component={CouponTable} />
                    <Route path="/coupon/employee" component={Employee} />                    
                </Switch>            
            </div>                
            <AddCoupon />
            <Viewcoupon/>
            <AddEmp />
            <Editcoupon/>
            <Viewuser/>   
            <Edituser/>                
        </BrowserRouter>
    )
}

export default Landing

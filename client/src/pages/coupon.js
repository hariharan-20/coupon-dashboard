import React from 'react'

import CouponTable from '../component/CouponTable/CouponTable'
// import Header from '../component/Header/Header'

import './styles/Coupon.scss'

const Coupon = () => {
    return(
        <div className="MainContainer">           
            {/* <Header/> */}
            <CouponTable />             
        </div>
    );    
}

export default Coupon

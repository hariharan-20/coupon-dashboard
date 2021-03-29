import React, { useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import ToggleIcon from '../../assets/grid.svg'
import AddCouponIcon from  '../../assets/sale-badge.svg'
import LogoutIcon from '../../assets/navbar-logout.svg'
import EmployeeIcon from '../../assets/navbar-employee.svg'

import './Sidebar.scss'
import axios from "axios"
export const Sidebar = () => {    
    const [ isOpen, setIsOpen ] = useState(false)
    const[data,setData] =useState()
    const[type,setType]=useState()
    const history = useHistory()
    useEffect(() => {
        const type =localStorage.getItem('type')
        console.log(type,'nav')
        setData(type)
    }, [])
    const logout=()=>{
        axios.get('/authenticate/logout',{withCredentials:true})
        .then(() => {
            localStorage.removeItem("name")
            localStorage.removeItem("type")
            history.push("/")        
            window.location.reload(false)
        })
    }
    return (
        <div className="SidebarContainer" style={{ width: isOpen ? '18%' : '5%' }}>
        <div className="SidebarContent">
            <div className="SidebarHeader" onClick={() => setIsOpen( isOpen => !isOpen) } 
            // onMouseOut ={(e) => setIsOpen( isOpen => !isOpen)}
            >
                <img className="HeaderIcon" src={ToggleIcon} />
            </div>
            <div className="SidebarItemContainer">
                <div className="SidebarItem" onClick={() => {
                    history.push('/coupon/couponTable')
                    window.location.reload(false)
                }}><img className="ItemIcon" src={AddCouponIcon} />
                    <span className="SidebarItemText">View Coupon</span></div>
                <div className="SidebarItem" onClick={() => {
                    history.push('/coupon/employee')
                    window.location.reload(false)
                }}>{(data !== "operation" && data !== "business_development" ) &&                     
                <>
                        <img className="ItemIcon" src={EmployeeIcon}  />
                        <span className="SidebarItemText">Employees</span>
                </>  
                }
                </div>
                <div className="SidebarItem" onClick={logout}><img className="ItemIcon" src={LogoutIcon}  />
                    <span className="SidebarItemText">Logout</span></div>
                    
            </div>
        </div>
        </div>
    )
}
export default Sidebar
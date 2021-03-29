import React,{useState,useEffect,useContext} from 'react'
import logo from "../../assets/viewimg.svg"
import "./ViewUser.scss"
import {Globalcontext} from "../../context/Reducers/Provider"

function Viewcoupon() {
    
    const {Empmodal}=useContext(Globalcontext)
    const[empmodal,setEmpmodal]=Empmodal
    const {Viewemp} =useContext(Globalcontext)
    const [viewemp,setViewemp]=Viewemp
    const[display,setDisplay]=useState()
    // const {Edit} =useContext(Globalcontext)
    // const [editmodal,setEditmodal]=Edit
    // const {EditValue}=useContext(Globalcontext)
    // const [EditDatas,setEditDatas]=EditValue
   
  
    useEffect(() => {
        empmodal && setDisplay(true)
       
        document.addEventListener('keydown', function(event){
            if(event.key === 'Escape'){
               close()
           
            }
        });
      
     },[empmodal])
     
      const close = () =>{
          setDisplay(false)
          setEmpmodal(false)
      }
    //   const editClick = () =>{
    //       setEditmodal(true)
    //       setDisplay(false)
    //       setEditDatas(TablesDatas)
          
    //   }
      if(display){
    return (
        
        <div className="modal-wrapper">
            
                <div className="modal-backdrop" >
                     <div className="box-modal">
                     <div className="container-3">
                                <h1 onClick={close}>X</h1>
                              
                                  {/* <img src="" alt="profile"/> */}
                                  <p>{viewemp.name}</p>
                                  <p>{viewemp.userType}</p>
                         </div>
                         <div className="boxes">
                         <div className="content-css">
                             <span>Email</span>
                              <p>{viewemp.email}</p>
                           
                         </div> 
                         <div className="content-css">
                             <span>Phone</span>
                             <p>{viewemp.phone}</p>
                           
                         </div> 
                         <div className="content-css">
                             <span>Joined By</span>
                             <p>{viewemp.joinedOn}</p>
                           
                         </div> 
                         <div className="content-css">
                             <span>User Type</span>
                             <p>{viewemp.userType}</p>
                           
                         </div> 
                         
                         </div>
                          {/* <button className="viewcouponbut"  >Edit</button> */}
                         </div>
                </div>
            
        </div>
    )}
    return null
}

export default Viewcoupon

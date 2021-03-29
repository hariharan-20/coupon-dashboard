import React,{useState,useEffect,useContext} from 'react'
import logo from "../../assets/viewimg.svg"
import "./viewcoupon.scss"
import {Globalcontext} from "../../context/Reducers/Provider"

function Viewcoupon() {
    const {Table}=useContext(Globalcontext)
    const [TablesDatas,setTableDatas]=Table
    const {View}=useContext(Globalcontext)
    const [viewmodal,setViewmodal]=View
    const[display,setDisplay]=useState()
    const {Edit} =useContext(Globalcontext)
    const [editmodal,setEditmodal]=Edit
    const {EditValue}=useContext(Globalcontext)
    const [EditDatas,setEditDatas]=EditValue
    const [arr,setArray]=useState()
  
    useEffect(() => {
        viewmodal && setDisplay(true)
       
        document.addEventListener('keydown', function(event){
            if(event.key === 'Escape'){
               close()
           
            }
        });
       if(TablesDatas){
           if(TablesDatas.validFor){
               console.log(TablesDatas.validFor.length,"length")
               setArray(TablesDatas.validFor)
               callfun(TablesDatas.validFor)
           }
       }
      
     },[viewmodal,TablesDatas])
   
     const callfun = (arr) =>{
         console.log(arr,"sdasd")
         let newObj = {
             forProgram:[],
             forCourse:[],
             forEmail:[],
             greaterThan:[],
             equalTo:[],
             lesserThan:[]
         };
        
         for(let no = 0;no < arr.length;no ++ ){
             let conditionArr=arr[no];
                 if( conditionArr[0]=='forProgram'){
                     newObj.forProgram.push( conditionArr[1]);
                 }else if( conditionArr[0]=='forCourse'){
                    newObj.forCourse.push( conditionArr[1]);
                 }else if( conditionArr[0]=='forEmail'){
                    newObj.forEmail.push( conditionArr[1]);
                 }else if( conditionArr[0]=='greaterThan'){
                    newObj.greaterThan.push( conditionArr[1]);
                 }else if( conditionArr[0]=='equalTo'){
                    newObj.equalTo.push( conditionArr[1]);
                 }else if( conditionArr[0]=='lesserThan'){
                    newObj.lesserThan.push( conditionArr[1]);
                 }
         }
         console.log(newObj,"poiuy")
         setArray(newObj)
     }
     console.log(arr,"array")
      const close = () =>{
          setDisplay(false)
          setViewmodal(false)
      }
      const editClick = () =>{
          setEditmodal(true)
          setDisplay(false)
          setEditDatas(TablesDatas)
          
      }
     
      if(display){
    return (
        
        <div className="modal-wrapper">
            
                <div className="modal-backdrop" >
                     <div className="box-modal">
                     <div className="container-2">
                                <h1 onClick={close}>X</h1>
                                <p>{TablesDatas.couponCode.toUpperCase()}</p>
                                <img src={logo}/>
                              
                         </div>
                         <div className="boxes">
                         <div className="content-css">
                             <span>Coupon Name</span>
                              <p>{TablesDatas.couponPurpose}</p>
                         </div> 
                         <div className="content-css">
                             <span>Created on</span>
                             <p>{TablesDatas.startingDate}</p>
                           
                         </div> 
                         <div className="content-css">
                             <span>Created By</span>
                             <p>{TablesDatas.createdBy}</p>
                           
                         </div> 
                         <div className="content-css">
                             {TablesDatas.hasOwnProperty(TablesDatas.validFor) && <span>Created For</span> ||  null}
                            {TablesDatas.hasOwnProperty(TablesDatas.validFor) && <p>{arr.forEmail}</p> || null }
                           
                         </div> 
                         <div className="content-css">
                              {TablesDatas.hasOwnProperty(TablesDatas.validFor) && <span>Course Name</span> || null }
                             {TablesDatas.hasOwnProperty(TablesDatas.validFor) && <p>{arr.forCourse}</p> }
                           
                         </div>
                         <div className="content-css">
                             {TablesDatas.expireByDate && <span>Expiry Date</span> || null}
                             {TablesDatas.expireByDate &&  <p>{TablesDatas.dateOfExpiry}</p> || null }
                           
                         </div> 
                         <div className="content-css">
                            {TablesDatas.discount_money &&  <span>Discount Amount</span> || null }
                             {TablesDatas.discount_money && <p>{TablesDatas.discount_money}</p> }
                           
                            
                           
                         </div> 
                         <div className="content-css">
                             <span>Discount%</span>
                            <p>{TablesDatas.discount_perc}</p> 
                           
                         </div> 
                         <label style={{    marginLeft:'34%',fontWeight:'bold'}}>Conditions</label>
                         {arr.forProgram.length > 0 ?<div className="content-css">
                         <span>Program Name</span> 
                         <div className="f">
                             {arr.forProgram.map((ele) => {
                                 return(
                             
                                          <li>{ele}</li> 
                                   
                                  
                                 )
                             })}
                              </div>
                           
                         </div>  : null }
                         {arr.forEmail.length > 0 ? <div className="content-css">
                             <span>For Email</span>
                             <div className="f">
                             {arr.forEmail.map((ele) => {
                                 return(
                             
                                          <li>{ele}</li> 
                                   
                                  
                                 )
                             })}
                              </div>
                           
                         </div> : null}
                         {arr.greaterThan.length > 0 ?  <div className="content-css">
                             <span>Greater Than Amount</span>
                             <div className="f">
                             {arr.greaterThan.map((ele) => {
                                 return(
                             
                                          <li>{ele}</li> 
                                   
                                  
                                 )
                             })}
                              </div>
                           
                         </div> : null}
                         {arr.lesserThan.length > 0 ? 
                            <div className="content-css">
                             <span>Lesser Than Amount</span> 
                             <div className="f">
                             {arr.lesserThan.map((ele) => {
                                 return(
                             
                                          <li>{ele}</li> 
                                   
                                  
                                 )
                             })}
                              </div>
                           
                         </div> : null}
                        {arr.equalTo.length > 0 ?  
                             <div className="content-css">
                             <span>Equal To Amount</span>
                             <div className="f">
                             {arr.equalTo.map((ele) => {
                                 return(
                             
                                          <li>{ele}</li> 
                                   
                                  
                                 )
                             })}
                              </div>
                           
                         </div> : null }
                          
                         </div>
                          <button className="viewcouponbut" onClick={editClick}>Edit</button>
                         </div>
                </div>
            
        </div>
    )}
    return null
}

export default Viewcoupon

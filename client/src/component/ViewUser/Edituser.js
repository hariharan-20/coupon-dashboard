import React,{useState,useEffect,useContext} from 'react'
import "./Edituser.scss"
import axios from "axios"
import {Globalcontext} from "../../context/Reducers/Provider"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify"
function Edituser() {
    
    const{Empedit,Empvalue}=useContext(Globalcontext)
    const[empedit,setEmpedit]=Empedit
    const[empdata,setEmpdata]=Empvalue
    const[display,setDisplay]=useState()
    const[email,setEmail]=useState()
    const[type,setType]=useState()
    const[id,setId]=useState()
    const {modals}=useContext(Globalcontext)
    const[modal,setModal]=modals;
    const[name,setName]=useState()
    useEffect(() => {
        empedit && setDisplay(true)

        document.addEventListener('keydown', function(event){
            if(event.key === 'Escape'){
               close()
           
            }
        });
        if(empdata){
            setEmail(empdata.email)
            setType(empdata.userType)
            setId(empdata._id)
            setName(empdata.name)
        }
      
     },[empedit])
     
      const close = () =>{
          setDisplay(false)
          setEmpedit(false)
      }
      const handleSubmit = () =>{
         
          axios({
              url:`/employee/update-single-user/${id}`,
              method:'post',
              data:{
                  forEmail:email,
                  forUserType:type,
                  name:name
              }
          }).then((res)=>{
            setEmpedit(true)
            setDisplay(false)
            setEmpedit()
            toast.success("User Updated successfully!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setEmpedit()
            setEmail("")
            setType("")
            setName("")
            setModal()
            setEmpdata()
            
            
          })
         
          
      }
      if(display){
    return (
        
        <div className="modal-wrapper">
            
                <div className="modal-backdrop" >
                     <div className="box-modall">
                           <div className="boxes">
                           <input type="text" required value={name} onChange={(e)=>setName(e.target.value)}/>
                             <input type="text" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                             <select onChange={(e)=>setType(e.target.value)} value={type} >node
                                 <option >Choose Department</option>
                                 <option name="admin">admin</option>
                                 <option name="technical">technical</option>
                                 <option name="hr">hr</option>
                                 <option name="opertaions">operation</option>
                                 <option name="bd">business_development</option>
                                 <option name="super_admin">super_admin</option>
                             </select>
                            
                        
                             </div>
                             <div className="content">
                                 <button className="viewcouponbu" onClick={handleSubmit}  >Update</button>
                                 <button className="viewcouponbu" onClick={close} >Cancel</button>
                             </div>
                          
                      
                         </div>
                </div>
            
        </div>
    )}
    return <ToastContainer/>
}

export default Edituser

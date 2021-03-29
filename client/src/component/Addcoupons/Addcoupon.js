import React, { useState, useContext, useEffect } from 'react'
import "./addcoupon.scss"
import { ToastContainer, toast } from "react-toastify"
import { Globalcontext } from "../../context/Reducers/Provider"
import axios from "axios"
import "react-toastify/dist/ReactToastify.css"
import { data } from 'jquery'
const Addcoupon = () => {
    const { modals } = useContext(Globalcontext)
    const [datamessage, setDatamessage] = useState("")
    const [display, setDisplay] = useState()
    const [modal, setModal] = modals;
    const [email, setMail] = useState("")
    const [allcourse, setAllcourse] = useState()
    const [price, setPrice] = useState()
    const [plans, setPlans] = useState()
    const [cost, setCost] = useState()
    const [progarmname, setProgramname] = useState("")
    const [coursename, setCoursename] = useState("")
    const [plantype, setPlantype] = useState("")
    const [validate, setValidate] = useState("")
    const [holder, setHolder] = useState("")
    const [discount] = useState("Discount")
    //new datas
    const [programs] = useState(['Internship', 'Extra Curricular Program', 'Job Gurantee', 'Certification', 'Kid'])
    const [courses,setCourses] = useState([])
    const [coursemap,setCoursemap] = useState([])
    const [checkvalueone, setCheckvalueone] = useState(true)
    const [checkvaluetwo, setCheckvaluetwo] = useState(false)
    const [discountperc, Setdiscountperc] = useState()
    const [checkmodalone, setCheckmodalone] = useState(true)
    const [checkmodaltwo, setCheckmodaltwo] = useState(true)
    const [cmone, setCmone] = useState(true)
    const [cmvalue, setCmvalue] = useState(true)
    const [cmvaluetwo, setCmvaluetwo] = useState(false)
    const [couponlimit, setCouponlimit] = useState(true)
    const [limitone, setLimitone] = useState(true)
    const [limittwo, setLimittwo] = useState(false)
    const [value, setValue] = useState([])
    const [valuetwo, setValuetwo] = useState()
    const [state, setState] = useState()
    const [fields, setFields] = useState([{ value: null }]);
    const [statetwo, setStatetwo] = useState([])
    const [type, setType] = useState()
    const [types, setTypes] = useState()
    const [index, setIndex] = useState()
    const [params,setParams] = useState()
    const [message,setMessage] =useState()
    const [datas, setDatas] = useState({
        couponCode: "",
        couponPurpose: "",
        byDiscountPerc: "",
        discount_money: "",
        discountLimit: "",
        maxDiscount: "",
        startingDate: "",
        dateOfExpiry: "",
        limitedTo: "",
        discount_perc:"",
        conditions: []

    })
    
    useEffect(() => {
        modal && setDisplay(true)
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                close()

            }
        });
        if(params){
            console.log(Object.values(params)[0].message)
            // window.alert(Object.values(params)[0].message)
            setMessage(Object.values(params)[0].message)
            setTimeout(() =>{
               setMessage("")
            },3000)
        }
        axios.get(`/course/get-all-course_name/Internship`)
        .then((response)=>{  
            {response.data.allCourse.map((ele) =>{
                coursemap.push(ele.name +     "-internship")
            })}          
            setCourses(coursemap)
                                          
        })
        axios.get(`/course/get-all-course_name/Extra Curricular Program`)
        .then((response)=>{  
            {response.data.allCourse.map((ele) =>{
                coursemap.push(ele.name+ "-ECP")
            })}          
            setCourses(coursemap)
                                          
        })
        axios.get(`/course/get-all-course_name/Job Gurantee`)
        .then((response)=>{  
            {response.data.allCourse.map((ele) =>{
                coursemap.push(ele.name + "Job gurantee")
            })}          
            setCourses(coursemap)
                                          
        })
        axios.get(`/course/get-all-course_name/Kid`)
        .then((response)=>{  
            {response.data.allCourse.map((ele) =>{
                coursemap.push(ele.name + "-Kid")
            })}          
            setCourses(coursemap)
                                          
        })
       
        // {courses && addCourse()}
    }, [modal,params])
    const addCourse = () =>{
        const data = courses.map((ele) =>{
            return(
                setCoursemap(ele.name)
            )
        })
       
    }
    const close = () => {
        setDisplay(false)
        setModal(false)
        setCost("")
        setCheckmodalone(false)
    }
    const handleChange = (e) => {
        setDatas({
            ...datas,
            [e.target.name]: e.target.value
        })
      
      
    }
    const handleCheckboxone = (e) => {

        if (e.target.checked === true) {
            setCheckvalueone(false)
            Setdiscountperc(true)

            setCheckmodalone(false)
            setCheckmodaltwo(true)
            document.getElementById('discountCheckNo').checked = false
        } else {
            setCheckmodalone(true)
            // setCheckmodaltwo(false)

            Setdiscountperc(false)
            // document.getElementById('discountCheckNo').checked = true
        }

    }
    const handleCheckboxtwo = (e) => {

        if (e.target.checked === true) {
            setCheckvaluetwo(true)
            Setdiscountperc(false)

            setCheckmodalone(true)
            setCheckmodaltwo(false)
            document.getElementById('discountCheckYes').checked = false
        } else {
            // setCheckmodalone(false)
            setCheckmodaltwo(true)

            setCheckvaluetwo(false)
            Setdiscountperc(true)
            // document.getElementById('discountCheckYes').checked = true
        }

    }
    const handleDiscountYes = (e) => {
        if (e.target.checked === true) {
            setCmone(false)
            setCmvalue(false)
            document.getElementById('MaxdiscountCheckNo').checked = false
        } else {
            // document.getElementById('discountCheckNo').checked = false
            setCmone(true)
            setCmvalue(true)
        }
    }

    const handleDiscountNo = (e) => {
        if(e.target.checked === true) {
            setCmone(true)
            setCmvalue(true)
            document.getElementById('MaxdiscountCheckYes').checked = false
        }
    }

    const handleCouponYes = (e) => {
        if (e.target.checked === true) {
            setCouponlimit(false)
            setLimitone(false)
            document.getElementById('couponUsageCheckNo').checked =false

        } else {
            setCouponlimit(true)
            setLimitone(true)
        }
    }

    const handleCouponNo = (e) => {
        if (e.target.checked === true) {
            setCouponlimit(true)
            setLimitone(true)
            document.getElementById('couponUsageCheckYes').checked =false
        }
    }

    // const handleIndex = (i) => {
    //     setIndex(i)
    // }
    const handleSelect = (e, index) => {
        
        if (e.target.value === "forProgram") {
            document.getElementsByClassName('selectdivsion')[index].childNodes[1].hidden = false
            document.getElementsByClassName('selectdivsion')[index].childNodes[2].hidden = true            
            
            let newVal = value.splice(index, 1, programs)
            setValue([...value, newVal])
            
            setType("select")            
        }
        if (e.target.value === "forCourse") {
            document.getElementsByClassName('selectdivsion')[index].childNodes[1].hidden = false
            document.getElementsByClassName('selectdivsion')[index].childNodes[2].hidden = true   

            let newVal = value.splice(index, 1, courses)
            setValue([...value, newVal])
                 

        }
        if (e.target.value === "forEmail") {            
            document.getElementsByClassName('selectdivsion')[index].childNodes[1].hidden = true
            document.getElementsByClassName('selectdivsion')[index].childNodes[2].hidden = false
            document.getElementsByClassName('selectdivsion')[index].childNodes[2].placeholder = 'Enter Email'

            let newVal = []
            setValue([...value, newVal])
        }        
        if(e.target.value  === "greaterThan"){
            document.getElementsByClassName('selectdivsion')[index].childNodes[1].hidden = true
            document.getElementsByClassName('selectdivsion')[index].childNodes[2].hidden = false
            document.getElementsByClassName('selectdivsion')[index].childNodes[2].placeholder = 'Enter value'

            let newVal = []
            setValue([...value, newVal])
        }
        if(e.target.value  === "lesserThan"){
            document.getElementsByClassName('selectdivsion')[index].childNodes[1].hidden = true
            document.getElementsByClassName('selectdivsion')[index].childNodes[2].hidden = false
            document.getElementsByClassName('selectdivsion')[index].childNodes[2].placeholder = 'Enter value'

            let newVal = []
            setValue([...value, newVal])
        }
        if(e.target.value  === "equalTo"){
            document.getElementsByClassName('selectdivsion')[index].childNodes[1].hidden = true
            document.getElementsByClassName('selectdivsion')[index].childNodes[2].hidden = false
            document.getElementsByClassName('selectdivsion')[index].childNodes[2].placeholder = 'Enter value'

            let newVal = []
            setValue([...value, newVal])
        }
    }
    const handleChangetwo = (e, i) => {
        let keyValue = ''
        let objVal = ''       

        if(e.target.type === 'select-one') {              
            keyValue = e.target.previousSibling.value                                    
            objVal = {
                [keyValue]: e.target.value
            }
        }   
        if(e.target.type === 'text'){
            keyValue = e.target.parentElement.childNodes[0].value            
            objVal = {
                [keyValue]:e.target.value 
            }
        }   
                

        const newVal = datas.conditions.splice(i, 1, objVal)
        setDatas({...datas, newVal  })                     

                   
    }
    
    const handleNext = (e) => {
        if (state === "choose program") {
            setProgramname(e.target.value)
        }
    }
    function handleAdd(e) {    
        // e.preventDefault()    
        const values = [...fields];        
        values.push({ value: null });
        setFields(values);
     
        
        // let newVal = value.push([])
        // setValue([...value, newVal])
    }
    function handleRemove(i) {
      

        const values = [...fields];
        values.splice(i, 1);
        setFields(values);

        let newVal = value.splice(i, 1)
        setValue([...value, newVal])
    }

    const handleDateNo = (e) => {
        if(e.target.checked === true){
            document.getElementById('endDate').style.display = 'none'
            document.getElementById('endDateYescheck').checked = false
        }          
    }

    const handleDateYes = (e) => {
        if(e.target.checked === true){
            document.getElementById('endDate').style.display = 'block'
            document.getElementById('endDateNocheck').checked = false
        } else{
            document.getElementById('endDate').style.display = 'none'
            document.getElementById('endDateNocheck').checked = true                        
        }            
    }

    // const getPlaceHolder = (e) => {
    //     let placeholder  = e.target.parentElement.children[0].value === 'greater than' ? 'Enter Value' : 'Enter Email'
    //     return placeholder
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        // if(datas.startingDate){
        //     const date = new Date(datas.startingDate)
        //     const dates = `${date.getDate()}-${date.getMonth()+1 }-${date.getFullYear()}`
        //     setDatas({
        //         startingDate:dates
        //     })
        // }
      
        
                            axios({
                                headers: { 
                                    'Content-Type': 'application/json',

                                  },
                                  withCredentials:true,
                                method: 'POST',
                                url: '/coupon/add-single-coupon-multi',
                                data:datas, 


                            })


                             .then((responses) => {
                                //  setDatamessage(responses.data)

                                 console.log(responses)
                                 if(responses.data){
                                     setDisplay(false)
                                     setModal(false)
                                     toast.success("Coupon created successfully!",{
                                        position:toast.POSITION.BOTTOM_RIGHT
                                     })
                                     
                                 }
                             })
                             .catch(err=>
                                {
                                    console.log(err.message)                   
                                    console.log(JSON.parse(err.request.response))
                                    setParams(JSON.parse(err.request.response))
                                } )


    }

  
    const handleReturn = (i) => {
        if (state) {

        }
    }
    //  const handleCourse=(e)=>{
    //      setCoursename(e.target.value)
    //     const course = allcourse.find(ele => ele.name === e.target.value)     
    //     const plan1 = course.plan1
    //     const plan2 = course.plan2
    //     const plan3 = course.plan3   
    //     setPlans([plan1, plan2, plan3])
    //  }
    //  const handleProgram=(e)=>{


    //     const data=e.target.value
    //     setProgramname(data)
    //     axios.get(`/course/get-all-course_name/${data}`)
    //     .then((response)=>{            
    //         setAllcourse(response.data.allCourse)                                 
    //     })
    // }

    // const handlePlan=(e)=>{
    //    const plandata= e.target.value

    // setPrice(e.target.value)
    // if(plandata >= 4000 && plandata < 7000){
    //     setHolder("Max Discount 1200")
    // }else if(plandata >= 7000 && plandata < 10000){
    //     setHolder("Max Discount 2700")
    // }else if(plandata >=10000){
    //     setHolder("Max Discount 4300")
    // }

    // }

    // const errorfun = () =>{

    //     if(price <  4000){
    //          toast.error("No Discount Applicable",{
    //              position:toast.POSITION.BOTTOM_RIGHT
    //          })
    //     }if(price >= 4000 && price < 7000 ){
    //            if(cost > 1200){
    //             toast.info("Please Enter Amount Less than 1200",{
    //                 position:toast.POSITION.BOTTOM_RIGHT
    //             })
    //            }

    //     }if(price >= 7000 && price < 10000){
    //         if(cost > 2700){
    //             toast.info("please Enter Amount Less than 2700",{
    //                 position:toast.POSITION.BOTTOM_RIGHT
    //             })
    //         }     
    //     }if(price >=  10000){
    //         if(cost > 4300){
    //             toast.info("please Enter Amount Less than 4300",{
    //                 position:toast.POSITION.BOTTOM_RIGHT
    //             })
    //         }
    //     }
    // }
    //     const  handleSubmit = async(e)=>  {
    //     e.preventDefault()
    //      if(progarmname == "" || coursename == "" || cost == "" ){
    //             setValidate("Please enter all the fields")
    //      }
    //      const isValid = errorfun()


    //                         axios({
    //                             headers: { 
    //                                 'Content-Type': 'application/json',

    //                               },
    //                               withCredentials:true,
    //                             method: 'POST',
    //                             url: '/coupon/add-single-coupon',
    //                             data:{
    //                                 discount:cost,
    //                                 courseName:coursename,
    //                                 programName:progarmname,
    //                                 price:price,
    //                                 forEmail:email,

    //                             }, 


    //                         })


    //                          .then((responses) => {
    //                              setDatamessage(responses.data)


    //                              if(responses.data){
    //                                  setDisplay(false)
    //                                  setModal(false)
    //                                  toast.success("Coupon created successfully!",{
    //                                     position:toast.POSITION.BOTTOM_RIGHT
    //                                  })
    //                                  setMail("")
    //                                  setProgramname("")
    //                                  setCoursename("")
    //                                  setCost("")
    //                                  setPlantype("")
    //                                  setHolder("")
    //                                  setPrice("")
    //                              }
    //                          })
    //                          .catch(err=>
    //                             {
    //                                 console.log(err.message)                   

    //                             } )


    // }
    // const handlePrice=(e)=>{
    //     const data=e.target.value
    //     setCost(e.target.value)
    //     if(holder === "Max Discount 1200" && data > 1200){
    //         document.getElementById("1").style.border="1px solid red"
    //     }else if(holder === "Max Discount 2700" && data > 2700){
    //         document.getElementById("1").style.border="1px solid red"      
    //     }else if(holder === "Max Discount 4300" && data > 4300){
    //         document.getElementById("1").style.border="1px solid red"      
    //     }else{
    //         document.getElementById("1").style.border="none"
    //     }


    // }

    if (display) {
        return (
            <div className="modal-wrapper">
                <div className="modal-backdrop" >
                    <ToastContainer />

                    <div className="boxmodal">

                        <div className="container-1">
                            <h1 onClick={close}>X</h1>
                            <p>Add a new coupon</p>
                        </div>

                        {/* <form className="form-css" onSubmit={handleSubmit}>
                             <div className="inputcss">
                             <select className="input"  onChange={handleProgram}>
                           
                           <option >Choose Program</option>
                           <option value="Internship">Internship</option>
                           <option value="ECP">Extra Curricular Program</option>
                           <option value="Job Gurantee">Job Gurantee</option>
                           <option value="Certification">Certification</option>
                           <option value="Kid">Kid</option>
                       </select>
                       <select className="input"  onChange={handleCourse}>
                           
                           <option >Course Name</option>
                           { allcourse && allcourse.map((ele,i)=>{
                               return(
                                   <option key={i}>{ele.name}</option>
                               )
                           })}
                           
                       </select>
                       <select className="input" onChange={handlePlan}>
                           
                           <option >Choose Plan</option>
                                {plans && plans.map((ele,i)=>{
                                  return(
                                      <option key={i}>{ele.price}</option>
                                  )
                              })}
                       </select>
                       <input className="input" id="1" placeholder={holder && holder || discount } value={cost} onChange={handlePrice}/>
                       <input className="input" placeholder="Enter customer Email" value={email} required onChange={(e)=>setMail(e.target.value)}/>
                            <div>
                                <p style={{color:"red"}}>{validate}</p>
                            </div>
                             </div>
                             <div className="inputcss1">
                                    <button>Draft</button>
                                    <button id="confirm">Confirm</button>
                             </div>
                           
                         </form> */}

                        <form className="form-css" onSubmit={(e) => handleSubmit(e)}>
                            <div className="inputcss">
                                <label>Coupon code</label>
                                <input className="input" name="couponCode" onChange={handleChange} type="text" required  />
                                <label>Coupon purpose</label>
                                <input className="input" name="couponPurpose" onChange={handleChange} type="text"  required  />
                                <label>Discount percentage</label>
                                <div className="inputcheckbox">
                                    <input type="checkbox" className="checkBox" id="discountCheckYes" name="true" value="true" onChange={handleCheckboxone} />
                                    <label className="checklabel">Yes</label>
                                    <input type="checkbox" className="checkBox" id="discountCheckNo" name="byDicountPerc" value="false" onChange={handleCheckboxtwo} onFocus={handleChange}/>
                                    <label className="checklabel" >No</label>
                                </div>
                                <div hidden={checkmodalone}>
                                    <label >If yes,how much is your percent?</label>
                                    <input className="input" name="discount_perc" onChange={handleChange}  type="text"  />
                                </div>                                
                                <div hidden={checkmodaltwo}>
                                    <label >If no,What is the flat discount?</label>
                                    <input className="input" name="discount_money" onChange={handleChange} type="text"  />
                                </div>
                                
                                <label hidden={checkmodalone}>Maximum Discount</label>
                                <div className="inputcheckbox" hidden={checkmodalone}>
                                    <input type="checkbox" className="checkBox" id="MaxdiscountCheckYes" name="true" onChange={handleDiscountYes} />
                                    <label className="checklabel">Yes</label>
                                    <input type="checkbox" className="checkBox" id="MaxdiscountCheckNo" value="false" onChange={handleDiscountNo} />
                                    <label className="checklabel" name="false" >No</label>
                                </div>
                                <div hidden={cmone} >
                                    <label >Discount</label>
                                    <input className="input" name="maxDiscount" onChange={handleChange}  type="text"  />
                                </div>                                
                                <label>Coupon usage limit</label>
                                <div className="inputcheckbox">
                                    <input type="checkbox" className="checkBox" id="couponUsageCheckYes" name="true" onChange={handleCouponYes} />
                                    <label className="checklabel">Yes</label>
                                    <input type="checkbox" className="checkBox" id="couponUsageCheckNo" name="false" onChange={handleCouponNo} />
                                    <label className="checklabel">No</label>
                                </div>
                                <div hidden={couponlimit}>
                                    <label>If yes,what is the number</label>
                                    <input className="input" name="limitedTo"  onChange={handleChange} type="text"  />
                                </div>                                                                
                                    <label>Starting Date</label>
                                    <input className="input"  name="startingDate" id="startingDate" onChange={handleChange} type="date"  />
                                    <label>Ending Date</label>
                                <div className="inputcheckbox">
                                    <input type="checkbox" className="checkBox" id="endDateYescheck" onChange={(e) => handleDateYes(e)}/>
                                    <label className="checklabel">Yes</label>
                                    <input type="checkbox" className="checkBox" id="endDateNocheck" onChange={(e) => handleDateNo(e)}/>
                                    <label className="checklabel">No</label>
                                </div>
                                
                                <input className="input" id="endDate" type="date" name="dateOfExpiry" onChange={handleChange}  />
                                <label>condition</label>
                            </div>
                            <div className="select">
                                <div style={{ width: "95%" }}>
                                    {fields.map((field, i) => {
                                        return (
                                            <div className="selectdivsion" style={{display:"flex",width:"100%"}}>
                                                <select className="inputs" id="chooseProgSelect1" onChange={(e) => handleSelect(e, i)} >
                                                    <option>choose</option>
                                                    <option name="forProgram">forProgram</option>
                                                    <option name="forCourse">forCourse</option>
                                                    <option name="forEmail">forEmail</option>
                                                    <option name="greaterThan">greaterThan</option>
                                                    <option name="lesserThan">lesserThan</option>
                                                    <option name="equalTo">equalTo</option>
                                                </select>
                                                
                                                <select className="input" id="chooseProgSelect"  onChange={(e) => handleChangetwo(e, i)}>                                                    
                                                    {value.length > 0  && value[0].length !== 0 ? value[i].map((ele, i) => {                                                        
                                                        return ele ? 
                                                                    <option key={i} >{ele}</option> :
                                                                      <option>choose</option>
                                                        
                                                        // return ele.length > 1 ?               
                                                        //     <option key={i}>{ele}</option>                                              
                                                        //     <option>choose</option>
                                                    }) :
                                                        <option>choose</option>
                                                    }                                                    
                                                </select>
                                                <input className="input" id="chooseProgInput" hidden ={true} onChange={(e) => handleChangetwo(e, i)}/>
                                                <p  style={{ width: '25%', fontSize: '25px', paddingTop: '5px', textAlign: 'center', cursor: 'pointer'}}onClick={() => handleRemove(i)}>x</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div style={{    marginBottom: '57px'}}>
                                    <p style={{ width: '25%', fontSize: '25px', paddingTop: '5px', textAlign: 'center', cursor: 'pointer'}} type="button" name="add"onClick={()=>{handleAdd()}}>+</p>
                                </div>
                            </div>    
                            {message && <p style={{color:"red"}}>{message}</p>}
                            <div className="SubmitBtnDiv">
                                <button type="submit" name="submit" id="SubmitBtn">Add Coupon</button>
                            </div>                       
                        </form>
                    </div>


                </div>

            </div>
        )
    }
    return <ToastContainer />


}

export default Addcoupon;


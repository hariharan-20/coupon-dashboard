import React, { useContext, useState, useEffect, useCallback } from 'react'
import { Globalcontext } from '../../context/Reducers/Provider'
import axios from "axios"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify"
import "./editcoupon.scss"
import e from 'cors'


function Editcoupon() {

    const { EditValue } = useContext(Globalcontext)
    const { Edit } = useContext(Globalcontext)
    const { View } = useContext(Globalcontext)

    const [viewmodal, setViewmodal] = View
    const [EditDatas, setEditDatas] = EditValue
    const [editmodal, setEditmodal] = Edit
    const [display, setDisplay] = useState()
    // const [coursename, setCoursename] = useState("")
    // const [plans, setPlans] = useState()
    // const [progarmname, setProgramname] = useState("")
    // const [allcourse, setAllcourse] = useState()
    // const [plantype, setPlantype] = useState("")
    // const [price, setPrice] = useState()
    const [id, setId] = useState()
    // const [cost, setCost] = useState()
    // const [email, setMail] = useState()
    // const [validate, setValidate] = useState("")
    // const [progArr,setProgarr] = useState([ 'Internship',"Extra Curricular Program", 'Job Gurantee', 'Certification',"Kid"])
    // const[select,setSelect]=useState(true)
    // const[select2,setSelect2]=useState(true)
    // const[select3,setSelect3]=useState(true)
    const { modals } = useContext(Globalcontext)
    const [modal, setModal] = modals;
    // const [choose]=useState("Choose Your Course")
    // const [type]=useState("Choose Your Plan")
    // const[pro]=useState("Choose Your Program")
    // const[a,setA]=useState("")
    // const[holder,setHolder]=useState("")
    //  const[discount]=useState("Discount")

    //new
    const [programs] = useState(['Internship', 'Extra Curricular Program', 'Job Gurantee', 'Certification', 'Kid'])
    const [courses, setCourses] = useState([])
    const [selectionone, setSelectionone] = useState(["forProgram", "forCourse", "forEmail", "greaterThan", "lesserThan", "equalTo"])
    const [coursemap, setCoursemap] = useState([])
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

    const [valuetwo, setValuetwo] = useState()
    const [state, setState] = useState()
    const [fields, setFields] = useState([{ value: null }]);
    const [statetwo, setStatetwo] = useState([])
    const [type, setType] = useState()
    const [types, setTypes] = useState()
    const [index, setIndex] = useState()
    const [sd, setSd] = useState()
    const [sds, setSds] = useState()
    const [params, setParams] = useState()
    const [message, setMessage] = useState()
    const [value, setValue] = useState([])
    const [arr, setArray] = useState([])
    const [keys, setKeys] = useState()
    const [keyval, setKeyval] = useState()
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
        discount_perc: "",
        conditions: []

    })

    useEffect(() => {
        editmodal && setDisplay(true)


        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                close()
            }
        });
        if (params) {
            console.log(Object.values(params)[0].message)
            // window.alert(Object.values(params)[0].message)
            setMessage(Object.values(params)[0].message)
            setTimeout(() => {
                setMessage("")
            }, 3000)
        }
        axios.get(`/course/get-all-course`)
            .then((response) => {
                {
                    response.data.allCourse.map((ele) => {
                        coursemap.push(ele.name)
                    })
                }
                setCourses(coursemap)

            })
        if (EditDatas) {
            setId(EditDatas._id)
            console.log(EditDatas, "qwerty")
            setDatas({
                couponCode: EditDatas.couponCode,
                couponPurpose: EditDatas.couponPurpose,
                byDiscountPerc: EditDatas.byDiscountPerc,
                discount_money: EditDatas.discount_money,
                discountLimit: EditDatas.discountLimit,
                maxDiscount: EditDatas.maxDiscount,
                startingDate: EditDatas.startingDate,
                dateOfExpiry: EditDatas.dateOfExpiry,
                limitedTo: EditDatas.limitedTo,
                discount_perc: EditDatas.discount_perc,


            })
            // setValue(EditDatas.validFor)
            { EditDatas.validFor && fun(EditDatas.validFor) }
            {
                EditDatas.startingDate &&
                    callfun(EditDatas.startingDate);

            }

            {
                EditDatas.dateOfExpiry &&
                    callfuns()

            }
        }
        { arr && funone() }

    }, [editmodal, EditDatas, params])
    const funval = (value) => {

        const val = document.getElementById('chooseProgSelect1').value
        console.log(val, "----------------")
        return value
    }
    const fun = (arr) => {
        console.log(arr, "sdasd")
        let newObj = []
        // let newObj = {
        //     forProgram:[],
        //     forCourse:[],
        //     forEmail:[],
        //     greaterThan:[],
        //     equalTo:[],
        //     lesserThan:[]
        // };

        for (let no = 0; no < arr.length; no++) {
            let conditionArr = arr[no];
            if (conditionArr[0] == 'forProgram') {
                newObj.push({ 'forProgram': conditionArr[1] });
            } else if (conditionArr[0] == 'forCourse') {
                newObj.push({ 'forCourse': conditionArr[1] });
            } else if (conditionArr[0] == 'forEmail') {
                newObj.push({ 'forEmail': conditionArr[1] });
            } else if (conditionArr[0] == 'greaterThan') {
                newObj.push({ 'greaterThan': conditionArr[1] });
            } else if (conditionArr[0] == 'equalTo') {
                newObj.push({ 'equalTo': conditionArr[1] });
            } else if (conditionArr[0] == 'lesserThan') {
                newObj.push({ 'lesserThan': conditionArr[1] });
            }
        }
        console.log(newObj, "poiuy")
        setArray(newObj)
        setDatas(data => {
            data.conditions = newObj
            return data
        })

    }
    // console.log(Object.values(arr),"krish")
    // console.log(Object.keys(arr),"krish")

    const funone = () => {
        // if(arr){

        //     let a = []

        // {arr.map((ele) =>{
        //     a.push(Object.keys(ele))
        //     setKeys(a)
        // })

        // console.log(a)
        // }}
        // if(arr){
        //     let b =[]
        //     {arr.map((ele) =>{
        //         b.push(Object.values(ele))
        //         setKeyval(b)
        //     })
        //     console.log(b)}
        // }
    }

    const callfun = (value) => {
        if (EditDatas.startingDate) {
            const curr = new Date(value)

            console.log(`${curr.getDate()}-${curr.getMonth() + 1}-${curr.getFullYear()}`)
            setSd(`${0 + curr.getDate()}-${0 + curr.getMonth() + 1}-${curr.getFullYear()}`)

        }
    }
    const callfuns = () => {
        // const curr = new Date(EditDatas.startingDate)
        // console.log(curr.setDate(curr.getDate()))
        // curr.setDate(curr.getDate());
        // setSd(curr.toISOString().substr(0,10))
    }
    const close = () => {
        setDisplay(false)
        setEditmodal(false)
        // setCost("")
    }
    const handleChange = (e) => {
        setDatas({
            ...datas,
            [e.target.name]: e.target.value
        })

    }
    function handleRemoved(i) {


        const values = [...fields];
        values.splice(i, 1);
        setFields(values);

        let newVal = value.splice(i, 1)
        setValue([...value, newVal])
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
        if (e.target.checked === true) {
            setCmone(true)
            setCmvalue(true)
            document.getElementById('MaxdiscountCheckYes').checked = false
        }
    }

    const handleCouponYes = (e) => {
        if (e.target.checked === true) {
            setCouponlimit(false)
            setLimitone(false)
            document.getElementById('couponUsageCheckNo').checked = false

        } else {
            setCouponlimit(true)
            setLimitone(true)
        }
    }

    const handleCouponNo = (e) => {
        if (e.target.checked === true) {
            setCouponlimit(true)
            setLimitone(true)
            document.getElementById('couponUsageCheckYes').checked = false
        }
    }

    const handleSelect = () => {

    }
    const handleSelected = (e, index) => {

        if (e.target.value === "forProgram") {
            document.getElementsByClassName('selectdiv')[index].childNodes[1].hidden = false
            document.getElementsByClassName('selectdiv')[index].childNodes[2].hidden = true

            let newVal = value.splice(index, 1, programs)
            setValue([...value, newVal])

            setType("select")
        }
        if (e.target.value === "forCourse") {
            document.getElementsByClassName('selectdiv')[index].childNodes[1].hidden = false
            document.getElementsByClassName('selectdiv')[index].childNodes[2].hidden = true

            let newVal = value.splice(index, 1, courses)
            setValue([...value, newVal])


        }
        if (e.target.value === "forEmail") {
            document.getElementsByClassName('selectdiv')[index].childNodes[1].hidden = true
            document.getElementsByClassName('selectdiv')[index].childNodes[2].hidden = false
            document.getElementsByClassName('selectdiv')[index].childNodes[2].placeholder = 'Enter Email'

            let newVal = []
            setValue([...value, newVal])
        }
        if (e.target.value === "greaterThan") {
            document.getElementsByClassName('selectdiv')[index].childNodes[1].hidden = true
            document.getElementsByClassName('selectdiv')[index].childNodes[2].hidden = false
            document.getElementsByClassName('selectdiv')[index].childNodes[2].placeholder = 'Enter value'

            let newVal = []
            setValue([...value, newVal])
        }
        if (e.target.value === "lesserThan") {
            document.getElementsByClassName('selectdiv')[index].childNodes[1].hidden = true
            document.getElementsByClassName('selectdiv')[index].childNodes[2].hidden = false
            document.getElementsByClassName('selectdiv')[index].childNodes[2].placeholder = 'Enter value'

            let newVal = []
            setValue([...value, newVal])
        }
        if (e.target.value === "equalTo") {
            document.getElementsByClassName('selectdiv')[index].childNodes[1].hidden = true
            document.getElementsByClassName('selectdiv')[index].childNodes[2].hidden = false
            document.getElementsByClassName('selectdiv')[index].childNodes[2].placeholder = 'Enter value'

            let newVal = []
            setValue([...value, newVal])
        }
    }
    const handleChangetwo = (e, i) => {
        let keyValue = ''
        let objVal = ''

        if (e.target.type === 'select-one') {
            keyValue = e.target.previousSibling.value
            objVal = {
                [keyValue]: e.target.value
            }
        }
        if (e.target.type === 'text') {
            keyValue = e.target.parentElement.childNodes[0].value
            objVal = {
                [keyValue]: e.target.value
            }
        }


        const newVal = datas.conditions.push(objVal)
        // const oldVal = arr.splice(i,1,objVal)
        setDatas({ ...datas, newVal })
        // let oldVal = [arr]
        // i > arr.length-1 ?
        //         oldVal.splice(i,1,objVal) :
        //         oldVal.push(objVal)


        // setArray({...arr,oldVal})
        // setDatas({...datas,oldVal})

    }
    console.log(datas.conditions, "final value")


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
        console.log(datas)
        axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            url: `/coupon/update-single-coupon-multi/${id}`,
            data: datas,
        })
            .then((responses) => {
                console.log(responses.data)
                if (responses.data) {
                    setDisplay(false)
                    setEditmodal(false)
                    toast.success("Coupon Updated successfully!", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                    setModal()


                }
            })
            .catch(err => {
                console.log(err.message)
                setParams(JSON.parse(err.request.response))
            })
    }

    function handleAdd(e) {
        // e.preventDefault()    
        const values = [...fields];
        values.push({ value: null });
        setFields(values);


        // let newVal = value.push([])
        // setValue([...value, newVal])
    }
    const handleRemove = (idx) => {

        console.log(idx, 'clicked')
        const values = [...datas.conditions];
        values.splice(idx, 1);
        setDatas(data => {
            data.conditions = values
            return data
        })
        const val = [...arr]
        val.splice(idx, 1)
        setArray(val)
        console.log(values, 'value')
        // datas.conditions.splice(idx, 1)
        console.log(datas.conditions)
        console.log(fields)
        // let newVal = value.splice(i, 1)
        // setValue([...value, newVal])
    }

    const handleDateNo = (e) => {
        if (e.target.checked === true) {
            document.getElementById('endDate').style.display = 'none'
            document.getElementById('endDateYescheck').checked = false
        }
    }

    const handleDateYes = (e) => {
        if (e.target.checked === true) {
            document.getElementById('endDate').style.display = 'block'
            document.getElementById('endDateNocheck').checked = false
        } else {
            document.getElementById('endDate').style.display = 'none'
            document.getElementById('endDateNocheck').checked = true
        }
    }
    const handleUpdate = (e, i) => {
        console.log(e.target.value, i)
        let keyValue = ''
        let objVal = ''

        keyValue = e.target.parentElement.previousSibling.childNodes[0].value
        objVal = {
            [keyValue]: e.target.value
        }

        datas.conditions.splice(i, 1, objVal)

        console.log(datas.conditions, "xxxx")
    }

    console.log(datas.conditions, "12345")
    if (display) {

        return (
            <div className="modal-wrapper">
                <div className="modal-backdrop">
                    <ToastContainer />
                    <div className="box-m">
                        <div className="container-1">
                            <h1 onClick={() => { close() }}>X</h1>
                            <p>Edit your coupon</p>
                        </div>

                        <form className="form-css" onSubmit={(e) => handleSubmit(e)}>
                            <div className="inputcss">
                                <label>coupon code</label>
                                <input className="input" name="couponCode" defaultValue={EditDatas.couponCode} disabled={true} type="text" placeholder=" Enter coupon code" />
                                <label>coupon purpose</label>
                                <input className="input" name="couponPurpose" defaultValue={EditDatas.couponPurpose} onChange={handleChange} type="text" placeholder="coupon purpose" />
                                <label>Discount percentage</label>
                                <div className="inputcheckbox">
                                    <input type="checkbox" className="checkBox" id="discountCheckYes" name="true" value="true" onChange={handleCheckboxone} />
                                    <label className="checklabel">Yes</label>
                                    <input type="checkbox" className="checkBox" id="discountCheckNo" name="byDicountPerc" value="false" onChange={handleCheckboxtwo} onFocus={handleChange} />
                                    <label className="checklabel" >No</label>
                                </div>
                                <div hidden={checkmodalone}>
                                    <label >If yes,how much is your percent?</label>
                                    <input className="input" defaultValue={EditDatas.discount_perc && EditDatas.discount_perc} name="discount_perc" onChange={handleChange} placeholder="discount amount" type="text" />
                                </div>
                                <div hidden={checkmodaltwo}>
                                    <label >If no,What is the flat discount?</label>
                                    <input className="input" name="discount_money" onChange={handleChange} placeholder="flat amount" type="text" />
                                </div>

                                <label>Maximum Discount</label>
                                <div className="inputcheckbox">
                                    <input type="checkbox" className="checkBox" id="MaxdiscountCheckYes" name="true" onChange={handleDiscountYes} />
                                    <label className="checklabel">Yes</label>
                                    <input type="checkbox" className="checkBox" id="MaxdiscountCheckNo" value="false" onChange={handleDiscountNo} />
                                    <label className="checklabel" name="false" >No</label>
                                </div>
                                <div hidden={cmone} >
                                    <label >Discount</label>
                                    <input className="input" name="maxDiscount" onChange={handleChange} defaultValue={EditDatas.maxDiscount} placeholder="max discount" type="text" />
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
                                    <input className="input" name="limitedTo" placeholder="coupon limit" onChange={handleChange} defaultValue={EditDatas.limitedTo} type="text" />
                                </div>
                                <label>Starting Date-{sd && sd}</label>
                                <input className="input" name="startingDate" id="startingDate" onChange={handleChange} type="date" />
                                <label>Ending Date</label>
                                <div className="inputcheckbox">
                                    <input type="checkbox" className="checkBox" id="endDateYescheck" onChange={(e) => handleDateYes(e)} />
                                    <label className="checklabel">Yes</label>
                                    <input type="checkbox" className="checkBox" id="endDateNocheck" onChange={(e) => handleDateNo(e)} />
                                    <label className="checklabel">No</label>
                                </div>


                                <input className="input" id="dateOfExpiry" type="date"  name="dateOfExpiry" onChange={handleChange} />
                                <label>Recent Conditions</label>
                                {EditDatas.validFor.map((ele) => {
                                    return (
                                        <li>{ele}</li>
                                    )
                                })}

                                <label>condition</label>
                            </div>
                            <div className="select">
                                {/* <div style={{ width: "80%",display:"flex",flexDirection:"row" }}> */}
                                {/* {fields.map((field, i) => {
                                        return ( */}
                                <div className="selectdivv">
                                    {arr.map((ele, idx) => {

                                        return (

                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                <div style={{ flexDirection: "column", width: "50%" }}>

                                                    {<select key={idx} className="inputs" onChange={(e) => handleSelect(e, idx)}>
                                                        <option>{Object.keys(ele)}</option>
                                                        {/* {selectionone.map((selectOne, i) => {
                                                            return (
                                                                <option key={i} value={selectOne} name={selectOne}>{selectOne}</option>
                                                            )
                                                        })} */}
                                                    </select>
                                                    }


                                                </div>
                                                <div style={{ flexDirection: "column", width: "50%" }}>
                                                    {Object.keys(ele).map((type, index) => {
                                                        return (type === 'forEmail' ||
                                                            type === 'greaterThan' ||
                                                            type === 'equalTo' ||
                                                            type === 'lesserThan') ?
                                                            <input key={index} className="inputs" placeholder={Object.values(ele)[0]} onChange={(e) => handleUpdate(e, idx)} /> :
                                                            <select key={index} className="inputs"  onChange={(e) => handleUpdate(e, idx)}>
                                                                <option>{Object.values(ele)}</option>
                                                                {type === 'forProgram' && programs.map((selectVal, i) => {
                                                                    return (
                                                                        
                                                                        <option key={i} name={selectVal} value={selectVal}>{selectVal}</option>
                                                                    )
                                                                   
                                                                })}
                                                                {type === 'forCourse' && courses.map((selectVal, i) => {
                                                                    return <option key={i} name={selectVal} value={selectVal}>{selectVal}</option>
                                                                })}
                                                            </select>
                                                    })}

                                                </div>
                                                <p style={{ cursor: "pointer", marginTop: "13px" }} onClick={() => handleRemove(idx)}>X</p>
                                            </div>


                                        )
                                    })}

                                </div>
                                {/* ) */}
                                {/* })} */}


                            </div>
                            {/* </div> */}
                            
                                <div className="select" > 
                                          <div style={{width:"85%"}}>
                                    {fields.map((field, i) => {
                                        return (
                                            <div className="selectdiv">                                         
                                                <select className="inputs" id="chooseProgSelect1" onChange={(e) => handleSelected(e, i)} >
                                                    <option>choose</option>
                                                    <option name="forProgram">forProgram</option>
                                                    <option name="forCourse">forCourse</option>
                                                    <option name="forEmail">forEmail</option>
                                                    <option name="greaterThan">greaterThan</option>
                                                    <option name="lesserThan">lesserThan</option>
                                                    <option name="equalTo">equalTo</option>
                                                </select>                                            
                                                <select className="inputs" id="chooseProgSelect" onChange={(e) => handleChangetwo(e, i)}>
                                                    {value.length > 0 && value[0].length !== 0 ? value[i].map((ele, i) => {
                                                        return ele ?
                                                            <option key={i} >{ele}</option> :
                                                            <option>choose</option>
                                                    }) :
                                                        <option>choose</option>
                                                    }
                                                </select>                                            
                                                <input className="input" id="chooseProgInput" hidden={true} onChange={(e) => handleChangetwo(e, i)} />                                            
                                                <p style={{ width: '25%', fontSize: '25px', paddingTop: '5px', textAlign: 'center', cursor: 'pointer'}} onClick={() => handleRemoved(i)}>x</p>                                             
                                            </div>
                                        )
                                    })} 
                                    </div>  
                                    <div>
                                                                       
                                        <p style={{width: '25%', fontSize: '25px', paddingTop: '5px', textAlign: 'center', cursor: 'pointer'}} type="button" name="add" onClick={() => { handleAdd() }}>+</p>                                    
                                </div>
                                </div> 

                           

                            {message && <p style={{ color: "red" }}>{message}</p>}
                            <div className="SubmitBtnDiv">
                                <button type="submit" name="submit" id="SubmitBtn">Update Coupon</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    return <ToastContainer />
}

export default Editcoupon

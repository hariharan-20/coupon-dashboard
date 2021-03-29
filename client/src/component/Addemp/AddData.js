import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { Globalcontext } from '../../context/Reducers/Provider'
import AddEmployee from "./Addemp"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
export const AddData = () => {
    const title = "Add new Employee"
    const [value, setValue] = useState({
        email: ''.trim().toLowerCase(),
        userType: ''
    })
    const [email, setEmail] = useState('')
    const [department, setDepartment] = useState('')
    const {Empedit} =useContext(Globalcontext)
    const [empedit, setEmpedit] = Empedit
    const { addEmpModal } = useContext(Globalcontext)
    const [addModal, setAddEmpModal] = addEmpModal
    const {modals}=useContext(Globalcontext)
    const[modal,setModal]=modals;
    const[name,setName]=useState('')

    const handleClose = () => {
        setAddEmpModal(false)
        setEmail('')
        setDepartment('')
        setName('')
    }

    const handleChange = (e, ele) => {
        if (e.target.name === "Email") {
            setEmail(email => {
                email = e.target.value
                return email
            })
        }
        if (e.target.name === "Department") {
            setDepartment(dept => {
                dept = e.target.value
                return dept
            })
        }if (e.target.name === "name") {
            setName(name => {
                name = e.target.value
                return name
            })
        }


    }
    const onSubmit = (e) => {
        e.preventDefault()        
        if (email !== '' || department !== '' || name !== '') {
            
            axios({
                url:"/employee/add-a-user",
                method:"post",
                data:{
                    name:name,
                    forEmail: email,
                    forUserType: department
                }
            })
                .then(res => {                    
                    handleClose()
                    setAddEmpModal()
                    setEmpedit()
                    setModal()
                    toast.success(`${res.data.msg}`, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                })
                .catch(err => console.log(err.message))
        }
    }

    const [inputs, setInputs] = useState([
        {
            type: 'input',
            name: 'name',
            placeholder: 'Enter user Name',
            value: name,
            onChange: handleChange

        },
        {
            type: 'input',
            name: 'Email',
            placeholder: 'Enter user Email',
            value: email,
            onChange: handleChange

        },
        {
            type: 'select',
            name: 'Department',
            default: 'Choose user Department',
            options: ["Choose Department", "admin", "technical", "hr", "operation", "business_development","super_admin"],
            value: department,
            onChange: handleChange
        },



    ])
    const [buttons, setButtons] = useState([
        {
            type: 'submit',
            name: 'Save'
        },
        {
            type: 'reset',
            name: 'Cancel'
        },

    ])
    
    if (addModal) {
        return (
            <>
                <AddEmployee
                    title={title}
                    inputs={inputs}                    
                    buttons={buttons}                
                    handleClose={handleClose}
                    onSubmit={onSubmit}
                />
                <ToastContainer />
            </>
        );
    }
    return null
}
export default AddData
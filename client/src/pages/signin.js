import React, { useState, useEffect } from 'react'
import { Globalcontext } from '../../src/context/Reducers/Provider'
import { useHistory } from 'react-router'
import axios from 'axios'
import FormModal from '../component/FormModal/FormModal'
// import { Globalcontext } from '../context/Reducers/Provider';
import { Redirect } from "react-router-dom"
const Signin = () => {
    const history = useHistory()
    const [users, setUsers] = useState()
    const [params,setParams] = useState()
    const [message,setMessage] =useState()
    const [values, setValues] = useState({
        email: ''.trim().toLowerCase(),
        password: ''.trim(),
    })
    const[isLoading,setLoading]=useState(false)
    useEffect((res) => {

        axios.post("/authenticate/login")
            .then(res => {
            })
            .catch(err => {
                setUsers(err.response.status)
                if (err.response.status === 403) {
                    history.push({
                        pathname: "/coupon/couponTable"
                    })
                }
                // if (err.response.status === 400) {

                // }
            })
            if(params){
                console.log(Object.values(params)[0].message)
                // window.alert(Object.values(params)[0].message)
                setMessage(Object.values(params)[0].message)
                setTimeout(() =>{
                   setMessage("")
                },3000)
            }
    }, [params])
    const a = localStorage.getItem("name")
    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
      
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post('/authenticate/login', values)
            .then((res) => {
                setUsers(res.data.msg)
                setLoading(false)
                localStorage.setItem('name', res.data.userDetails.name)
                localStorage.setItem('type', res.data.userDetails.userType)
                history.push({
                    pathname: "/coupon/couponTable",
                })
            })
            .catch((err)=> {
                // if (err.res.response.status = 404) {
                //     console.log('user not found')
                // }
                console.log(JSON.stringify(err))
                console.log(err.response.status)
                console.log(JSON.parse(err.request.response))
                console.log(err.request)
                console.log(err.message)
                setParams(JSON.parse(err.request.response))
                


            })
    }

    const Inputs = [
        {
            name: 'email',
            placeholder: 'Email',
            value: values.email,
            type: 'email',
            onChange: handleInputChange,
            
        },
        {
            name: 'password',
            placeholder: 'Password',
            value: values.password,
            type: 'password',
            onChange: handleInputChange,
            id:"myInput"
        }
    ]

    return (
        <div>
            {users == 400 ?
                <FormModal
                    title='Welcome To Admin Dashboard'
                    Inputs={Inputs}
                    handleSubmit={handleSubmit}
                    isForgotPassDiv={false}
                    isLoginpage={true}
                    ButtonName={'Login'}
                    message={message}
                    loading={isLoading} />
                : null
            }
        </div>
    )
        }

export default Signin
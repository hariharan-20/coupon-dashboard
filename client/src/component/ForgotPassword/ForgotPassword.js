import React,{ useState,useEffect} from 'react'
import axios from 'axios'
import FormModal from '../FormModal/FormModal'

export const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [params,setParams] = useState('')
    const [message,setMessage] = useState('')
    const handleInputChange = (e) => {
        setEmail(e.target.value)
    }
    useEffect(()=>{
        if(params){
            // window.alert(Object.values(params)[0].message)
            setMessage(Object.values(params)[0].message)
            setTimeout(() =>{
               setMessage("")
            },3000)
        }
    },[params])
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/employee/forgot-password',{email: email})
        .then(res => {
            console.log(res)
            window.alert(res.data.msg)
        })
        .catch((err) => {
            console.log(err.message)
            setParams(JSON.parse(err.request.response))
        })
    }

    const Inputs = [
        {
            name: 'email',
            placeholder: 'Email',
            value: email,
            type: 'email',
            onChange: handleInputChange
        },
    ]
    return (
        <FormModal
            title='Forgot Password'
            subtitle='No worries, Enter your email address and we will send you a reset.' 
            Inputs={Inputs}
            handleSubmit={handleSubmit}
            isForgotPassDiv ={true}
            ButtonName={'Send Link'}
            message={message} />
    )
}

export default ForgotPassword
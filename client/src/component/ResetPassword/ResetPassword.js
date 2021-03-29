import React,{ useState,useEffect } from 'react'
import FormModal from '../FormModal/FormModal'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import "react-toastify/dist/ReactToastify.css"
import {ToastContainer,toast} from  "react-toastify"
export const ForgotPassword = () => {
    const history = useHistory()
    const [resetCode, setResetCode] = useState("")
    const [confirmCode,setConfirmcode]= useState("")
    const [details,setDetails]=useState()
    const [params,setParams]=useState()
    const [message,setMessage] =useState()
    const handleInputChange = (e) => {
        if(e.target.name === "resetCode"){
            setResetCode(e.target.value)
        } if(e.target.name === "confirmCode"){
            setConfirmcode(e.target.value)
        }
         
    }
    useEffect(() => {
       if(params){
        // window.alert(Object.values(params)[0].message) 
        setMessage(Object.values(params)[0].message)
            setTimeout(() =>{
               setMessage("")
            },3000)
       }
    }, [params])
  
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(resetCode,confirmCode)
        if(resetCode !== confirmCode){
            setDetails("Please Enter password correctly")            
        }
        else {
            const token = history.location.pathname.slice(7)

            axios.post('/employee/new-password', {
                password: resetCode,
                token: token
            })
            .then( res => {
                console.log(res.data.msg)
                history.push('/')
                toast.success(`${res.data.msg}`,{
                    position:toast.POSITION.BOTTOM_RIGHT
                 })
                 setParams(JSON.parse(res.data.msg))
            })
            .catch( (err) => {
                console.log(err.message)
                setParams(JSON.parse(err.request.response))
                console.log(err.response.status)
                if(err.response.status == "440"){
                    history.push('/forgotpassword')
                }
            })
        }
        console.log(details)
       
    }

    const Inputs = [
        {
            name: 'resetCode',
            placeholder: 'Enter Password',
            value: resetCode,
            type: 'text',
            onChange: handleInputChange
        },{
            name: 'confirmCode',
            placeholder: 'Confirm Password',
            value: confirmCode,
            type: 'password',
            onChange: handleInputChange,
            id:'myInput'
        }
    ]
    return (
        <>
        <FormModal
            title='Reset Password'
            subtitle={details}
            Inputs={Inputs}
            message={message}
            handleSubmit={handleSubmit}
            isForgotPassDiv ={true}
            ButtonName={'Submit Password'} />
            <ToastContainer/>
            </>
    )
}

export default ForgotPassword
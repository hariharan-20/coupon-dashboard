import React,{ useState } from 'react'
import FormModal from '../FormModal/FormModal'

export const ForgotPassword = () => {
    const [values, setvalues] = useState(
        { newPassword: '', confirmNewPassword: '' }
    )
    const handleInputChange = (e) => {
        setvalues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Reset New Password ')
    }

    const Inputs = [
        {
            name: 'newPassword',
            placeholder: 'New Password',
            value: values.newPassword,
            type: 'password',
            onChange: handleInputChange
        },
        {
            name: 'confirmNewPassword',
            placeholder: 'Confrim Password',
            value: values.confirmNewPassword,
            type: 'password',
            onChange: handleInputChange
        },
    ]
    return (
        <FormModal
            title='Reset Password'
            subtitle='Please create your new password' 
            Inputs={Inputs}
            handleSubmit={handleSubmit}
            isForgotPassDiv ={true}
            ButtonName={'Submit'} />
    )
}

export default ForgotPassword
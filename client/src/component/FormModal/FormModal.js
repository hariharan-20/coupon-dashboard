import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import formbgLogo from '../../assets/verzeo-logo.svg'
// import FromModalBg from '../../assets/form-modal-bg.svg'
import './FormModal.scss'

export const FormModal = (props) => {
    const history = useHistory()
    const textArr = ['View, update and create coupons', 'All in one place', 'Operate as admin and super admin']
    const [text, setText]= useState(textArr[0])
    const textTransictionClick =(e) => {        
        const index = textArr.indexOf(e.target.firstChild.data)
        setText(textArr[ index < 2 ? index+1 : 0])
    }
    const showfun = () =>{
        var x = document.getElementById("myInput").getAttribute("type")
        console.log(x)
        if (x == "password") {
          document.getElementById("myInput").getAttributeNode("type").value = "text"
            
        }else{
            document.getElementById("myInput").getAttributeNode("type").value = "password"
        }
      
    }
   
    return (
        <Container fluid className='SignInFormContainer'>
            <Row className="SignInFormRow">
                <Col className="LeftPanel SignInCol" md={6}>
                    <h3>{props.title}</h3>
                  
                    <Form onSubmit={(e) => props.handleSubmit(e)}>
                        {props.Inputs && props.Inputs.map((ele,i) => {
                            return <Form.Control name={ele.name} id={ele.id} placeholder={ele.placeholder} value={ele.value} type={ele.type} onChange={(e) => ele.onChange(e)} required />
                        })} 
                        <p style={{color:"red"}}>{props.message}</p>                       
                        <div className="ForgotPassDiv" hidden={props.isForgotPassDiv}>
                            <Form.Check label='Show Password'  onClick={showfun} />
                            <p>{props.subtitle && props.subtitle}</p>
                            <label className="ForgotLabel" onClick={() => history.push('/forgotPassword')}>Forgot Password?</label>
                        </div>

                        <Button type='submit'>{props.isLoading && <i className="fa fa-refresh fa-spin"></i>}{props.ButtonName}</Button>
                    </Form>
                </Col>
                <Col className="RightPanel SignInCol" md={6}>
                    {/* <div className="formbgLogo"></div> */}
                    <div className="formLogo"><img src={formbgLogo} /></div>                    
                    <div className="textTransiction" onClick={textTransictionClick}>{text}<span>.</span></div>
                </Col>
            </Row>
        </Container>
    )
}

export default FormModal
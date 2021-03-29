import React,{useState, useEffect, useCallback} from 'react'
import AddEmployee from "./Addemp"

export const Addcourse = () => {
    const title = "Add new Course"
    const [course, setCourse] = useState()  
    const[program,setProgram]=useState()
    const[plan,setPlan]=useState()
    console.log(email)  
    const handleChange=(e)=>{
        if(e.target.name="Course Name"){
              setCourse(e.target.value)
        }if(e.target.name ="Program Name"){
            setProgram(e.target.value)
        }if(e.target.name="Plans"){
           setPlan(e.target.value)
        }
    }
    const handleSubmit=(e)=>{
          
    }
    
        const [inputs, setInputs] = useState([
            {
                type: 'input',
                name: 'Course Name',
                placeholder: 'Enter Your Course Name',
                value:course
                
            },
            {
                type: 'select',
                name:'Program Name',             
                default: 'Choose Your Program',
                options:["Choose Department","Admin","Technical","HR","Operations","BD"],
                value:program
            }, {
                type: 'select',
                name:'Plans',             
                default: 'Choose your plan',
                options:["Choose Department","Admin","Technical","HR","Operations","BD"],
                value:plan
            },
            
            
          
        ])
        const [buttons, setButtons] = useState([
            {
                type:'submit',
                name: 'Save'
            },
            {
                type:'reset',
                name: 'Cancel'
            },
           
        ])
    
        // const onInputChange = (e) => {
        //     getCourse(e.target)
        // }
    
        return(
            <>              
                <AddEmployee
                    title={title} 
                    inputs={inputs} 
                    // options={[program, course, plans]}
                    onChange={handleChange} 
                    // // values={values} 
                    buttons={buttons} 
                    // show={show} 
                    // setShow={setShow} 
                    // // onSubmit={onSubmit}
                    />            
            </>
        );     
    }
    export default Addcourse
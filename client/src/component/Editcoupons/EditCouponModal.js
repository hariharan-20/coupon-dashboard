import React, {useState} from 'react'
import AddEditModal from '../AddEditModal/AddEditModal'

const EditCouponModal = () => {
    const title = 'Add a coupon'
    const [data, setData] = useState()    
    const [show, setShow] = useState(true)

    const [program, setProgram] = useState({
        name:'program',
        options:  ['choose a program', 'Internship', 'Pro Degree']
    })
    const [course, setCourse] = useState({
        name:'course',
        options: ['choose a course']
    })
    const [plans, setPlans] = useState({
        name: 'plan',
        options: ['choose a plan']
    })    

    return <div></div> 
    // <AddEditModal title={title} inputs={inputs} onChange={onInputChange}  buttons={buttons} show={show} setShow={setShow} onSubmit={onSubmit}/>
}

export default EditCouponModal
import React, {useState, useEffect, useContext} from 'react'
import { Globalcontext } from '../context/Reducers/Provider'
import axios from 'axios'
// import Header from '../component/Header/Header'
import TableComponent from '../component/Table/TableComponent' 
import { useHistory } from 'react-router'

const Employee = () => {
    const history= useHistory()

    const { modals } = useContext(Globalcontext)
    const { View } = useContext(Globalcontext)
    const { Table } = useContext(Globalcontext)
    const { Edit } = useContext(Globalcontext)
    const { EditValue } = useContext(Globalcontext)
    const { Array } = useContext(Globalcontext)
    const {Empedit} = useContext(Globalcontext)
    const {Empvalue} = useContext(Globalcontext)    
    const {Viewemp} = useContext(Globalcontext)  
    const {Empmodal} = useContext(Globalcontext)  

    const [modal, setModal] = modals;
    const [editmodal, setEditmodal] = Edit
    const [TableDatas, setTableDatas] = Table
    const [viewmodal, setView] = View
    const [EditDatas, setEditDatas] = EditValue
    const [filterarray, setFilterarray] = Array;
    const [empedit, setEmpedit] = Empedit
    const [empdata, setEmpdata] = Empvalue
    const [viewemp, setViewemp] = Viewemp
    const [empmodal, setEmpmodal] = Empmodal

    const [TableData, setTableData] = useState()

    const UserType = localStorage.getItem("type")

    const getData = async() => {
        await axios.get('/employee/view-all-users')
        .then( res => {            
            setTableData(res.data.allUser)
        })
        .catch( err => {
            console.log(err.message)
            if (err.response.status === 403) {
                history.push({
                    pathname: '/'
                })
            }                
            setTableData()
        })
    }

    const changeStatusClick = async (e, ele) => {
        await axios.post(`/employee/change-user-status/${ele._id}`)
            .then(res => {
                setTableData(data => {
                    let element = data.find(element => element._id === ele._id)
                    element.account_status = res.data.status
                    return data
                })
                getData()
            })
            .catch(err => { console.log(err) })
    }

    const EditCouponClick = (ele) => {
        setEmpedit(true)
        setEmpdata(ele)
      
    }

    const ViewCouponClick = (e, ele) => {
        e.preventDefault()
        setViewemp(ele)
        setEmpmodal(true)        
    }

    const DeleteCouponClick = (ele) => {
        axios.delete(`/employee/delete-a-user/${ele._id}`)
            .then(() => {                
                getData()
            })
            .catch(err => { console.log(err) })
    }

    const [TableHeaders] = useState([
        { md: 1, name: 'S.no' },
        { md: 2, name: 'Name' },
        { md: 2, name: 'Email' },
        { md: 2, name: 'Status' },
        { md: 2, name: 'User Type' },
        { md: 3, name: 'Actions' }
    ])

    useEffect(() => {        
        getData()
    }, [empedit,modal,TableData])
   const [data] =useState("name")
    return (        
        <>                
            {TableData && 
                <TableComponent
                    TableData={TableData}                
                    header={TableHeaders}
                    userType={UserType}
                    changeStatusClick={changeStatusClick}
                    ViewClick={ViewCouponClick}
                    DeleteClick={DeleteCouponClick}
                    EditClick={EditCouponClick}
                    value={data}
                />                
            }
        </>

    );
}
export default Employee
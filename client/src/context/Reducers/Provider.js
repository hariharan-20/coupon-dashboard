
import React, {createContext,useState} from "react"



export const Globalcontext = createContext({})
export const Globalprovider = ({children}) => {
   
     const [modal,setModal]=useState(false);
     const [viewmodal,setView]=useState(false)
     const[editmodal,setEditmodal]=useState(false)
     const [TableDatas, setTableDatas] = useState();
     const[EditDatas,setEditDatas]=useState();
     const [filterarray,setFilterarray]=useState();
     const [addEmpModal, setAddEmpModal] = useState(false)
     const [viewemp,setViewemp]=useState()
     const [empmodal,setEmpmodal]=useState(false)
     const [empedit,setEmpedit]=useState(false)
     const [empdata,setEmpdata]=useState()
    return (
         <div>
                     <Globalcontext.Provider  value={{ 
                         modals :[modal,setModal], 
                         Table :[TableDatas ,setTableDatas],
                         View :[viewmodal,setView],
                         Edit :[editmodal,setEditmodal],
                         EditValue:[EditDatas,setEditDatas],
                         Array:[filterarray,setFilterarray],
                         addEmpModal: [addEmpModal, setAddEmpModal],
                      
                         Viewemp: [viewemp,setViewemp],
                         Empmodal: [empmodal,setEmpmodal],
                         Empedit:[empedit,setEmpedit],
                         Empvalue:[empdata,setEmpdata]}
                    }>
                              {children}</Globalcontext.Provider> )

         </div>
    )
}






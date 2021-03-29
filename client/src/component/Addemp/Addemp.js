import React from 'react'
import "./Addemp.scss"

export const AddEmployee = (props) => {    

        return (                                 
            <div className="modal-wrapper">
                <div className="modal-backdrop">
                    <div className="box-modals">
                        <div className="header">
                            <p>{props.title}</p>
                        </div>
                        <div className="contai">
                            <form className="conta" onSubmit={(e) => props.onSubmit(e)}>
                                <div className="col-1">
                                    {props.inputs.map((e, i) => {
                                        return (
                                            <div className="coldata">
                                                <p>{e.name}:</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="col-2">
                                    {props.inputs.map((ele, i) => {              
                                        if (ele.type === 'input') {
                                            return <div className="coldata" key={i}><input type={ele.type} placeholder={ele.placeholder} name={ele.name} onChange={(e) => ele.onChange(e)} /></div>
                                        }
                                        if( ele.type === 'select') {
                                            return <div className="coldata" key={i}>
                                                        <select name={ele.name}  onChange={(e) => ele.onChange(e)} >
                                                            {ele.options && ele.options.map((element, i) => {
                                                                return <option value={element} key={i}>{element}</option>                                                            
                                                            })}
                                                        </select>
                                                    </div>
                                        }                                        
                                                                                    
                                    })}
                                </div>
                                <div className="buttton">
                                    {props.buttons.map((ele) => {
                                        return (                                            
                                                ele.type === 'reset' 
                                                    ? <button type={ele.type} onClick ={props.handleClose}>{ele.name}</button>
                                                    : <button type={ele.type}>{ele.name}</button>                                                
                                        )
                                    })}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>                
        );    
}

export default AddEmployee

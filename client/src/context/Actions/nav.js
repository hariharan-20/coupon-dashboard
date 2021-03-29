const nav = (state,action) =>{
    switch(action.type){
        case "ONCLICK":
            return {
                ...state,
                state:action.nav
            }
    }
}
export default nav
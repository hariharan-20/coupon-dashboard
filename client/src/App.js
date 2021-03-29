import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {Globalprovider} from './context/Reducers/Provider'

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Signin from './pages/signin'
import Landing  from './pages/Landing';
// import FormModal from './component/FormModal/FormModal'
// import AddCouponModal from './component/Addemp/AddCouponModal'
// import EditCouponModal from './component/Editcoupons/EditCouponModal'
import ForgotPassword from './component/ForgotPassword/ForgotPassword'
import ResetPassword from './component/ResetPassword/ResetPassword'
// import CreateNewPassword from './component/ResetPassword/CreateNewPassword'


axios.defaults.url = 'http://localhost:9897'
// axios.defaults.baseURL = "http://observer.verzeo.com"
axios.defaults.withCredentials = true
axios.defaults.headers.common['Access-Control-Allow-Origin'] = true
// axios.defaults.proxy = 'http://observer.verzeo.com'

const App = () => {
  const [hidden, setHidden] = useState(true)
  const history = useHistory()  
 
  return (    
    <Globalprovider>        
        <Router>
          <Switch>
            <Route path="/" component={Signin} exact />
            
            <Route path="/coupon" component={Landing} />  
            <Route path="/reset" component={ResetPassword}/>
            {/* <Route path="/addCouponModal" component={AddCouponModal}/> */}
            {/* <Route path="/editCouponModal" component={EditCouponModal}/> */}
           
            <Route path="/forgotPassword" component={ForgotPassword}/>
            {/* <Route path="/resetPassword" component={RestPassword}/> */}
            {/* <Route path="/createNewPassword" component={CreateNewPassword}/>*/}
          </Switch>
        </Router>
    </Globalprovider>           
  )
}

export default App;

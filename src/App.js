import React from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Admin from './Components/Admin/Admin';
import AdminHome from './Components/Admin/AdminHome';
import Register from './Components/Register/Register';
import Signin from './Components/Signin/Signin';
import Home from './Components/Home/Home';

const initialState = {
      fileDown: [],
      route: 'Sign in',
      user: {
        id: '',
        email: '',
        name: '',
        joiningDate: ''
      }
}

class App extends React.Component{

  constructor(){
    super();
    this.state = initialState;
  }

  storeUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        email: user.email, 
        name: user.name,
        joiningDate: user.joiningDate 
      }
    })
  }

  dumpFileDown = () => {
    var new_files = [];
    this.setState({fileDown: new_files});
  }

  onChangeFileDown = (data) => {
      data.map((entry, index) => {
        this.setState({fileDown: this.state.fileDown.concat(entry)})
        }
      )
    }


  onrouteChange = (route) => {
    if(this.state.route==='Sign out'){
      return this.setState(initialState);
    }
    return this.setState({route: route});
  	
  }

  validateEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
  }


  onUploadClick = () => {
        fetch("http://localhost:3000/image", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'name'
        })
      }
      )}

  render(){
  	const {route} = this.state;
    return (
    	<div>
	      <Navigation
	      	onrouteChange={this.onrouteChange}
	        items={
	          route==='Admin Panel'
	          ?
	          ['Sign in', 'Register']
	          :
	          route==='Sign in' || route==='Sign out'
	          ?
	          ['Register', 'Admin Panel']
	          :
	          route==='Register'
	          ?
	          ['Sign in', 'Admin Panel']
	          :
	          ['Sign out']
	        }/>

	        {
	        	route==='Admin Panel'
	        	?
	        	<Admin onrouteChange={this.onrouteChange}
                    validateEmail={this.validateEmail}
                    storeUser={this.storeUser}
                    onChangeFileDown={this.onChangeFileDown}/>
	        	:
	        	route==='Sign in' || route==='Sign out'
	        	?
	        	<Signin onrouteChange={this.onrouteChange}
                    validateEmail={this.validateEmail}
                    storeUser={this.storeUser}
                    onChangeFileDown={this.onChangeFileDown}/>
	        	:
	        	route==='Register'
	        	?
	        	<Register onrouteChange={this.onrouteChange}
                    validateEmail={this.validateEmail}/>
	        	:
            route==='Admin Home'
            ?
            <AdminHome fileList={this.state.fileDown}
                        onChangeFileDown={this.onChangeFileDown}
                        dumpFileDown={this.dumpFileDown}/>
            :
	        	<Home onrouteChange={this.onrouteChange}
                  route={this.state.route}
                  user={this.state.user}
                  fileList={this.state.fileDown}/>
	        }


	    </div>

    );    
  }

}

export default App;
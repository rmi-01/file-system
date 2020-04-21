import React from 'react';

export default class Admin extends React.Component {

	constructor(props){
		super(props);
		this.state={
			email: '',
			password: ''
		}
	}

	onAdminChange = (event) => {
		this.setState({ email : event.target.value })
	}

	onPassChange = (event) => {
		this.setState({ password : event.target.value })
	}

	onSubmit = (event) => {
		const { email, password } = this.state;
		var dataarr = [];
		if(this.props.validateEmail(email) && email && password){
			fetch('https://safe-oasis-08517.herokuapp.com/admin_signin', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					email: email,
					password: password
				})
			})
			.then(response => response.json())
			.then(data => {
				if (data[0].id) {
					dataarr = data
					this.props.storeUser(data[0]);
					{
						dataarr.splice(0,1);
						this.props.onChangeFileDown(dataarr[0]);
					}
					alert('Successfully logged in as admin!!!');
					this.props.onrouteChange('Admin Home');		
				}
				else{
					alert("Invalid email or password, please try again!");
				}
			})
			.catch(console.log)
		}
		else{
			alert("Invalid email or password")
		}
	}



	render() {
		return (
			<div>
			<div className="backPic"></div>
			<div className="mainForm" style={{top: "130px"}}>
				<h1 id="mainTitle" className="tc f2">Login as admin</h1>

				<label className="mt3 mb1 f5 b" htmlFor="email">Email</label>
				<br/>
				<input type="text" className="mt1 mb3 w-80 pa2 b--black inputTags" 
				name="email" placeholder="Enter email" onChange={this.onAdminChange}/>
				
				<br/>

				<label className="mt3 mb1 f5 b" htmlFor="password">Password</label>
				<br/>
				<input type="password" className="mt1 mb3 w-80 pa2 b--black inputTags" 
				name="password" placeholder="Enter password" onChange={this.onPassChange}/>

				<br/>
				<input type="submit" 
				className="mt3 mb1 w-30 pa2 b--black pointer br4 grow" 
				value="Sign in as admin" 
				onClick={this.onSubmit}/>			
			</div>
		</div>
		)
	}
}
import React from 'react';
import '../Register/Register.css';

export default class Signin extends React.Component {

	constructor(props){
		super(props);
		this.state={
			email: '',
			password: ''
		}
	}

	onUserChange = (event) => {
		this.setState({ email : event.target.value })
	}

	onPassChange = (event) => {
		this.setState({ password : event.target.value })
	}

	onSubmit = (event) => {
		var dataarr = [];
		const { email, password } = this.state;
		if(this.props.validateEmail(email) && email && password){
			fetch('https://safe-oasis-08517.herokuapp.com/signin', {
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

					alert('Successfully logged in');
					this.props.onrouteChange('Home');		
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
				<h1 id="mainTitle" className="tc f2">Login</h1>

				<label className="mt3 mb1 f5 b" htmlFor="email">Email</label>
				<br/>
				<input type="text" className="mt1 mb3 w-80 pa2 b--black inputTags" 
				name="email" placeholder="Enter email" onChange={this.onUserChange}/>
				
				<br/>

				<label className="mt3 mb1 f5 b" htmlFor="password">Password</label>
				<br/>
				<input type="password" className="mt1 mb3 w-80 pa2 b--black inputTags" 
				name="password" placeholder="Enter password" onChange={this.onPassChange}/>

				<br/>
				<input type="submit" 
				className="mt3 mb1 w-30 pa2 b--black pointer br4 grow" 
				value="Sign in" 
				onClick={this.onSubmit}/>
				

				<p id="lastLine" className="mt1 pointer w-40 underline-hover" onClick={() => this.props.onrouteChange('Register')}>Create an account</p>				
			</div>
		</div>
		)
	}
}
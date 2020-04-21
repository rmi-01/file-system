import React from 'react';
import './Register.css';

export default class Register extends React.Component {

	constructor(props){
		super(props);
		this.state={
			email: '',
			password: '',
			name: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({ email : event.target.value })
	}

	onNameChange = (event) => {
		this.setState({ name : event.target.value });
	}

	onPassChange = (event) => {
		this.setState({ password : event.target.value })
	}

	onSubmit = (event) => {
		const { email, password, name } = this.state;

		if(this.props.validateEmail(email) && email && password && name)
		{
			fetch('https://safe-oasis-08517.herokuapp.com/register', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password,
					name: name
				})
			})
			.then(response => response.json())
			.then(data => {
				if (data==='Successfully registered user') {
					alert('Successfully registered');
					this.props.onrouteChange('Sign in');
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
			<div className="mainForm">

				<h1 id="mainTitle" className="tc f2">Sign up</h1>

				<label className="mt3 mb1 f5 b" htmlFor="name">Name</label>
				<br/>
				<input type="text" className="mt1 mb3 w-80 pa2 b--black inputTags" 
				name="name" placeholder="Enter name" onChange={this.onNameChange}/>

				<br/>

				<label className="mt3 mb1 f5 b" htmlFor="contact-number">Email</label>
				<br/>
				<input type="text" className="mt1 mb3 w-80 pa2 b--black inputTags" 
				name="email" placeholder="Enter email" onChange={this.onEmailChange}/>
				
				<br/>

				<label className="mt3 mb1 f5 b" htmlFor="password">Password</label>
				<br/>
				<input type="password" className="mt1 mb3 w-80 pa2 b--black inputTags" 
				name="password" placeholder="Enter password" onChange={this.onPassChange}/>

				<br/>
				<input type="submit" 
				className="mt3 mb1 w-30 pa2 b--black pointer br4 grow" 
				value="Sign up" 
				onClick={this.onSubmit}/>
				


				<p id="lastLine" className="mt1 pointer w-40 underline-hover" onClick={() => this.props.onrouteChange('Sign in')}>Already have an account?</p>				
			</div>
		</div>
		)
	}
}
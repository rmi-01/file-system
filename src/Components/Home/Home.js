import React from 'react';
import './Home.css';

export default class Home extends React.Component {


	constructor(){
		super();
		this.state = {
			filename: '',
			url: ''
		}
	}

	onDownClick = (filename, url) => {
		this.setState({filename: filename,
						url: url});

		fetch('https://safe-oasis-08517.herokuapp.com/download',{
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					filename: filename,
					url: url
				})
		})
		.then(data => data.json())
		.then(data => alert(data))
		.catch(console.log)
		
	}


	render() {
		return (
			<div id="main-home">
				<h3 className="pt3 pb3 ma3" id="name-head">Hi {this.props.user.name}!!!</h3>
				<h1 className="ma3">Files</h1>
				

				{
					this.props.fileList.map((data, index) => {
						return(
							<div className="flex items-center justify-between ma3" key={index}>
								<p className="pa2">{data.filename}</p>
								<a href={data.url} target="_blank"><button className="pa2 br3 b--black pointer grow">Download</button></a>
							</div>
							);
						
				})
				}
			</div>
		)
	}
}
//								onClick={() => this.onDownClick(data.filename, data.url)}
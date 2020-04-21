import React from 'react';
import {storage} from './Firebase/index';

export default class AdminHome extends React.Component {

	constructor(){
		super();
		this.state = {
			file: null,
			url: '',
			progress: 0
		}
	}

	onFileChange = (event) => {
		if(event.target.files[0]){
		this.setState({file: event.target.files[0]});
	}
	}

	onUploadClick = () => {
		const { file } = this.state;
		if(file){
			const uploadFile = storage.ref(`files/${file.name}`).put(this.state.file);
			uploadFile.on('state_changed', (total) => {
				var progress = Math.round((total.bytesTransferred/total.totalBytes)*100);
				this.setState({progress: progress});
				}, (error) => {
					console.log(error);
			}, () => {
				storage.ref('files').child(file.name).getDownloadURL().then(url => {
				this.setState({url: url});
				fetch('https://safe-oasis-08517.herokuapp.com/upload', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					filename: file.name,
					url: this.state.url
				})
				})
				.then(response => response.json())
				.then(data => {
					this.props.dumpFileDown(); 
					this.props.onChangeFileDown(data)
				})
				.then(() => alert(`Successfully uploaded ${file.name}`))
				.catch(console.log)

			})
		})
		}
		
	}

	onDelClick = (id) => {
		fetch('https://safe-oasis-08517.herokuapp.com/delete/'+id, {
			method: 'delete',
			headers: {'Content-Type': 'application/json'}
		})
		.then(response => response.json())
		.then(data => {
			this.props.dumpFileDown();
			this.props.onChangeFileDown(data);
		})
		.then(() => alert('Successfully deleted'))
		.catch(console.log)
	}

	render() {
		return (
			<div id="main-home">
				<div id="name-head" className="flex justify-between items-center">
					<h3 className="pt3 pb3 ma3">Hi Admin!!!</h3>
					<div>
						<input type="file" className="mr0 pr0" onChange={this.onFileChange}/>
						<button className="pa2 br4 b--black pointer grow ma3 ml0" onClick={this.onUploadClick}>Upload File</button>
					</div>

					
				</div>
				<p className="ma3 flex justify-between items-center">Upload: <progress value={this.state.progress} max="100" className="w-80"></progress></p>
				<h1 className="ma3">Files</h1>
				{
					this.props.fileList.map((data, index) => {
						return(
							<div className="flex items-center justify-between ma3" key={index}>
								<p className="pa2">{data.filename}</p>
								<div>
									<a href={data.url} target="_blank"><button className="pa2 br3 b--black pointer grow">Download</button></a>
									<button className="pa2 br3 b--black pointer grow ml3" 
									onClick={() => this.onDelClick(data.id)}>Delete</button>
								</div>
							</div>
							);
						
				})
				}
			</div>
		)
	}
}
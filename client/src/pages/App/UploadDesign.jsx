import React, { Component } from 'react'
import styled from 'styled-components'
import {
    Link
  } from "react-router-dom";
const FormPage = styled.div`
    display:list-item;
    list-style-type:none;
    margin-top :30px;
    height: 60vh;
    width: 50vh;
    font-size:20px;
    margin-left:auto;
    margin-right:auto;
    border: 2px solid black;
    border-radius:10px;
`;
const InputFields = styled.div`
    padding:10px;
    margin-top:2vh;
    color:#1abc9c;
`;
const LinkBox =styled.div`
    font-family:"nidus sans";
    font-size:20px;
    margin-top:4vh
`
class UploadDesign extends Component {
    constructor(props) {
        super(props);
        this.state ={
          file:null,
          title:''
        }

        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
      }

      onFormSubmit(e){
        e.preventDefault() 
        this.fileUpload(this.state.file).then((response)=>{
          console.log(response.data);
        })
      }
      onChange(e) {
        this.setState({file:e.target.files[0]})
      }
     async fileUpload(file){
        const formData = new FormData()
        
        formData.append('files', file)
        
        await fetch('/upload/'+ this.state.title, {
            method: 'post',
            body: formData
        }).then(response => response.json())
        .then(data => {
            return alert('Uploaded Successfully')
        })
      }
    
      render() {
        return (
            <FormPage>
          <form onSubmit={this.onFormSubmit}>
            <h1>File Upload</h1>
            <InputFields>
            <input type="file" onChange={this.onChange} />
            </InputFields>
            <InputFields>
            <input type='text' placeholder ='Input Title of design' onChange = {e => {this.setState({title: e.target.value})}} />
            </InputFields>

            <button type="submit">Upload</button>
          </form>

          <LinkBox>
            <Link className="link-register" to="/profile">
					Back to Profile
			</Link>
            </LinkBox>
          </FormPage>
       )
      }
    }

export default UploadDesign

import React, {Component} from 'react';
import styled from 'styled-components'
import {get,post} from '../api/utils'

const Box = styled.div`
    display: grid;
    list-style-type:none;
    justify-content:center;
    text-align:center;
    padding: 1.5rem;
    height:20vh;
    width: 40vh;
    margin-left:auto;
    margin-right:auto;
    border: 2px solid black;
    border-radius : 30px;
    margin-bottom: 20px;
    margin-top:10px;
    `;

const Header1 =styled.h1` 
    font-family: 'Raleway', sans-serif;
    font-size: 30px;
    color:  #851e3e;
    margin-bottom: -5px;
`;
const Header2 = styled.h2`
      font-family: 'Raleway', sans-serif;
        font-size:20px;
        color:#4a4e4d;
        margin-bottom:2px;
`;
const Header6 = styled.h6`
      font-family: 'Raleway', sans-serif;
        font-size:20px;
        color: #476c8a;
        font-style: italic;
        margin:2px;
`;
const Icons = styled.div`
    display:inline-flex;
    justify-content:space-evenly;

`
const CustomButtons = styled.img`
    margin-top: 2px;
    height:3vh;
    cursor:pointer;
`
export class FeedCard extends Component {
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
        }
    this.likePost = this.likePost.bind(this);
    this.savePost = this.savePost.bind(this);
    this.follow = this.follow.bind(this);
    }

    likePost =async(title)=> {
        const data = await post('/like/'+title)
        return alert('liked design' +data);
    }
    
    savePost =async(title)=> {
        const data = await post('/save/'+title)
        return alert('saved design' +data);
    }
    follow =async(author)=>{
        const data = await post('/follow/'+author)
        return alert('saved design' +data);
    }
    
    render() {
        
        return (
            <div className = 'Article Cards'>
                <Box>
                <Header1>{this.props.title}</Header1>
                <Header2> {this.props.author}</Header2>
                <Header2>{this.props.email}</Header2>
               
                <Icons>
                    <CustomButtons src = {require('../assets/like-svgrepo-com.svg')} alt='like' onClick ={this.likePost(this.props.title)} />
                    <CustomButtons src ={require('../assets/floppy-disk-save-button-svgrepo-com.svg')} alt='save' onClick ={this.savePost(this.props.title)} />
                    <CustomButtons src ={require('../assets/follow.svg')} alt='follow' onClick ={this.follow(this.props.author)} />
                
                </Icons>
                </Box>
                
            </div>
        )
    }
}

export default FeedCard
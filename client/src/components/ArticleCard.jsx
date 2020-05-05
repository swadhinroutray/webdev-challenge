import React, {Component} from 'react';
import styled from 'styled-components'

const Box = styled.div`
    display: list-item;
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
const ReadArticle = styled.button`
    color: black;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    background-color:transparent;
    border: 2px solid palevioletred;
    border-radius: 10px;
    :hover{
        color:darkblue;
        cursor:pointer;
    }
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
export class ArticleCard extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    
    render() {
        return (
            <div className = 'Article Cards'>

                <Box>
                <Header1>{this.props.title}</Header1>
                <Header2>{this.props.author}</Header2>
                <Header6>{this.props.email}</Header6>
                {/* <ReadArticle>Read</ReadArticle> */}
                {/* <p>{this.props.content}</p> */}

                </Box>
            </div>
        )
    }
}

export default ArticleCard
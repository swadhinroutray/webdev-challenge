import React, {useState} from 'react'
import { Link,Redirect } from 'react-router-dom';
import styled from 'styled-components';

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

const Heading =styled.div`
    font-family:"nidus sans";
    font-size:60px;
    color:#1abc9c;
`
const LinkBox =styled.div`
    font-family:"nidus sans";
    font-size:20px;
    margin-top:4vh
`
const InputFields = styled.div`
    padding:10px;
    margin-top:2vh;
    color:#1abc9c;
`;
function SubmitForm(state){
    fetch('/login', {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email:state.email,
            password:state.password
        })
    }).then(resp => resp.json())
    .then((data) => {
        alert(data)
        return(
            <Redirect to = '/profile'/>
        )
    })
}

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password,setPassword] =useState('');
    return (
        <FormPage>
            <Heading>
                Login
            </Heading>
          
            
            <InputFields>
                Email:
                <br />
                <input type = 'text' placeholder='Input Email' onChange= {(e)=> setEmail(e.target.value)} />
            </InputFields>

            <InputFields>
                Password:
                <br />
                <input type ='password' placeholder='Input Password' onChange= {(e)=> setPassword(e.target.value)} />
             </InputFields>

            <button onClick={() => {
                SubmitForm({email:email, password:password});
                 }}
            >
           Login
            </button>
            <LinkBox>
            <Link className="link-register" to="/register">
                Register
			</Link>
            </LinkBox>
        </FormPage>
    )
}

export default LoginPage;
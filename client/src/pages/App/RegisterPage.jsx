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
    if(state.password!==state.confirmpass)
    {  
        alert("Cannot Register, password not same")
        return;
    }
    fetch('/register', {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name:state.name,
            email:state.name,
            password:state.password
        })
    }).then(resp => resp.json())
    .then(data => {
        alert(data)
    })
}

const RegisterPage = () => {
    const [name,setName]=useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] =useState('');
    const [confirmpass, setConfimPassword]= useState('')
    return (
        <FormPage>
            <Heading>
                Registration
            </Heading>
            <InputFields >
                Name:
                <br />
                <input type ='text' placeholder='Input Name' onChange= {(e)=> setName(e.target.value)} />
            </InputFields>
            
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

            <InputFields>
            Confirm Password:
            <br />
                <input type ='password' placeholder='Confirm Password' onChange= {(e)=> setConfimPassword(e.target.value)} />
              </InputFields>
            <button onClick={() => {
                SubmitForm({name:name, email:email, password:password, confirmpass:confirmpass});
                 }}
            >
           Register
            </button>
            <LinkBox>
            <Link className="link-register" to="/login">
					Back to login
			</Link>
            </LinkBox>
        </FormPage>
    )
}

export default RegisterPage;
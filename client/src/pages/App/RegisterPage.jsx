import React, {useState} from 'react'

function SubmitForm(state){
    
}

const RegisterPage = () => {
    const [name,setName]=useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] =useState('');
    const [confirmpass, setConfimPassword]= useState('')
    return (
        <div>
            <div>
                <input type ='text' placeholder='Input Name' onChange= {(e)=> setName(e.target.value)} />
            </div>
            
            <div>
                <input type = 'text' placeholder='Input Email' onChange= {(e)=> setEmail(e.target.value)} />
            </div>

            <div>
                <input type ='password' placeholder='Input Password' onChange= {(e)=> setPassword(e.target.value)} />
             </div>

            <div>
                <input type ='password' placeholder='Confirm Password' onChange= {(e)=> setConfimPassword(e.target.value)} />
              </div>
            <button onClick={() => {
                SubmitForm({name:name, email:email, password:password, confirmpass:confirmpass});
                 }}
            >
           Register
            </button>
        </div>
    )
}

export default RegisterPage;
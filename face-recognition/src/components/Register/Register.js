import React, {useState} from 'react';

const Register = ({ onRouteChange, loadUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registerError, setRegisterError] = useState(null);

  const onNameChange = (e) => {
    setName(e.target.value);
    console.log(name)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
    console.log(password)
  }

  const onSubmitRegister = () => {
    // fetch will pass GET request by default
    fetch('http://localhost:8000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    })
      .then(response => response.json())
      .then(
        data => {
        if(data.id) {                           // user
          loadUser(data)
          onRouteChange('home');
        } else {                                // response คือ 400 จาก api
          setRegisterError(data)
        }
        }
      )
      
  }

  return(
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center z-index--2">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input 
                className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
                type="text" 
                name="name" id="name" 
                onChange={onNameChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
                className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
                type="email" 
                name="email-address" 
                id="email-address" 
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input 
                className="b pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="password" 
                id="password" 
                onChange={onPasswordChange}
              />
              <p>{registerError}</p> 
            </div>
          </fieldset>
          <div className="">
            <input 
            onClick={onSubmitRegister}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
              type="submit" 
              value="Register" 
            />
          </div>
        </div >
      </main>
    </article>
  )
}

export default Register;
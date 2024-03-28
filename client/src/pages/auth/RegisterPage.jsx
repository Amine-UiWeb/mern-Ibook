import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { registerUser } from "../../api/axiosApi"
import { register } from "../../features/auth/authSlice"

import ExclamationMark from "../../components/svgs/ExclamationMark"
import Check from "../../components/svgs/Check"
import Eye from "../../components/svgs/Eye"
import EyeSlash from "../../components/svgs/EyeSlash"
import "./LoginPage.css"

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const UN_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const RegisterPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const emailRef = useRef()
  const unRef = useRef()
  const pwRef = useRef()
  const confPwRef = useRef()
  const errorRef = useRef()

  const [email, setEmail] = useState('email@gmail.com')
  const [un, setUn] = useState('username')
  const [pw, setPw] = useState('Password123%')
  const [confPw, setConfPw] = useState('Password123%')

  const [isPwVisible, setIsPwVisible] = useState(false)
  const [invalidInputs, setInvalidInputs] = useState({})
  const [focusedInput, setFocusedInput] = useState(null)
  const [validationError, setValidationError] = useState('')
  

  useEffect(() => emailRef.current.focus(), [])

  useEffect(() => { setValidationError('') }, [email, un, pw, confPw])

  useEffect(() => {
    setInvalidInputs(prev => ({ ...prev, email: !EMAIL_REGEX.test(email) }))
  }, [email])

  useEffect(() => {
    setInvalidInputs(prev => ({ ...prev, un: !UN_REGEX.test(un) }))
  }, [un])

  useEffect(() => {
    setInvalidInputs(prev => ({ ...prev, pw: !PW_REGEX.test(pw) }))
    setInvalidInputs(prev => 
      ({ ...prev, confPw: (pw !== confPw) || !PW_REGEX.test(confPw) })
    ) 
  }, [pw, confPw])


  const onEmailChange = (e) => setEmail(prev => e.target.value)
  const onUnChange = (e) => setUn(prev => e.target.value)
  const onPwChange = (e) => setPw(prev => e.target.value)
  const onConfPwChange = (e) => setConfPw(prev => e.target.value)

  const onBlur = () => setFocusedInput(null)

  const togglePwVisible = () => setIsPwVisible(prev => !prev)

  const isSomeFieldsEmpty = () => !email || !un || !pw || !confPw

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('')

    const v1 = EMAIL_REGEX.test(email);
    const v2 = UN_REGEX.test(un);
    const v3 = PW_REGEX.test(pw);
    const v4 = pw === confPw;

    if (!v1 || !v2 || !v3 || !v4) {
      setValidationError('Invalid inputs! Make sure the field respect the specified rules.')
      errorRef.current.focus()
    }
    
    else {
      (async () => {
        try {
          const newUser = { email, username: un, password: pw }
          const result = await registerUser(newUser)
          if (result.user) {
            dispatch(register({ newUser }))
            navigate('/')
          }
          if (result.error) {
            setValidationError(result.error)
            errorRef.current.focus()
          }
        }
        catch (err) {
          setValidationError(err.message)
          errorRef.current.focus()
          console.log(err)
        }
      })()
    }
  }


  return (
    <div className="login">

      <h3>REGISTER</h3>

      <form className="login-form">

        <div 
          ref={errorRef}
          className={validationError ? "error" : "offScreen"}
          aria-live="assertive"
        >
          {validationError}
        </div>

        {/* ------------------ email ------------------ */ }
        <label htmlFor="email">
          Email { (email && !invalidInputs.email) && <Check /> }
        </label>

        <input 
          type="email" 
          ref={emailRef}
          id="email"
          value={email}
          onChange={onEmailChange}
          aria-invalid={(email && invalidInputs?.email) ? "true" : "false"}
          aria-describedby="emailNote"
          autoComplete="off"
          placeholder="xxxxxxxx@gmail.com"
          onFocus={() => setFocusedInput('email')}
          onBlur={onBlur}
          required
        />

        <div 
          id="emailNote" 
          className={ invalidInputs?.email && focusedInput == "email" ? "note" : "offScreen" }
        >
          <ExclamationMark />
          <p>Expected format: (text)@(text).(2-4 characters)</p>
        </div>

        {/* ------------------ username ------------------ */}
        <label htmlFor="username">
          Username { (un && !invalidInputs.un) && <Check /> }
        </label>

        <input
          type="text" 
          ref={unRef}
          id="username"
          value={un}
          onChange={onUnChange}
          aria-invalid={un && invalidInputs?.un ? "true" : "false"}
          aria-describedby="unNote"
          autoComplete="off"
          placeholder="Enter a username, e.g.: Mark"
          onFocus={() => setFocusedInput('un')}
          onBlur={onBlur}
          required
        />
        
        <div 
          id="unNote" 
          className={ invalidInputs?.un && focusedInput == "un" ? "note": "offScreen" }
        >
          <ExclamationMark />
          <p>
            4 to 24 characters.<br />
            Must begin with a letter.<br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
        </div>

        {/* ------------------ password ------------------ */}
        <label className="flex-row jc-sb" htmlFor="pw">
          <span>Password { (pw && !invalidInputs.pw) && <Check /> }</span>
          
          <span className="eye flex-row ai-c gap-0-25" onClick={togglePwVisible}>
            {isPwVisible ? <Eye /> : <EyeSlash />}
            {isPwVisible ? "Hide ": "Show"}
          </span>
        </label>

        <input 
          type={isPwVisible ? "text" : "password"} 
          ref={pwRef}
          id="pw"
          value={pw}
          hidden={false}
          onChange={onPwChange}
          aria-invalid={pw && invalidInputs?.pw ? "true" : "false"}
          aria-describedby="pwNote"
          placeholder="Must be 8-24 charachters long"
          onFocus={() => setFocusedInput('pw')}
          onBlur={onBlur}
          required
        />

        <div 
          id="pwNote" 
          className={ invalidInputs?.pw && focusedInput == "pw" ? "note" : "offScreen"}
        >
          <ExclamationMark />
          <p>
            8 to 24 characters.<br />
            Must include uppercase and Lowcase letters, 
            a number and a special characters.<br />
            Allowed special characters:{' '} 
            <span aria-label="Exclamation mark">!</span>
            <span aria-label="at symbol">@</span>
            <span aria-label="hashtag">#</span>
            <span aria-label="dollar sign">$</span>
            <span aria-label="percent">%</span>
          </p>
        </div>
      

        {/* ------------------ confirm password ------------------ */}
        <label htmlFor="confPw">
          Confirm Password { (confPw && !invalidInputs.confPw) && <Check /> }
        </label>

        <input 
          type={isPwVisible ? "text" : "password"} 
          ref={confPwRef}
          id="confPw"
          value={confPw}
          onChange={onConfPwChange}
          aria-invalid={confPw && invalidInputs?.confPw ? "true" : "false"}
          aria-describedby="confPwNote"
          placeholder="Retype password..."
          onFocus={() => setFocusedInput('confPw')}
          onBlur={onBlur}
          required
        />

        <div 
          id="confPwNote" 
          className={ 
            invalidInputs?.confPw && focusedInput == "confPw" ? "note" : "offScreen" 
          }
        >
          <ExclamationMark />
          <p>Must match password.</p>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={handleSubmit} 
          disabled={isSomeFieldsEmpty()} 
        >Register</button>
        
        <p className="fs-0-9">
          Already have an account?{' '}
          <Link to="/login" className="underline">Log in</Link>
        </p>

      </form>    
      
    </div>
  )
}

export default RegisterPage

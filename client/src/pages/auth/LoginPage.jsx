import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { loginUser } from "../../api/authApi"
import { login } from "../../features/auth/authSlice"
import usePersist from "../../utils/hooks/usePersist"

import Eye from "../../components/svgs/Eye"
import EyeSlash from "../../components/svgs/EyeSlash"
import "./LoginPage.css"


const LoginPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { persist, setPersist } = usePersist()

  const [email, setEmail] = useState('email@gmail.com')
  const [pw, setPw] = useState('Password123%')
  const [isPwVisible, setIsPwVisible] = useState(false)
  const [validationError, setValidationError] = useState('')

  const emailRef = useRef()
  const errorRef = useRef()


  useEffect(() => emailRef.current.focus(), [])

  const onEmailChange = (value) => setEmail(prev => value)
  const onPasswordChange = (value) => setPw(prev => value)

  const togglePersist = (e) => setPersist(e.target.checked)
  const togglePwVisible = () => setIsPwVisible(prev => !prev)

  const isSomeFieldsEmpty = () => !email || !pw


  const handleSubmit = (e) => {
    e.preventDefault()
    setValidationError('')

    if (!email || !pw) {
      setValidationError('All fields must be valid')
    }
    else {
      (async () => {
        try {
          let credentials = { email, password: pw }
          let res = await loginUser(credentials)
          let data = res?.data
          
          if (data?.user) {
            navigate('/')
            dispatch(login({ ...data.user, token: data?.aT }))
          }
          if (data?.error) {
            setValidationError(data.error)
            errorRef.current.focus()
          }
        } 
        catch (err) {
          setValidationError(err.Message)
          errorRef.current.focus()
        }
      })()
    }
  }


  return (
    <div className="login">
      
      <h3>LOGIN</h3>

      <form className="login-form">

        <div 
          ref={errorRef}
          className={validationError ? "error" : "offScreen"}
          aria-live="assertive"
        >
          {validationError}
        </div>

        {/* ------------------ email ------------------ */ }
        <label htmlFor="email">Email</label>
        <input 
          type="text" 
          ref={emailRef}
          id="email"
          name="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          autoComplete="off"
        />

        {/* ------------------ password ------------------ */}
        <label className="flex-row jc-sb" htmlFor="pw">
          <span>Password</span>
          
          <span className="eye flex-row ai-c gap-0-25" onClick={togglePwVisible}>
            {isPwVisible ? <Eye /> : <EyeSlash />}
            {isPwVisible ? "Hide ": "Show"}
          </span>
        </label>
        <input 
          type={!isPwVisible ? "password" : "text"} 
          id="pw"
          name="pw"
          value={pw}
          onChange={(e) => onPasswordChange(e.target.value)}
        />
        
        <span className="d-inbl mt-1">
          <input 
            type="checkbox" 
            id="persist" 
            className="d-in" 
            checked={persist || false}
            onChange={togglePersist}
          />
          <label htmlFor="persist" className="d-in fs-0-85 gray-600 ml-0-5">
            Remember Me
          </label>
        </span>

        <button 
          className="btn btn-primary" 
          onClick={handleSubmit} 
          disabled={isSomeFieldsEmpty()} 
        >Log in</button>

        
        <p className="fs-0-9 fw-5">
          Don't have an account yet?{' '}
          <Link to="/register" className="underline">Register</Link>
        </p>

      </form>

    </div>
  )
}
export default LoginPage
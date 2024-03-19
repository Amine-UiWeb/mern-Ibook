import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

import { selectToken } from "../../features/auth/authSlice"

import { Sun, Moon } from "../svgs/ThemeIcons"
import { ChevronRight } from "../svgs/ChevronRight"
import { SUBJECTS } from "../../utils/constants"
import "./Nav.css"


const Nav = ({ isPanelOpen, setIsPanelOpen }) => {

  const token = useSelector(selectToken)

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    // toggle prefers-theme to: light or dark
    /* todo: when implementing theme toggling, keep header and footer color static */
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
  }


  return (
    <nav 
      onMouseLeave={() => setIsPanelOpen(false)} 
      className={'nav flex-row ai-c jc-c' + (isPanelOpen ? ' open' : '')}
    >
      
      <div className="browse-wrapper">
        <button className="fw-6 fs-0-9">Browse</button>
        <ul className="browse-ul fw-5 fs-0-9">

          <li className="genres-wrapper scrollbar-1">
            <a href="#">Genres</a>
            <ChevronRight />
            <ul className="genres-ul">
              { Object.keys(SUBJECTS)?.map((subject, i) => (
                  <li key={i}>
                    <NavLink to={`browse/genres/${SUBJECTS[subject]}`}>
                      {subject}
                    </NavLink>
                  </li>
                ))
              }
            </ul>
          </li>
          
          <li><NavLink to="browse/awards">Awards</NavLink></li>
          <li><NavLink to="browse/recommendations">Recommendations</NavLink></li>
          <li><NavLink to="browse/popular">Most Popular</NavLink></li>
          <li><NavLink to="browse/explore">Explore</NavLink></li>
        
        </ul>
      </div>

      <div className="nav-links">
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          { token ? 
              <li><NavLink to='/user/collection'>My Collection</NavLink></li>
              : (
                <>
                  <li><NavLink to='/login'>LogIn</NavLink></li>
                  <li><NavLink to='/register'>Register</NavLink></li>
                </>
              )
          }
        </ul>
      </div>

      <div className="mode-toggler" style={{ 
          "--theme": theme === 'light' ? '##7e7e7e' : 'var(--pri-200)' 
      }}>
        { theme === 'light' ? <Sun /> : <Moon /> }
        <input 
          type="checkbox" 
          id="theme-toggler" 
          className="theme-toggler" 
          onChange={toggleTheme}
        />
      </div>

    </nav>
  )
}
export default Nav
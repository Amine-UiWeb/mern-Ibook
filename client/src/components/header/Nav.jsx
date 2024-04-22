import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

import { selectIsToken } from "../../features/auth/authSlice"

import { Sun, Moon } from "../svgs/ThemeIcons"
import { ChevronRight } from "../svgs/ChevronRight"
import { GENRES, AWARDS } from "../../utils/constants"
import "./Nav.css"


const Nav = ({ isPanelOpen, closePanel }) => {

  const token = useSelector(selectIsToken)

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    if (theme == 'light') {
      // toggle prefers-theme to: light or dark
    }
    if (theme == 'dark') {
      window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    }
  }, [theme])

  useEffect(() => {
    document.querySelector('.overlay').addEventListener('click', toggleBrowse)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
  }


  const toggleBrowse = (e) => {
    let browseCls = e.target.closest('.browse').classList

    if (e.target.className == 'overlay') browseCls.remove('display')

    else if (e.target.nodeName == 'BUTTON') 
      setTimeout(() => { browseCls.toggle('display') }, 100);
    
    else if (e.target.nodeName == 'A')
      if (e.target.getAttribute('data-dropdown-opener')) e.preventDefault()
      else setTimeout(() => { browseCls.remove('display') }, 100);
  }


  return (
    <nav 
      onMouseLeave={closePanel} 
      className={'nav flex-row ai-c jc-c' + (isPanelOpen ? ' open' : '')}
    >
      
      <div className="dropdown-wrapper browse" onClick={toggleBrowse}>
        <button className="fw-6 fs-0-85 fw-5 uppercase p-0-5">Browse</button>
        <div className="overlay"></div>

        <ul className="dropdown-ul browse-ul fw-5 fs-0-9">

          <li className="sub-dropdown-wrapper subjects scrollbar-1">
            <a href="#" data-dropdown-opener>Subjects</a>
            <ChevronRight />
            <ul className="sub-dropdown-ul subjects-ul">
              { Object.keys(GENRES)?.map((subject, i) => (
                  <li key={i}>
                    <NavLink to={`browse/subjects/${subject}`}>{GENRES[subject]}</NavLink>
                  </li>
                ))
              }
            </ul>
          </li> 
          
          <li className="sub-dropdown-wrapper awards scrollbar-1">
            <a href="#" data-dropdown-opener>Awards</a>
            <ChevronRight />
            <ul className="sub-dropdown-ul awards-ul">
              { Object.keys(AWARDS)?.map((award, i) => (
                  <li key={i}>
                    <NavLink to={`browse/awards/${award}`}>{AWARDS[award]}</NavLink>
                  </li>
                ))
              }
            </ul>
          </li>

          <li><NavLink to="browse/recommendations">Recommendations</NavLink></li>
          <li><NavLink to="browse/popular">Most Popular</NavLink></li>
          <li><NavLink to="browse/explore">Deep Search</NavLink></li>
        
        </ul>
      </div>

      <div className="nav-links">
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          { token ? 
              <li><NavLink to='/user/collection'>Collection</NavLink></li>
              : (
                <>
                  <li><NavLink to='/login'>LogIn</NavLink></li>
                  <li><NavLink to='/register'>Register</NavLink></li>
                </>
              )
          }
        </ul>
      </div>

      <div className="mode-toggler">
        <Sun cls={theme == 'light' ? 'active' : ''} />
        <Moon cls={theme != 'light' ? 'active' : ''} />
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
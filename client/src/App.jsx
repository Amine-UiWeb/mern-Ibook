// libraries
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"

// Components
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"

// Pages
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import PersistLogin from "./pages/auth/PersistLogin"

import LandingPage from "./pages/landing/LandingPage"
import WorkPage from "./pages/work/WorkPage"
import AuthorPage from "./pages/author/AuthorPage"
import WorkEditionsPage from "./pages/workEditions/WorkEditionsPage"

import Browse from "./pages/browse/Browse"
import UserPage from "./pages/user/UserPage"
import UserSettings from "./components/main/user/UserSettings.jsx"
import BooksCollection from "./components/main/user/BooksCollection.jsx"


function App() {

  const Root = () => (
    <PersistLogin>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </PersistLogin>
  )
  
  const router = createBrowserRouter([{
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'works/:olWork', element: <WorkPage /> },
      { path: 'authors/:key', element: <AuthorPage /> },
      { path: 'works/:olWork/editions', element: <WorkEditionsPage /> },
      { path: 'user', element: <UserPage />, children: [
          { path: 'collection', element: <BooksCollection /> },
          { path: 'settings', element: <UserSettings /> },
        ] 
      },
      {
        path: '/browse/*', 
        element: <Browse />,
        children: [/* add nested pages later */]
      }
    ]
  }])

  
  return (
    <div className="App container">
      <RouterProvider router={router} />
    </div>
  )
}

export default App

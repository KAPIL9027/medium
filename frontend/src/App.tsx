
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Signup } from './components/Signup'
import { Signin } from './components/Signin'
import Blog from './components/Blog'
import { CreateBlog } from './components/CreateBlog'
import Dashboard  from './components/Dashboard'
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Signin/>} path='/'/>
      <Route element={<Signup/>} path='/signup'/>
      <Route element={<Blog/>} path='/blog'/>
      <Route element={<CreateBlog/>} path='/create'/>
      <Route element={<Dashboard/>} path='/blogs'/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

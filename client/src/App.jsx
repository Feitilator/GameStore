import Login from './Pages/Auth/Login';
import { BrowserRouter, Route, Routes} from 'react-router';
import Register from './Pages/Auth/Register';
import Home from './Pages/Home/Home';
import Layout from './Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
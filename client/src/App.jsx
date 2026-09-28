import Login from './Pages/Auth/Login';
import { BrowserRouter, Route, Routes} from 'react-router';
import Register from './Pages/Auth/Register';
import Home from './Pages/Home/Home';
import Layout from './Layout/Layout';
import Profile from './Pages/Profile/Profile';
import PersonalInformation from './Pages/PersonalInformation/PersonalInformation';
import ProtectedRoute from './Layout/ProtectedRoute';
import RoleRoute from './Layout/RoleRoute';
import AdminPanel from './Pages/AdminPanel/AdminPanel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />


          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile/>} />
            <Route path="/info" element={<PersonalInformation/>} />

            <Route element={<RoleRoute allowedRoles={["admin"]} />}>
              <Route path="/admin" element={<AdminPanel/>} />
            </Route>
          </Route>
        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
import { useCookies } from 'react-cookie';
import './App.css'
import {Navigate, Route, Routes} from 'react-router-dom';
import { SignUpPage } from './pages/signUpPage';
import { SignInPage } from './pages/signInPage';
import { Homepage } from './pages/homepage';
import { LikedPlaces } from './pages/liked';

function App() {
  const [token] = useCookies(['whatsNearMeToken']);

  return (
    <Routes>
      <Route
        path={"/"}
        element={<Navigate to={!token.whatsNearMeToken ? "/sign-up" : "/homepage"} />}
      />
      <Route path={"/sign-up"} element={<SignUpPage/>} />
      <Route path={"/sign-in"} element={<SignInPage/>} />
      <Route path={"/homepage"} element={<Homepage/>} />
      <Route path={"/liked"} element={<LikedPlaces/>} />
    </Routes>
  )
}

export default App

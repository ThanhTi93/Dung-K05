import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import HomeAdmin from './components/Admin/HomeAdmin/HomeAdmin';
import HomeSite from './components/Site/HomeSite/HomeSite';

function App() {
  return (
    <>
       <ToastContainer />
       {/* <HomeAdmin></HomeAdmin> */}
       <HomeSite></HomeSite>
    </>
  );
}

export default App;

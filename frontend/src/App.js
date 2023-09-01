// import logo from './logo.svg';
// import './App.css';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.css'
import SideBar from './components/SideBar';
import Router from './components/Router/Router';
import CartPage from './components/CartPage';
import axios from 'axios';


function App() {
    return <>
       {/* <Navbar></Navbar> */}
       {/* <SideBar></SideBar> */}
       <Router></Router>
       {/* <CartPage></CartPage> */}
    </>
}

export default App;

import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signup from './components/Signup';
import Login from './components/Login';
import Offer from './components/Offer';
import Cart from './components/Cart';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/admin' element={<Offer/>}/>
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

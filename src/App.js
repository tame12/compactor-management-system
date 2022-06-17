import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// Components
import NavbarComponent from './components/Navbar';
// Views
import Dashboard from './frontend/views/Dashboard';
import Logs from './frontend/views/Logs';
import StockIn from './frontend/views/StockIn';
import StockOut from './frontend/views/StockOut';

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarComponent></NavbarComponent>
        <Routes>
          <Route exact path="/" element={<Dashboard/>}/>
          <Route exact path="/stock-out" element={<StockOut/>}/>
          <Route exact path="/stock-in" element={<StockIn/>}/>
          <Route exact path="/logs" element={<Logs/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

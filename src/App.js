import React, {useState} from 'react';
// import './App.css';
import PrivateRoute from './components/Private-Route/PrivateRoute';
import localStorageService from './services/localStorageService';

function App() {
  //ถ้าใน getRole มี Token จะ set ให้เป็น user
  const [role, setRole] = useState(localStorageService.getRole())
 

  return (
    <div className="App">
      <PrivateRoute role= {role} setRole= {setRole}/>
    </div>
  );
}

export default App;

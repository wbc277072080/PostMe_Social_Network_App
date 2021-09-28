import React, {useState} from "react";
import logo from '../assets/images/logo.svg';
import TopBar from './TopBar';
import Main from './Main';
import {TOKEN_KEY} from "../constants";

function App() {
  //第一个是状态值，第二个是修改状态的函数
  // const [a,setA] =useState(10);
  const[isLoggedIn,setIsLoggedIn] = useState(
    localStorage.getItem(TOKEN_KEY)?true:false
  );

  const logout =()=>{
    console.log('logout...');
    localStorage.removeItem(TOKEN_KEY);
    setIsLoggedIn(false);
  }

  //user will call it in Login Component
  const loggedId=(token)=>{
    //store token
    if(token){
      localStorage.setItem(TOKEN_KEY,token);
    }
  }
  const loggedIn = (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      setIsLoggedIn(true);
    }
  };
 
  return (
    <div className="App">
        <TopBar 
          isLoggedIn = {isLoggedIn}
          handleLogout={logout}
        ></TopBar>
        <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn}/>
    </div>
  );
}

export default App;

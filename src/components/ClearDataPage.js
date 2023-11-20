import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


let del, pass, FinToken = localStorage.getItem('token')


export const ClearDataPage = () => {

  
  const handleClearDatabase = async () => {
  if(FinToken){
    try {
      del = prompt("Esti sigura? Alege (y/n)?");
      if (del === "y") {
        pass = prompt("Introdu parola ?");
          if (pass === "42281719") {
            await axios.patch(`https://servergc.onrender.com/cleardata`);
            alert("Elevii au fost mutați. Note nu sunt!");
          }else {
            alert("Parola gresită!")
          }
      } 
    } catch (error) {
      console.error("Error clearing elev database:", error);
    }
  }};
  
  return( 
    <div>
        <Link to = "/modify"><button class="home"><h3><b>Back</b></h3></button></Link> 
        <div class="container">
            <div class="center">
              <div class="center-align">Atenție!!!. Elevii se vor transfera cu o clasa mai mare:<br/>
              Notele se vor sterge!!!<br/><br/>
                <button class="cleardata"  onClick={handleClearDatabase}>Executa modificări </button>
              </div>
            </div>
        </div>
    </div>
  )}

export default ClearDataPage;

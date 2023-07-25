// HomePage.js
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const logo = require('./favicon0.png');


export const Home = () => {
    const [searchIDNP, setSearchIDNP] = useState('');
    const [searchedStudent, setSearchedStudent] = useState(null);
    const [searchError, setSearchError] = useState('');
    const [selectedSem, setSelectedSem] = useState('');


    const ShowElev = async (e) => {
      e.preventDefault();
      try {
        let response = axios.get(`https://servergc.onrender.com/elev/${searchIDNP}`);
        {selectedSem === "2"?
          response = await axios.get(`https://servergc.onrender.com/elev2/${searchIDNP}`):
          response = await axios.get(`https://servergc.onrender.com/elev/${searchIDNP}`)
        }
        
        setSearchedStudent(response.data);
        setSearchError('');

      } catch (error) {
        setSearchError('Server error'); 
        setSearchedStudent(null);
      }
    };


return (
 <div>
    <Link to = "/login" class="logout"><button><h3><b>Log In</b></h3></button></Link>
    <img src={logo} />
     <div class = "login-box">
      <h2>Search Elev:</h2>
      <form onSubmit={ShowElev}>
        <div class="user-box">
          <label>Search IDNP: </label> 
          <select value={selectedSem} onChange={(e) => setSelectedSem(e.target.value)}>
            <option value="1">Semestrul 1</option>
            <option value="2">Semestrul 2</option>
        </select>
            <input type="text" value={searchIDNP} onChange={(e) => setSearchIDNP(e.target.value)} />
        </div>
        <button type="submit" class="btn">Search</button>
      </form>

        {searchError && <p>{searchError}</p>}
        {searchedStudent && (
          <div>
            <h2>Elev Details:</h2>
          <div class="infof">
                      IDNP: {searchedStudent.IDNP} <br />
                      Name: {searchedStudent.Name} <br />
                      Surname: {searchedStudent.Surname}<br />
                      Class: {searchedStudent.Class} <br />
                      Romana: {searchedStudent.Romana} <br />
                      Eng/Fr: {searchedStudent.Engleza} <br />
                      Rusa: {searchedStudent.Rusa} <br />
                      Matematica: {searchedStudent.Mate} <br />
                      Istoria: {searchedStudent.Istoria} <br />
                      Geografia: {searchedStudent.Geografia} <br />
                        {(searchedStudent.Class === 7 || searchedStudent.Class === 8 || searchedStudent.Class === 9) && (
                          <React.Fragment>
                            Biologia: {searchedStudent.Biologia} <br />
                            Fizica: {searchedStudent.Fizica} <br />
                            Chimia: {searchedStudent.Chimia} <br />
                            Info: {searchedStudent.Info} <br />
                          </React.Fragment>
                        )}
                        {searchedStudent.Class === 6 && (
                          <React.Fragment>
                            Biologia: {searchedStudent.Biologia} <br />
                            Fizica: {searchedStudent.Fizica} <br />
                          </React.Fragment>
                        )}
                        {searchedStudent.Class === 5 && (
                          <React.Fragment>
                          Stiinte: {searchedStudent.Stiinte} <br />
                          </React.Fragment>
                        )}
                      {/* Biologia: {searchedStudent.Biologia} <br /> */}
                      Optional: {searchedStudent.Optional} <br />
                      <br/>
            <br/>
            </div>
          </div>)}
     </div>
         
</div>   
);

};

export default Home;

import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
const logo = require('./favicon0.png');

let FinToken = localStorage.getItem('token'), User = localStorage.getItem('username') ;

export const SubmitPage = () => {
  
  const username = User; // Provide the desired username here

  const [IDNP, setIdnp] = React.useState('');
  const [Name, setName] = React.useState('');
  const [Surname, setSurname] = React.useState('');
  const [Class, setClass] = React.useState('');
  const [Romana, setRomana] = React.useState('');
  const [Mate, setMate] = React.useState('');
  const [Info, setInfo] = React.useState('');
  const [Istoria, setIstoria] = React.useState('');
  const [Geografia, setGeografia] = React.useState('');
  const [Chimia, setChimia] = React.useState('');
  const [Fizica, setFizica] = React.useState('');
  const [Tehnologica, setTehnologica] = React.useState('');
  const [Muzica, setMuzica] = React.useState('');
  const [Plastica, setPlastica] = React.useState('');
  const [MSV, setMSV] = React.useState('');
  const [EdFizica, setEdFizica] = React.useState('');
  const [Stiinte, setStiinte] = React.useState('');
  const [Engleza, setEngleza] = React.useState('');
  const [Biologia, setBiologia] = React.useState('');
  const [Rusa, setRusa] = React.useState('');
  const [Optional, setOptional] = React.useState('');
  const [studentsData, setStudentsData] = useState([]);
  const [studentsDataSem, setStudentsDataSem] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [searchIDNP, setSearchIDNP] = useState('');
  const [searchedStudent, setSearchedStudent] = useState(null);
  const [findStudent, setFindStudent] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedClasSem, setSelectedClasSem] = useState('');
  const [selectedSem, setSelectedSem] = useState('');
  // let Obiecte = {Romana, Mate, Info, Istoria, Geografia, Chimia, Fizica, EdFizica, Stiinte, Engleza, Biologia, Rusa}
  let message = "";
    // adaugarea unui nou elev
    const AddStudent = async (e) => {
      e.preventDefault();
      if(FinToken){
        try {
          message = "";
          const studentData = { IDNP, Name, Surname, Class, Romana, Mate, Info, Istoria, Geografia, Chimia, Fizica, Tehnologica, Muzica, Plastica, MSV, EdFizica, Stiinte, Engleza, Biologia, Rusa, Optional  };
          let response;
          {selectedSem === "2"?
            response = await axios.post('https://servergc.onrender.com/newstud2', studentData):
            response = await axios.post('https://servergc.onrender.com/newstud', studentData)
          }
           
          console.log(response.data); // Success message from the server
          setIdnp('');
          setName('');
          setSurname('');
          setClass('');
          setRomana('');
          setMate('');
          setInfo('');
          setIstoria('');
          setGeografia('');
          setChimia('');
          setFizica('');
          setTehnologica('');
          setMuzica('');
          setPlastica('');
          setMSV('');
          setEdFizica('');
          setStiinte('');
          setEngleza('');
          setBiologia('');
          setRusa('');
          setOptional('');
          message = "Student successfully added.";
          alert(message);
        } catch (error) {
          message = "There was a problem adding the elev or elev existe.";
          alert(message);
          }
      }else 
        {
          message = "Te rog Logează-te";
          alert(message);
        }
    };

  // Toti elevii 
  const ShowElevi = async (e) => {
    e.preventDefault();
    if(FinToken){
      try {
          const studentData = { IDNP, Name, Surname, Class, Romana, Mate, Info, Istoria, Geografia, Chimia, Fizica, Tehnologica, Muzica, Plastica, MSV, EdFizica, Stiinte, Engleza, Biologia, Rusa, Optional };
          let response;
          {selectedSem === "2"?
            response = await axios.get('https://servergc.onrender.com/elevi2', studentData):
            response = await axios.get('https://servergc.onrender.com/elevi', studentData)
          }
          setStudentsDataSem('');
          setStudentsData(response.data);
          setResponseMessage('');
        }
        catch (error) {
        console.error('Error get med elev:', error.message);
      }
    }else 
      {
        message = "Te rog Logează-te";
        alert(message);
      }
  };


 //Un elev dupa idnp
  const ShowElev = async (e) => {
    e.preventDefault();
    if(FinToken){
      try {
        let response;
          {selectedSem === "2"?
            response = await axios.get(`https://servergc.onrender.com/elev2/${searchIDNP}`):
            response = await axios.get(`https://servergc.onrender.com/elev/${searchIDNP}`)
          }
        setSearchedStudent(response.data);
        setSearchError('');
      } catch (error) {
          if (error.response && error.response.status === 404) {
            setSearchError('Elevul nu a fost găsit');
          } else {
            setSearchError('Server error');
          }
          setSearchedStudent(null);
        }
    }
    else 
      {
        message = "Te rog Logează-te";
        alert(message);
      }
  };

 
 //Un elev in input pentru a putea modifica 
  const FindElev = async (e) => {
    e.preventDefault();
    if(FinToken){
      try {
        let response;
          {selectedSem === "2"?
            response = await axios.get(`https://servergc.onrender.com/elev2/${IDNP}`):
            response = await axios.get(`https://servergc.onrender.com/elev/${IDNP}`)
          }

        setFindStudent('');
        setName(response.data.Name);
        setSurname(response.data.Surname);
        setClass(response.data.Class);
        setRomana(response.data.Romana);
        setMate(response.data.Mate);
        setInfo(response.data.Info);
        setIstoria(response.data.Istoria);
        setGeografia(response.data.Geografia);
        setChimia(response.data.Chimia);
        setFizica(response.data.Fizica);
        setTehnologica(response.data.Tehnologica);
        setMuzica(response.data.Muzica);
        setPlastica(response.data.Plastica);
        setMSV(response.data.MSV);
        setEdFizica(response.data.EdFizica);
        setStiinte(response.data.Stiinte);
        setEngleza(response.data.Engleza);
        setBiologia(response.data.Biologia);
        setRusa(response.data.Rusa);
        setOptional(response.data.Optional);
        setSearchError('');
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setSearchError('Student not found');
        } else {
          setSearchError('Server error');
        }
        setFindStudent(null);
      } 
    }
    else 
      {
        message = "Te rog Logează-te";
        alert(message);
      }
  };
  
  //modificarea elev 
  const ModifyElev = async (e) => {
    e.preventDefault();
    if(FinToken){
      try {
        message = "";
        const studentData = { IDNP, Name, Surname, Class, Romana, Mate, Info, Istoria, Geografia, Chimia, Fizica, Tehnologica, Muzica, Plastica, MSV, EdFizica, Stiinte, Engleza, Biologia, Rusa, Optional };
        let response;
          {selectedSem === "2"?
            response = await axios.put(`https://servergc.onrender.com/modstud2/${IDNP}`, studentData):
            response = await axios.put(`https://servergc.onrender.com/modstud/${IDNP}`, studentData)
          }
        
        console.log(response.data); // Success message from the server
        setIdnp('');
        setName('');
        setSurname('');
        setClass('');
        setRomana('');
        setMate('');
        setInfo('');
        setIstoria('');
        setGeografia('');
        setChimia('');
        setFizica('');
        setTehnologica('');
        setMuzica('');
        setPlastica('');
        setMSV('');
        setEdFizica('');
        setStiinte('');
        setEngleza('');
        setBiologia('');
        setRusa('');
        setOptional('');
        message = "Elevul a fost modificat!";
        alert(message);
      } catch (error) {
        message = "Problema cu modificarea.";
        alert(message);
      }
    }else 
    {
      message = "Te rog Logează-te";
      alert(message);
    }


  };

  let del = "";
  const DelElev = async (e) => {
    e.preventDefault();
    if(FinToken){
      try {
        del = prompt("Ești sigur ca doresti sa ștergi elevul (y,n)?");
        if(del==='y') { 
          let response;
          {selectedSem === "2"?
            response = await axios.delete(`https://servergc.onrender.com/delstud2/${IDNP}`):
            response = await axios.delete(`https://servergc.onrender.com/delstud/${IDNP}`)
          }
        
          alert("Elev is deleted succes");
          console.log(response.data); // Success message from the server
          setResponseMessage('Elevul a fost șters!'); // Update the response message
        }
        else{
          alert("Elevul nu a fost șters");
        }
      } catch (error) {
        alert("Eror");
        console.error('A Aparut o eroare:', error.message);
        setResponseMessage('A Aparut o eroare.'); // Update the response message
      }
    }else 
    {
      message = "Te rog Logează-te";
      alert(message);
    }

  };

  
  const getStudentsByClass = async () => {
    if(FinToken){
      try {
        setStudentsData('');
        let response = "";
        {selectedSem === "2"?
          response = await axios.get(`https://servergc.onrender.com/getclass2?class=${selectedClass}`):
          response = await axios.get(`https://servergc.onrender.com/getclass?class=${selectedClass}`)
        }
        setStudentsData('');
        setStudentsDataSem('');
        setStudentsData(response.data);
        setResponseMessage('');
      } catch (error) {
        setResponseMessage("Nu sunt elevi in clasa dată");

        console.error('Eroare:', error.message);
      }
    }else 
    {
      message = "Te rog Logează-te";
      alert(message);
    }
  };

  const getStudentsByClassMed = async () => {
    if(FinToken){
      try {
        setStudentsDataSem('')
        setStudentsData('');
        let response = '';
        let newmed = '';

        if (selectedSem === "2") {
          newmed = await axios.get(`https://servergc.onrender.com/newmed2`)
          response = await axios.get(`https://servergc.onrender.com/getclassmed2?class=${selectedClasSem}`)
        } else {
          newmed = await axios.get(`https://servergc.onrender.com/newmed`)
          response = await axios.get(`https://servergc.onrender.com/getclassmed?class=${selectedClasSem}`)
        }

        console.log(newmed.data); 
        setStudentsDataSem(response.data);
        setResponseMessage('');
      } catch (error) {
        setResponseMessage("Students are not in this class");
      }
    }else 
    {
      message = "Te rog Logează-te";
      alert(message);
    }
  };


  const logout = async () => {
      try {
        localStorage.setItem('token', '')
      } catch (error) {
        console.error('Error', error.message);
      }
  };

  return (

    <div>

      <img src={logo} class="home" />  
      <section class = "user">{User}</section>
      <tr class="logout">
        <td >
          <Link to = "/"><button ><h3><b>Home</b></h3></button></Link>
        </td>
        <td>
          <Link to = "/login"><button onClick={logout}><h3><b>LogOut</b></h3></button></Link>
        </td>
      </tr>
      

    <div class = "login-box edit" >
      <form class="modify">
      <h2>Select Sem: 
      <select value={selectedSem} onChange={(e) => setSelectedSem(e.target.value)}>
          <option value="1">Semestrul 1</option>
          <option value="2">Semestrul 2</option>
        </select>
        </h2>

      <h2>Add/Modify elev:</h2>
        <tr>
         <td> IDNP:</td>
         <td> <input type="text" class="adds" value={IDNP} onChange={(e) => setIdnp(e.target.value)} /></td>
        </tr>

        <td colSpan={2}>Caută p/u a modifica <button onClick={FindElev} class = "admn">Caută</button><button onClick={DelElev} class = "admn">Șterge</button></td>

        <tr>
          <td> Nume:</td>
          <td> <input type="text" class="add" value={Name} onChange={(e) => setName(e.target.value)} /></td>
        </tr>

        <tr>
          <td>Prenume:</td>
          <td><input type="text" class="add" value={Surname} onChange={(e) => setSurname(e.target.value)} /></td>
        </tr>

        <tr>
        <td>Clasa:</td>
        <td> <input type="text" value={Class} onChange={(e) => setClass(e.target.value)} /></td>
        </tr>

        <tr>
        <td> Limba Romană:</td>
        <td> <input type="text" value={Romana} onChange={(e) => setRomana(e.target.value)} /></td>
        </tr>

        <tr>
        <td> Matematica:</td>
        <td> <input type="text" value={Mate} onChange={(e) => setMate(e.target.value)} /></td>
        </tr>
        
        <tr>
        <td> Informatica:</td>
        <td><input type="text" value={Info} onChange={(e) => setInfo(e.target.value)} /></td>
        </tr>
        
        <tr>
        <td> Istoria:</td>
        <td><input type="text" value={Istoria} onChange={(e) => setIstoria(e.target.value)} /></td>
        </tr>
        
        <tr>
        <td>Geografia:</td>
        <td><input type="text" value={Geografia} onChange={(e) => setGeografia(e.target.value)} /></td>
        </tr>
        
        <tr>
        <td>Chimia:</td>
        <td><input type="text" value={Chimia} onChange={(e) => setChimia(e.target.value)} /></td>
        </tr>
        
        <tr>
        <td>Fizica:</td>
        <td><input type="text" value={Fizica} onChange={(e) => setFizica(e.target.value)} /></td>
        </tr>

        <tr>
        <td>Tehnologica:</td>
        <td><input type="text" value={Tehnologica} onChange={(e) => setTehnologica(e.target.value)} /></td>
        </tr>

        <tr>
        <td>Muzica:</td>
        <td><input type="text" value={Muzica} onChange={(e) => setMuzica(e.target.value)} /></td>
        </tr>

        <tr>
        <td>Plastica:</td>
        <td><input type="text" value={Plastica} onChange={(e) => setPlastica(e.target.value)} /></td>
        </tr>

        <tr>
        <td>Ed p/u Soc:</td>
        <td><input type="text" value={MSV} onChange={(e) => setMSV(e.target.value)} /></td>
        </tr>

        <tr>
        <td>Ed Fizica:</td>
        <td><input type="text" value={EdFizica} onChange={(e) => setEdFizica(e.target.value)} /></td>
        </tr>
        
        <tr>
        <td>Știinte:</td>
        <td> <input type="text" value={Stiinte} onChange={(e) => setStiinte(e.target.value)} /></td>
        </tr>

        <tr>
        <td>Engl/Fr:</td>
        <td><input type="text" value={Engleza} onChange={(e) => setEngleza(e.target.value)} /></td>
        </tr>

        <tr>
        <td>Biologia:</td>
        <td><input type="text" value={Biologia} onChange={(e) => setBiologia(e.target.value)} /></td>
        </tr>

        <tr>
        <td>Rusa:</td>
        <td><input type="text" value={Rusa} onChange={(e) => setRusa(e.target.value)} /></td>
        </tr>

        <tr>
        <td>Optional:</td>
        <td><input type="text" value={Optional} onChange={(e) => setOptional(e.target.value)} /></td>
        </tr>

      </form>
        <button onClick={ShowElevi} class = "admn">Toti Elevii</button>
        <button onClick={ModifyElev} class = "admn">Modifică</button>
        <button onClick={AddStudent} class = "admn">Adaugă Elev</button><br />

      <h2>Caută Elev:</h2>
      <form onSubmit={ShowElev} class = "search">
        <label>
          By IDNP:
          <input type="text" value={searchIDNP} onChange={(e) => setSearchIDNP(e.target.value)} />
        </label>
        <button type="submit" class = "admn">Search</button>
      </form><br/>
      
      
      {findStudent }
      {findStudent && (
        setName(findStudent.Name),
        setSurname(findStudent.Surname),
        setClass(findStudent.Class),
        setRomana(findStudent.Romana),
        setMate(findStudent.Mate),
        setInfo(findStudent.Info),
        setIstoria(findStudent.Istoria),
        setGeografia(findStudent.Geografia),
        setChimia(findStudent.Chimia),
        setFizica(findStudent.Fizica),
        setTehnologica(findStudent.Tehnologica),
        setMuzica(findStudent.Muzica),
        setPlastica(findStudent.Plastica),
        setMSV(findStudent.MSV),
        setEdFizica(findStudent.EdFizica),
        setStiinte(findStudent.Stiinte),
        setEngleza(findStudent.Engleza),
        setBiologia(findStudent.Biologia),
        setRusa(findStudent.Rusa),
        setOptional(findStudent.Optional)
        
      )}


      <div>
       <label class = "search">
        Selectează Clasa: 
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">Toți</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
          <button onClick={getStudentsByClass} class = "admn">Afișează elevii</button>
      </label>
      <ul>
      </ul>
     </div>

    <div>
     <h2>Afișează mediile:</h2>
     <label class = "search">
     Selectează Clasa:  
        <select value={selectedClasSem} onChange={(e) => setSelectedClasSem(e.target.value)}>
        <option value="">Toți</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select> 
        
          <button onClick={getStudentsByClassMed} class = "admn">Afișează Medie</button>

        {User ? (
          <div>
            {User === "DirectorAdmin" ? 
            <div>Doar la inceputul unui an nou <Link to = "/about" ><button class="clr"><h3><b>An nou</b></h3></button></Link></div>:
            console.log("user")}
          </div>
        ) : (
        console.log("err")
        )}

      </label>
      </div>
    </div>

    {searchError && <p class = "elevdet">{searchError}</p>}
      {searchedStudent && (
        <div class="elevdet">
          <h2>Elev Details:</h2>
                      IDNP: {searchedStudent.IDNP} <br />
                      Nume: {searchedStudent.Name} <br />
                      Prenume: {searchedStudent.Surname}<br />
                      Clasa: {searchedStudent.Class} <br />
                      Limba Romana: {searchedStudent.Romana} <br />
                      Engleza/Franceza: {searchedStudent.Engleza} <br />
                      Limba Rusa: {searchedStudent.Rusa} <br />
                      Matematica: {searchedStudent.Mate} <br />
                      Istoria: {searchedStudent.Istoria} <br />
                      Geografia: {searchedStudent.Geografia} <br />
                      Ed. p/u Soc: {searchedStudent.MSV} <br />
                      Optional: {searchedStudent.Optional} <br />
                        {searchedStudent.Class === 5 && (
                          <React.Fragment>
                          Ed. Muzicală: {searchedStudent.Muzica} <br />
                          Ed. Tehnologică: {searchedStudent.Tehnologica} <br />
                          Ed. Plastică: {searchedStudent.Plastica} <br />
                          Ed. Fizică: {searchedStudent.EdFizica} <br />
                          Știinta: {searchedStudent.Stiinte} <br />
                          </React.Fragment>
                        )}
                        {searchedStudent.Class === 6 && (
                          <React.Fragment>
                            Biologia: {searchedStudent.Biologia} <br />
                            Fizica: {searchedStudent.Fizica} <br />
                            Ed. Muzicală: {searchedStudent.Muzica} <br />
                            Ed. Plastică: {searchedStudent.Plastica} <br />
                            Ed. Tehnologică: {searchedStudent.Tehnologica} <br />
                            Ed. Fizică: {searchedStudent.EdFizica} <br />
                          </React.Fragment>
                        )}
                        {searchedStudent.Class === 7 && (
                          <React.Fragment>
                            Biologia: {searchedStudent.Biologia} <br />
                            Fizica: {searchedStudent.Fizica} <br />
                            Chimia: {searchedStudent.Chimia} <br />
                            Informatica: {searchedStudent.Info} <br />
                            Ed. Muzicală: {searchedStudent.Muzica} <br />
                            Ed. Plastică: {searchedStudent.Plastica} <br />
                            Ed. Tehnologică: {searchedStudent.Tehnologica} <br />
                            Ed. Fizică: {searchedStudent.EdFizica} <br />
                          </React.Fragment>
                        )}
                        {searchedStudent.Class === 8  && (
                          <React.Fragment>
                            Biologia: {searchedStudent.Biologia} <br />
                            Fizica: {searchedStudent.Fizica} <br />
                            Chimia: {searchedStudent.Chimia} <br />
                            Informatica: {searchedStudent.Info} <br />
                            Ed. Muzicală: {searchedStudent.Muzica} <br />
                            Ed. Tehnologică: {searchedStudent.Tehnologica} <br />
                            Ed. Fizică: {searchedStudent.EdFizica} <br />
                          </React.Fragment>
                        )}
                        {searchedStudent.Class === 9 && (
                          <React.Fragment>
                            Biologia: {searchedStudent.Biologia} <br />
                            Fizica: {searchedStudent.Fizica} <br />
                            Chimia: {searchedStudent.Chimia} <br />
                            Informatica: {searchedStudent.Info} <br />
                            Ed. Tehnologică: {searchedStudent.Tehnologica} <br />
                            Ed. Fizică: {searchedStudent.EdFizica} <br />
                          </React.Fragment>
                        )}
                    <br/>
          <br/>
        </div>)}

      <p class = "info">  {responseMessage}</p>
      { studentsData.length > 0 && (
        <div class="search">
          <h2>Elevi notes:</h2>
          <ol>
                {studentsData.map((student, index) => (
                  <li key={index}>
                      IDNP: {student.IDNP} <br />
                      Nume: {student.Name} <br />
                      Prenume: {student.Surname}<br />
                      Clasa: {student.Class} <br />
                      Limba Romana: {student.Romana} <br />
                      Engleza/Franceza: {student.Engleza} <br />
                      Limba Rusa: {student.Rusa} <br />
                      Matematica: {student.Mate} <br />
                      Istoria: {student.Istoria} <br />
                      Geografia: {student.Geografia} <br />
                      Ed. p/u Soc: {student.MSV} <br />
                      Optional: {student.Optional} <br />
                        {student.Class === 5 && (
                          <React.Fragment>
                          Ed. Muzicală: {student.Muzica} <br />
                          Ed. Tehnologică: {student.Tehnologica} <br />
                          Ed. Plastică: {student.Plastica} <br />
                          Ed. Fizică: {student.EdFizica} <br />
                          Știinta: {student.Stiinte} <br />
                          </React.Fragment>
                        )}
                        {student.Class === 6 && (
                          <React.Fragment>
                            Biologia: {student.Biologia} <br />
                            Fizica: {student.Fizica} <br />
                            Ed. Muzicală: {student.Muzica} <br />
                            Ed. Plastică: {student.Plastica} <br />
                            Ed. Tehnologică: {student.Tehnologica} <br />
                            Ed. Fizică: {student.EdFizica} <br />
                          </React.Fragment>
                        )}
                        {student.Class === 7 && (
                          <React.Fragment>
                            Biologia: {student.Biologia} <br />
                            Fizica: {student.Fizica} <br />
                            Chimia: {student.Chimia} <br />
                            Informatica: {student.Info} <br />
                            Ed. Muzicală: {student.Muzica} <br />
                            Ed. Plastică: {student.Plastica} <br />
                            Ed. Tehnologică: {student.Tehnologica} <br />
                            Ed. Fizică: {student.EdFizica} <br />
                          </React.Fragment>
                        )}
                        {student.Class === 8  && (
                          <React.Fragment>
                            Biologia: {student.Biologia} <br />
                            Fizica: {student.Fizica} <br />
                            Chimia: {student.Chimia} <br />
                            Informatica: {student.Info} <br />
                            Ed. Muzicală: {student.Muzica} <br />
                            Ed. Tehnologică: {student.Tehnologica} <br />
                            Ed. Fizică: {student.EdFizica} <br />
                          </React.Fragment>
                        )}
                        {student.Class === 9 && (
                          <React.Fragment>
                            Biologia: {student.Biologia} <br />
                            Fizica: {student.Fizica} <br />
                            Chimia: {student.Chimia} <br />
                            Informatica: {student.Info} <br />
                            Ed. Tehnologică: {student.Tehnologica} <br />
                            Ed. Fizică: {student.EdFizica} <br />
                          </React.Fragment>
                        )}
                    <br/>
                  </li>
            ))}
          </ol>
        </div>
      )}
     

      {studentsDataSem.length > 0 && (
        <div class="search">
          <h2>Elevi Medie:</h2>
          <ol>
          {studentsDataSem.map((student, index) => (
                  <li key={index}>
                      IDNP: {student.IDNP} <br />
                      Nume: {student.Name} <br />
                      Prenume: {student.Surname}<br />
                      Clasa: {student.Class} <br />
                      Limba Romana: {student.Romana} <br />
                      Engleza/Franceza: {student.Engleza} <br />
                      Limba Rusa: {student.Rusa} <br />
                      Matematica: {student.Mate} <br />
                      Istoria: {student.Istoria} <br />
                      Geografia: {student.Geografia} <br />
                      Ed. p/u Soc: {student.MSV} <br />
                      Optional: {student.Optional} <br />
                        {student.Class === 5 && (
                          <React.Fragment>
                          Ed. Muzicală: {student.Muzica} <br />
                          Ed. Tehnologică: {student.Tehnologica} <br />
                          Ed. Plastică: {student.Plastica} <br />
                          Ed. Fizică: {student.EdFizica} <br />
                          Știinta: {student.Stiinte} <br />
                          </React.Fragment>
                        )}
                        {student.Class === 6 && (
                          <React.Fragment>
                            Biologia: {student.Biologia} <br />
                            Fizica: {student.Fizica} <br />
                            Ed. Muzicală: {student.Muzica} <br />
                            Ed. Plastică: {student.Plastica} <br />
                            Ed. Tehnologică: {student.Tehnologica} <br />
                            Ed. Fizică: {student.EdFizica} <br />
                          </React.Fragment>
                        )}
                        {student.Class === 7 && (
                          <React.Fragment>
                            Biologia: {student.Biologia} <br />
                            Fizica: {student.Fizica} <br />
                            Chimia: {student.Chimia} <br />
                            Informatica: {student.Info} <br />
                            Ed. Muzicală: {student.Muzica} <br />
                            Ed. Plastică: {student.Plastica} <br />
                            Ed. Tehnologică: {student.Tehnologica} <br />
                            Ed. Fizică: {student.EdFizica} <br />
                          </React.Fragment>
                        )}
                        {student.Class === 8  && (
                          <React.Fragment>
                            Biologia: {student.Biologia} <br />
                            Fizica: {student.Fizica} <br />
                            Chimia: {student.Chimia} <br />
                            Informatica: {student.Info} <br />
                            Ed. Muzicală: {student.Muzica} <br />
                            Ed. Tehnologică: {student.Tehnologica} <br />
                            Ed. Fizică: {student.EdFizica} <br />
                          </React.Fragment>
                        )}
                        {student.Class === 9 && (
                          <React.Fragment>
                            Biologia: {student.Biologia} <br />
                            Fizica: {student.Fizica} <br />
                            Chimia: {student.Chimia} <br />
                            Informatica: {student.Info} <br />
                            Ed. Tehnologică: {student.Tehnologica} <br />
                            Ed. Fizică: {student.EdFizica} <br />
                          </React.Fragment>
                        )}
                    <br/>
                  </li>
            ))}
          </ol>
        </div>
      )}


    </div>
  );
};

export default SubmitPage;

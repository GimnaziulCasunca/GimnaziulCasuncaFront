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
  // let Obiecte = {Romana, Mate, Info, Istoria, Geografia, Chimia, Fizica, Ed_Fiz, Stiinte, Engleza, Biologia, Rusa}
  let message = "";
    // adaugarea unui nou elev
    const AddStudent = async (e) => {
      e.preventDefault();
      if(FinToken){
        try {
          message = "";
          const studentData = { IDNP, Name, Surname, Class, Romana, Mate, Info, Istoria, Geografia, Chimia, Fizica, Stiinte, Engleza, Biologia, Rusa, Optional  };
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
          message = "Please login";
          alert(message);
        }
    };

  // Toti elevii 
  const ShowElevi = async (e) => {
    e.preventDefault();
    if(FinToken){
      try {
          const studentData = { IDNP, Name, Surname, Class, Romana, Mate, Info, Istoria, Geografia, Chimia, Fizica, Stiinte, Engleza, Biologia, Rusa, Optional };
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
        message = "Please login";
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
            setSearchError('Student not found');
          } else {
            setSearchError('Server error');
          }
          setSearchedStudent(null);
        }
    }
    else 
      {
        message = "Please login";
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
        message = "Please login";
        alert(message);
      }
  };
  
  //modificarea elev 
  const ModifyElev = async (e) => {
    e.preventDefault();
    if(FinToken){
      try {
        message = "";
        const studentData = { IDNP, Name, Surname, Class, Romana, Mate, Info, Istoria, Geografia, Chimia, Fizica, Stiinte, Engleza, Biologia, Rusa, Optional };
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
        setStiinte('');
        setEngleza('');
        setBiologia('');
        setRusa('');
        setOptional('');
        message = "Student successfully modify.";
        alert(message);
      } catch (error) {
        message = "There was a problem modify the elev.";
        alert(message);
      }
    }else 
    {
      message = "Please login";
      alert(message);
    }


  };

  let del = "";
  const DelElev = async (e) => {
    e.preventDefault();
    if(FinToken){
      try {
        del = prompt("Are you sure you want to delete the elev (y,n)?");
        if(del==='y') { 
          let response;
          {selectedSem === "2"?
            response = await axios.delete(`https://servergc.onrender.com/delstud2/${IDNP}`):
            response = await axios.delete(`https://servergc.onrender.com/delstud/${IDNP}`)
          }
        
          alert("Elev is deleted succes");
          console.log(response.data); // Success message from the server
          setResponseMessage('Student deleted successfully.'); // Update the response message
        }
        else{
          alert("Student wasn't deleted");
        }
      } catch (error) {
        alert("Eror");
        console.error('Error deleting student:', error.message);
        setResponseMessage('There was a problem deleting the student.'); // Update the response message
      }
    }else 
    {
      message = "Please login";
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
        setResponseMessage("Students are not in this class");

        console.error('Error axiosing students by class:', error.message);
      }
    }else 
    {
      message = "Please login";
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
      message = "Please login";
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
      

    <div class = "login-box">
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

        <td colSpan={2}><button onClick={FindElev} class = "admn">Find</button>
        <button onClick={DelElev} class = "admn">Delete</button></td>

        <tr>
          <td> Name:</td>
          <td> <input type="text" class="add" value={Name} onChange={(e) => setName(e.target.value)} /></td>
        </tr>

        <tr>
          <td>Surname:</td>
          <td><input type="text" class="add" value={Surname} onChange={(e) => setSurname(e.target.value)} /></td>
        </tr>

        <tr>
        <td>Class:</td>
        <td> <input type="text" value={Class} onChange={(e) => setClass(e.target.value)} /></td>
        </tr>

        <tr>
        <td> Romana:</td>
        <td> <input type="text" value={Romana} onChange={(e) => setRomana(e.target.value)} /></td>
        </tr>

        <tr>
        <td> Matematica:</td>
        <td> <input type="text" value={Mate} onChange={(e) => setMate(e.target.value)} /></td>
        </tr>
        
        <tr>
        <td> Info:</td>
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
        <td>Știinte:</td>
        <td> <input type="text" value={Stiinte} onChange={(e) => setStiinte(e.target.value)} /></td>
        </tr>

        <tr>
        <td>Engleza:</td>
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
        <td>Opțional:</td>
        <td><input type="text" value={Optional} onChange={(e) => setOptional(e.target.value)} /></td>
        </tr>

      </form>
        <button onClick={ShowElevi} class = "admn">Show All</button>
        <button onClick={ModifyElev} class = "admn">Modify</button>
        <button onClick={AddStudent} class = "admn">Add Elev</button><br />

      <h2>Search Elev:</h2>
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
        setStiinte(findStudent.Stiinte),
        setEngleza(findStudent.Engleza),
        setBiologia(findStudent.Biologia),
        setRusa(findStudent.Rusa),
        setOptional(findStudent.Optional)
        
      )}


      <div>
       <label class = "search">
        Select Class: 
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">All</option>
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
          <button onClick={getStudentsByClass} class = "admn">Get Students</button>
      </label>
      <ul>
      </ul>
     </div>

    <div>
     <h2>Get Medie:</h2>
     <label class = "search">
        Select Class:  
        <select value={selectedClasSem} onChange={(e) => setSelectedClasSem(e.target.value)}>
        <option value="">All</option>
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
        
          <button onClick={getStudentsByClassMed} class = "admn">Get Medie</button>

        {User ? (
          <div>
            {User === "DirectorAdmin" ? 
            <div>Doar la inceputul unui an nou <Link to = "/about" ><button class="clr"><h3><b>Next Year</b></h3></button></Link></div>:
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
        </div>)}

      <p class = "info">  {responseMessage}</p>
      { studentsData.length > 0 && (
        <div class="search">
          <h2>Elevi notes:</h2>
          <ol>
                {studentsData.map((student, index) => (
                  <li key={index}>
                    IDNP: {student.IDNP} <br />
                    Name: {student.Name} <br />
                    Surname: {student.Surname}<br /> 
                    Class: {student.Class} <br />
                    Romana: {student.Romana} <br />
                    Eng/Fr: {student.Engleza} <br />
                    Rusa: {student.Rusa} <br />
                    Matematica: {student.Mate} <br />
                    Istoria: {student.Istoria} <br />
                    Geografia: {student.Geografia} <br />
                      {(student.Class === 7 || student.Class === 8 || student.Class === 9) && (
                        <React.Fragment>
                          Biologia: {student.Biologia} <br />
                          Fizica: {student.Fizica} <br />
                          Chimia: {student.Chimia} <br />
                          Info: {student.Info} <br />
                        </React.Fragment>
                      )}
                      {student.Class === 6 && (
                        <React.Fragment>
                          Biologia: {student.Biologia} <br />
                          Fizica: {student.Fizica} <br />
                        </React.Fragment>
                      )}
                      {student.Class === 5 && (
                        <React.Fragment>
                         Stiinte: {student.Stiinte} <br />
                        </React.Fragment>
                      )}
                    {/* Biologia: {student.Biologia} <br /> */}
                    Optional: {student.Optional} <br />
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
                    Name: {student.Name} <br />
                    Surname: {student.Surname}<br />
                    Class: {student.Class} <br />
                    Romana: {student.Romana} <br />
                    Eng/Fr: {student.Engleza} <br />
                    Rusa: {student.Rusa} <br />
                    Matematica: {student.Mate} <br />
                    Istoria: {student.Istoria} <br />
                    Geografia: {student.Geografia} <br />
                      {(student.Class === 7 || student.Class === 8 || student.Class === 9) && (
                        <React.Fragment>
                          Biologia: {student.Biologia} <br />
                          Fizica: {student.Fizica} <br />
                          Chimia: {student.Chimia} <br />
                          Info: {student.Info} <br />
                        </React.Fragment>
                      )}
                      {student.Class === 6 && (
                        <React.Fragment>
                          Biologia: {student.Biologia} <br />
                          Fizica: {student.Fizica} <br />
                        </React.Fragment>
                      )}
                      {student.Class === 5 && (
                        <React.Fragment>
                         Stiinte: {student.Stiinte} <br />
                        </React.Fragment>
                      )}
                    {/* Biologia: {student.Biologia} <br /> */}
                    Optional: {student.Optional} <br />
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

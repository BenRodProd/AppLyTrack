import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { getDb } from '../page/config';
import { collection, updateDoc, doc, query, orderBy, onSnapshot, serverTimestamp, addDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import JobCard from './JobCard';
import AddNewJob from './AddNewJob';
import { styled } from 'styled-components';
import Stats from './Stats';

const Title = styled.h1`
display:flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin:auto;
margin-bottom:20px;
background: lightblue;
border-radius: 10px;
padding: 20px;
opacity: 0.9;
box-shadow: 0 0 10px lightblue;
width:80vw;

`

const StyledButton = styled.button`
background-color: transparent;
font-size: 3rem;
font-weight: bold;
color: lightgreen;
text-shadow: 0px 0px 15px darkgreen;
border:none;
cursor: pointer;
align-items: center;
margin:auto;



border-radius: 50%;
`
const LettersApp = styled.div`
font-family: 'Courier New', Courier, monospace;
font-size: 3rem;
color: green;
font-weight: bold;
`
const LettersLy = styled.div`
font-family: 'Courier New', Courier, monospace;
font-size: 3rem;
color: blue;
font-weight: bold;

`
const LettersTrack = styled.div`
font-family: 'Courier New', Courier, monospace;
font-size: 3rem;
color: red;
font-weight: bold;

`

const MainStyle = styled.div`
    display:flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin:auto;
    padding:20px;
    
    `

const TopStyle = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
   
    width:100%;
    `

const StyledSortImage = styled.img`
    width:50px;
    height:50px;
    right:2rem;
    top:2rem;
    z-index:0;
    filter: brightness(3);
    cursor: pointer;
    `
const StyledSelect = styled.select`
display: ${props => (props.isVisible ? 'block' : 'none')};
    `
const StyledMain = styled.main`
  display:grid;
    height:100%;
    align-items: space-evenly;
    justify-content: space-evenly;
    padding: 20px;
    margin: auto;
    
    border-radius: 10px;
    
    

    @media (min-width: 400px) {
     
    }
    @media (min-width: 770px) {
      display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    }
    @media (min-width: 1000px) {
      display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    }
    `
const MainList = ({user}) => {
    const q = query(collection(getDb(), 'ApplyTrack'), orderBy('timestamp', 'desc'));
    const [jobs, setJobs] = useState([]);
    const [addNewJob, setAddNewJob] = useState(false);
    const [statsActive, setStatsActive] = useState(false);
    const [deleted, setDeleted] = useState(false)
    const [sorting, setSorting] = useState("date")
    const [sortIsVisible, setSortIsVisible] = useState(false);
    useEffect(() => {
        onSnapshot(q, (snapshot) => {
            const filteredJobs = snapshot.docs
            .filter((doc) => doc.data().user === user)
            .map((doc) => ({ id: doc.id, ...doc.data() }));
          setJobs(filteredJobs);
        })
    },[])
 useEffect(() => {
   if (sorting === "name") {
    const sortedByName = [...jobs].sort((a, b) =>
    a.company.localeCompare(b.company, undefined, {
      sensitivity: 'base',
      ignorePunctuation: true,
    })
  );
  setJobs(sortedByName);
   }
if (sorting ==="date") {
  const sortedByDate = [...jobs].sort(
    (a, b) => a.timestamp - b.timestamp
  );
  setJobs(sortedByDate);
}
if (sorting === "state") {
const sortedByState = [...jobs].sort((a, b) => {
  const states = {
    dismissed: 1,
    applied: 2,
    none: 3,
  };
  return states[a.abgelehnt ? 'dismissed' : a.beworben ? 'applied' : 'none'] -
    states[b.abgelehnt ? 'dismissed' : b.beworben ? 'applied' : 'none'];
});
setJobs(sortedByState)
}

 },[sorting])
    const navigate = useNavigate();
    function onLogout() {
    auth.signOut();
    navigate("/sign-in");
  }
  const addJob = (e) => {
    e.preventDefault();
   
    addDoc(collection(getDb(), 'ApplyTrack'), {
      company: e.target.company.value,
      beworben: e.target.beworben.checked,
      abgelehnt: e.target.abgelehnt.checked,
      comment: e.target.comment.value,
      beworbenDate: e.target.beworbenDate.value,
      abgelehntDate: e.target.abgelehntDate.value,
      user:user,
      url: e.target.url.value,
      timestamp: serverTimestamp(),
    });
  }
  const handleSortChange = (selectedOption) => {
  
    setSorting(selectedOption.target.value);
    setSortIsVisible(false)

  };





  const handleToggleVisibility = () => {
    setSortIsVisible(!sortIsVisible); // Toggle dropdown visibility when the image is clicked
  };
  const handleUpdate = (updatedJob) => {
    const docRef = doc(getDb(), 'ApplyTrack', updatedJob.id);
    updateDoc(docRef, {
      company: updatedJob.company,
      beworben: updatedJob.beworben,
      abgelehnt: updatedJob.abgelehnt,
      beworbenDate: updatedJob.beworbenDate,
      abgelehntDate: updatedJob.abgelehntDate,
      comment: updatedJob.comment,
      user:user,
      url: updatedJob.url,
    })
      .then(() => {
     
        // Perform any additional actions after successful update
      })
      .catch((error) => {
   
        // Handle the error if necessary
      });
  };
const handleDelete = (id) => {
    deleteDoc(doc(getDb(), 'ApplyTrack', id));
    setDeleted(true)
}
 useEffect(() => {
    if (!user) {
        navigate("/sign-in");
       }
 },[])
  
      
   
    return(
      <>
          <Title>
            
                <LettersApp>App</LettersApp>
                <LettersLy>Ly</LettersLy>
                <LettersTrack>Track</LettersTrack>
                </Title>
                <TopStyle>  
                <div>
                    <StyledButton onClick={() =>setAddNewJob(prevState => !prevState)}>+</StyledButton>
                    {addNewJob && (
                      <AddNewJob addJob={addJob} />
                    )}
                    </div>
                    <div>
                      <StyledButton onClick = {() => setStatsActive(prevState => !prevState)} type="button"><img src="./stats.png" alt="stats" width="70px" /> </StyledButton>
                    </div>
                    <div>
           <StyledButton onClick={onLogout}>
                        <img src="./off.png" alt="off" width="50px"/>
                    </StyledButton>
          </div>
                      </TopStyle>
        <MainStyle>
          <StyledSortImage src="./sort.png" alt="sort"  onClick={handleToggleVisibility}/>
          <StyledSelect isVisible={sortIsVisible} onChange={handleSortChange}>
        <option selected value="">Sort by</option>
        <option value="name">Name</option>
        <option value="date">Date</option>
        <option value="state">State</option>
      </StyledSelect>
         <StyledMain>
                {jobs.map(job => {
                    return(
                     
                            <JobCard handleUpdate={handleUpdate} handleDelete={handleDelete} key={job.id} job={job}/>
                     
                    )
                })
                }
                  
                
                
          </StyledMain>
                    
              {statsActive && (
                  <Stats deleted={deleted} setDeleted={setDeleted} handleUpdate={handleUpdate} handleDelete={handleDelete} jobs={jobs}/>
              )}
          </MainStyle>
        </>
    )
}

export default MainList;
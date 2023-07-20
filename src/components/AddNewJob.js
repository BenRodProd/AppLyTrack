import { useState } from "react";
import { styled } from "styled-components"
import paste from "../paste.png";

const StyledCard = styled.form`
  display: flex;
  position:absolute;
  z-index:10;
  left:2%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
  margin: 20px;
  width:80%;
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: 5px 5px 10px black;
  background-color: ${props => (props.dismissed ? "red" : "aliceblue")};
 
  opacity: 0.99;
  
`;
const StyledInput = styled.input`
  margin: 10px;
  text-align: center;
  border: 1px solid black;
  border-radius: 10px;
  height: 2rem;
  width: 50%;
`;
const StyledClipboard = styled.button`
  background-color:transparent;
`
const StyledTextArea = styled.textarea`
  margin: 10px;
  text-align: center;
  border: 1px solid black;
  border-radius: 10px;
  height: 4rem;
  width: 50%;
`;

const StyledUrlField = styled.div`
  display: flex;
  flex-direction: row;
  width: 93%;
  align-items: center;
  justify-content: center;
`
export default function AddNewJob ({addJob, setAddNewJob}) {
    const [urlText, setUrlText] = useState("");

    async function copyUrl() {
        const clipBoard = await navigator.clipboard.readText()
      
        setUrlText(clipBoard)
    }
function handleSubmit(e) {
    e.preventDefault();
    addJob(e)
    setAddNewJob(false)
}
    return(
        <>
                        <StyledCard id="NewJobForm" onSubmit = {(e)=>handleSubmit(e)}>
                     <h2>Add New Job</h2>
                        <StyledInput autoComplete="off" placeholder = "company" name ="company" required></StyledInput> 
                        <StyledUrlField>
                        <StyledInput autoComplete="off" readOnly name="url" value={urlText} ></StyledInput>
                      <StyledClipboard type="button" onClick = {()=>{copyUrl()}}><img src={paste} alt="paste" width="25" height="25"/></StyledClipboard>
                      
                        </StyledUrlField>
                      <label htmlFor ="beworben">applied</label>
                       <StyledInput id="beworben" name = "beworben" type ="checkbox" ></StyledInput>
                       <StyledInput name="beworbenDate" type ="date" ></StyledInput>
                       <label htmlFor ="abgelehnt">dismissed</label>
                       <StyledInput id="abgelehnt" name="abgelehnt" type ="checkbox" ></StyledInput>
                       <StyledInput name="abgelehntDate" type ="date" ></StyledInput>
                       <StyledTextArea autoComplete="off" maxLength={80} type = "textarea" name ="comment" style={{textAlign: "center", height: "4rem"}} ></StyledTextArea>
                       <button type ="submit">Submit</button>
                     
                       </StyledCard>
          
        </>
    )
}
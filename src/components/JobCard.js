import { useEffect, useState } from "react";
import { styled } from "styled-components";
import trash from "../trash.png";
import x from "../x.png"
import expand from "../expand.png"
const StyledCard = styled.div`
  display: inline-block;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
  margin: 20px;
  height: ${props => props.$expand === "true" ? "auto" : "3rem"};
  max-width: 350px;
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: 5px 5px 10px black;
  background-color: ${props => (props.$dismissed === "true" ? "red" : "aliceblue")};
  overflow: hidden;
  opacity: 0.9;
  
`;

const CloseIcon = styled.span`
position:absolute;
left: 0;
top: 5px;
  cursor: pointer;
  text-align: left;
  align-self: flex-start;
  margin: 10px;
  margin-top:0;
`;

const StyledInput = styled.input`
  margin: 10px;
  text-align: center;
  border: 1px solid black;
  border-radius: 10px;
  height: 2rem;
`;
const DeleteIcon = styled.span`

position:absolute;
right:0;
top: 0;

  cursor: pointer;
  text-align: right;
  align-self: flex-end;
  margin: 10px;
  margin-top:0;
`;
const ExpandIcon = styled.span`

position:absolute;
left:0;
top: 0;

  cursor: pointer;
  text-align: right;
  align-self: flex-end;
  margin: 10px;
  margin-top:0;
  
`;
const StyledTop = styled.span`
display:flex;
position:relative;
width:100%;

flex-direction: row;



`

export default function JobCard({job, handleDelete, handleUpdate, stats, setSelectedEvent }) {
  const [company, setCompany] = useState(job.company);
  const [url, setUrl] = useState(job.url);
  const [beworben, setBeworben] = useState(job.beworben);
  const [abgelehnt, setAbgelehnt] = useState(job.abgelehnt);
  const [comment, setComment] = useState(job.comment);
  const [beworbenDate, setBeworbenDate] = useState(job.beworbenDate);
  const [abgelehntDate, setAbgelehntDate] = useState(job.abgelehntDate);
  const [expanded, setExpanded] = useState(false);

  function handleCompanyChange(event) {
    setCompany(event.target.value);
  }

  function handleUrlChange(event) {
    setUrl(event.target.value);
  }

  function handleBeworbenDateChange(event) {
    setBeworbenDate(event.target.value);
  }

  function handleAbgelehntDateChange(event) {
    setAbgelehntDate(event.target.value);
  }

  function handleBeworbenChange(event) {
    setBeworben(event.target.checked);
  }

  function handleAbgelehntChange(event) {
    setAbgelehnt(event.target.checked);
  }

  function handleCommentChange(event) {
    setComment(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const updatedJob = {
      ...job,
      company,
      url,
      beworben,
      abgelehnt,
      comment,
      beworbenDate,
      abgelehntDate
    };
    handleUpdate(updatedJob);
  }

  return (
    <>
      <StyledCard $expand = {expanded.toString()} $dismissed={abgelehnt ? "true" : "false"}>
      <StyledTop>
        {stats && 
        <CloseIcon><img src = {x} onClick={() => setSelectedEvent(null)} alt="close" width="20px" height="20px"/></CloseIcon>
      }
        <ExpandIcon onClick={() => setExpanded(!expanded)}><img src={expand} alt="expand" width="12px" height="25px"/></ExpandIcon>
        <DeleteIcon onClick={() => handleDelete(job.id)}><img src={trash} alt = "delete" width="20px" height="30px"/></DeleteIcon>
        </StyledTop>
        <form id="jobForm" onSubmit={handleSubmit}>
          <StyledInput
          
          autoComplete="off"
            name="company"
            defaultValue={company}
            onChange={handleCompanyChange}
          />
          <StyledInput autoComplete="off" type="url"name="url" defaultValue={url} onChange={handleUrlChange} />
          <hr></hr>
          <label htmlFor="beworben">applied</label>
          <StyledInput
          id="beworben"
            name="beworben"
            type="checkbox"
            checked={beworben}
            onChange={handleBeworbenChange}
          />
          {beworben && 
          <StyledInput onChange={handleBeworbenDateChange} name="beworbenDate" value = {beworbenDate} type="date" />
}
<hr></hr>
          <label htmlFor="abgelehnt">dismissed</label>
          <StyledInput
          id="abgelehnt"
            name="abgelehnt"
            type="checkbox"
            checked={abgelehnt}
            onChange={handleAbgelehntChange}
          />
          {abgelehnt &&
          <StyledInput onChange={handleAbgelehntDateChange} name="abgelehntDate" value = {abgelehntDate} type="date" />
}
<hr></hr>
          <textarea
          autoComplete="off"
          maxLength={80}
            type="text"
            name="comment"
            style={{ textAlign: "center",height: "4rem" }}
            value={comment}
            onChange={handleCommentChange}
          />
          <hr></hr>
          <button type="submit">Change</button>
        </form>
      </StyledCard>
    </>
  );
}

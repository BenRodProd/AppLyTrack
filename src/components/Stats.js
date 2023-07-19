import { styled } from "styled-components";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import JobCard from "./JobCard";
import { useEffect, useState } from "react";

const StyledStatMain = styled.div`
display:flex;
flex-direction: column;
position:absolute;
text-align:center;
top:15rem;
align-items: center;
margin:auto;
width:90%;
height:90%;
background-color: aliceblue;
opacity: 0.99;
padding: 20px;
    margin: auto;
    border: 2px solid black;
    border-radius: 10px;
    box-shadow: 5px 5px 10px black;
`

const StyledSpan = styled.span`
font-size: 2rem;
color: green;
font-weight: bold;
`

const StyledList = styled.ul`
font-family: 'Courier New', Courier, monospace;
font-size: 1rem;
color: green;
font-weight: bold;
list-style: none;
padding:0;

`

const StyledItem = styled.li`
font-family: 'Courier New', Courier, monospace;
font-size: 1rem;
color: green;
font-weight: bold;
margin: 10px;
`


export default function Stats({jobs, handleUpdate, handleDelete, deleted, setDeleted}) {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const localizer = momentLocalizer(moment)
const myEventsList = jobs.reduce((acc, obj) => {
    if (obj.beworbenDate) {
      acc.push({
        id: obj.id,
        title: `Applied to ${obj.company}`,
        start: new Date(obj.beworbenDate),
        end: new Date(obj.beworbenDate),
        color: 'green',
      });
    }
    if (obj.abgelehntDate) {
      acc.push({
        id: obj.id,
        title: 'Dismissed',
        start: new Date(obj.abgelehntDate),
        end: new Date(obj.abgelehntDate),
        color: 'red',
      });
    }
    return acc;
  }, []);
  useEffect(() => {
      if (deleted) {
        setSelectedEvent(null)
        setDeleted(false)
    }
  },[deleted, setDeleted])
  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = event.color === 'green' ? 'green' : 'red';
    return {
      style: {
        backgroundColor,
        opacity: 0.8,
        color: 'white', // Font color for the event title
        border: '0px', // Remove border
        display: 'block',
        lineHeight: '1.4',
        height: '40px', // Adjust the height to make the events bigger
        fontSize: '9px', // Set the font size for the event titles
        whiteSpace: 'pre-line',
      },
    };
  };
  function handleClick(event) {
    const selectedJob = jobs.find(job => job.id === event.id);
    setSelectedEvent(prevJob => prevJob ? null : selectedJob);
  }
  const CustomEvent = ({ event }) => {
    return (
      <div
        style={{ whiteSpace: 'normal' }}
        onClick={() => handleClick(event)} // Set the selected event when clicked
      >
        {event.title}
      </div>
    );
  };
  const appliedCount = jobs.filter(obj => obj.beworben).length;
  const dismissedCount = jobs.filter(obj => obj.abgelehnt).length;
  const companies = jobs.map(obj => obj.company);
  return (
      <StyledStatMain>
            <h2>Statistics</h2>
            <p>___________________________</p>
            <p>You have <StyledSpan>{jobs.length}</StyledSpan> jobs in your Database</p>
            <p> You applied to <StyledSpan>{appliedCount}</StyledSpan> of those</p>
            <p> You have been rejected by  <StyledSpan>{dismissedCount}</StyledSpan> of  <StyledSpan>{appliedCount}</StyledSpan></p>
            <p>___________________________</p>
            <h2>Companies you have in the Database:</h2>
            <StyledList>
                {companies.map((company,index) => <StyledItem key={index} >{company}</StyledItem>)}
            </StyledList>
            <Calendar
              localizer={localizer}
              events={myEventsList}
              startAccessor="start"
              endAccessor="end"
            style={{height : 500}}
            length={4}
            eventPropGetter={eventStyleGetter}
            views={['month']} 
            components={{
                event: CustomEvent,
              }}
            />
             {selectedEvent && <JobCard handleDelete={handleDelete} handleUpdate={handleUpdate} job={selectedEvent} />}
        </StyledStatMain>
    );
}
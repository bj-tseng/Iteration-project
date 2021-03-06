import React, { useState, useEffect } from "react";

import DateTimePicker from 'react-datetime-picker';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearchPlus } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button, Form, Card } from 'react-bootstrap';

export default function CreateEvent({ addEvent }) {
  /* Form data */
  const initialFormData = Object.freeze({
    eventtitle: "",
    eventlocation: "",
    eventdetails: "",
  });

  const [formData, updateFormData] = React.useState(initialFormData);
  const [dateTime, onChange] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const eventdate = dateTime.toDateString();
    let time = dateTime.toTimeString();
    let eventstarttime = time.split(" ")[0];
    // ... submit to API or something
    addEvent({ ...formData, eventdate, eventstarttime });
    handleClose();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const handleDate = date => {
  //   setDate(date);
  // };

  return (
    <div>
      {/* 
      <Card className="mx-auto text-center" style={{ width: '18rem' }}>
          <div className="cardContainer" onClick={handleShow}>
            <FontAwesomeIcon className="mx-auto faPlus" icon={faPlus} size="8x" />
            <Card.Body>
              <Card.Title>Add Event</Card.Title>
            </Card.Body>
          </div>
        </Card> */}

      <div className='cardContainer' onClick={handleShow}>
        <FontAwesomeIcon className="mx-auto faPlus" icon={faPlus} size="4x" />
        <p>Add Event</p>
      </div>

      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formEventTitle">
              <Form.Label>Event Title</Form.Label>
              <Form.Control name='eventtitle' onChange={handleChange} required type="text" placeholder="Enter title" />
            </Form.Group>

            <Form.Group controlId="formEventLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control name='eventlocation' onChange={handleChange} required type="text" placeholder="Enter location" />
            </Form.Group>

            <Form.Group controlId="formEventDescription">
              <Form.Label>Event Description</Form.Label>
              <Form.Control name='eventdetails' onChange={handleChange} required as="textarea" placeholder="Enter description" />
            </Form.Group>

            <Form.Group controlId="formEventDescription">
              <Form.Label>Start Date & Time</Form.Label>
              <DateTimePicker
                onChange={onChange}
                value={dateTime}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => { handleSubmit(e) }}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
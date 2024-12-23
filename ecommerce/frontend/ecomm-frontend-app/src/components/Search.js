import React, { useState } from "react";
import { Row, Col, ListGroup, Card, Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [keywordSearch, setKeywodSearch] = useState("");

  const submitSearchHandler = (e) => {
    e.preventDefault();
    // console.log("search for: ", keywordSearch);
    if (keywordSearch) {
      navigate(`/?search=${keywordSearch}&page=1`);
    } else {
      navigate(location.pathname);
    }
  };
  return (
    <div>
      <Form onSubmit={submitSearchHandler} className='d-flex'>
        <Form.Control
          type='text'
          name='query'
          onChange={(e) => setKeywodSearch(e.target.value)}
          className='mr-sm-2 ml-sm-5 border border-dark'
        ></Form.Control>

        <Button type='submit' variant='outline-success' className='p-2 mx-2'>
          Search
        </Button>
      </Form>
    </div>
  );
}

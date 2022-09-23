import './App.css';
import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Input } from 'reactstrap';

function App() {

  const [searchQueryTerm, setSearchQueryTerm] = useState( "Java");
  const [searchPgNumTerm, setSearchPgNumTerm] = useState(1 );
  const [searchSortTerm, setSearchSortTerm] = useState("title");

  const [books, setBooks] = useState( [] );

  let API_URL = `http://localhost:8080/search`;

  const fetchBooks = async () => {
    const result = await axios.get(`${API_URL}?query=${searchQueryTerm}&pageNumber=${searchPgNumTerm}&sortField=${searchSortTerm}`);
    setBooks(result.data);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    fetchBooks();
  };
  const onInputQueryChange = e => {
    setSearchQueryTerm(e.target.value);
    console.log("setSearchQueryTerm",searchQueryTerm)

  };
  const onInputPgNumChange = e => {
    setSearchPgNumTerm(e.target.value);
  };
  const onInputSortChange = e => {
    setSearchSortTerm(e.target.value);
  };


  return (

    <section>
      <form onSubmit={onSubmitHandler}>
        <label>
          <Container>
          <Form>
            <FormGroup>
                <label for="searchText">Search Text</label>
                <Input type = "text" placeholder='Java' name="searchText" id="searchText" onChange={onInputQueryChange}/>
            </FormGroup>
            <FormGroup>
                <label for="sortField">Sort Field</label>
                <Input type = "text" placeholder='title' name="sortField" id="sortField" onChange={onInputSortChange}/>
            </FormGroup>
            <FormGroup>
                <label for="pageNumber">Page Number</label>
                <Input type = "text" placeholder='1' name="pageNumber" id="pageNumber" onChange={onInputPgNumChange}/>
            </FormGroup>
            <Container className='text-center'>
                <Button onClick={fetchBooks}> Search</Button>

            </Container>
          </Form>
          </Container>
        </label>
      </form>
      <ul>
        {books.map((book, index) => {
          return (
            <li key={index}>
              <div>
                <div>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <div>
                  <img
                  src={book.imageLink}
                />
                  </div>
                </div>
              </div>
              <hr />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default App;

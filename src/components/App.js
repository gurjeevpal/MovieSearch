import React, { useReducer, useEffect, useState } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import {grid, Container, Row, Col } from "react-bootstrap";


const MOVIE_API_URL = `https://swapi.dev/api/people/`;

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
  name:"",
  films:""
};


const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        name:action.payload,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  

  useEffect(() => {
    fetch(MOVIE_API_URL)
        .then(response => response.json())
           .then(jsonResponse => {
            const { results } = jsonResponse;
            results.forEach(key => {
              const { name, films } = key;              
              films.forEach(key2 => {
                fetch(key2)
                .then(resp => resp.json())
                .then(data => {
                  const { title } = data;
                  console.log(title);
                })
              })
              console.log('name', name);
              if (jsonResponse.Response === "True") {
                dispatch({
                    type: "SEARCH_MOVIES_SUCCESS",
                    payload: jsonResponse.Search
                });
              } else {
                dispatch({
                    type: "SEARCH_MOVIES_FAILURE",
                    error: jsonResponse.Error
                });
              }
          
            });  
    });
  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    fetch(`https://swapi.dev/api/people/`)
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.Response === "True") {
        dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
        });
      } else {
        dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
        });
      }
    });
  };

  const { name,movies, errorMessage, loading } = state;

  return (
    <div className="App">

   <Container>
     <Row><div className="Nav">
        <Header text="Star Wars" />
              </div>
      </Row>
      
            
  <Row >
    <Col md={4}><div><Search search={search} /></div></Col>
    
  </Row>

              
     
      <div className="movies">
        {loading && !errorMessage ? (
          <span className="loader"></span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          
          ))
      )}
        
      </div>
      </Container>
    </div>
  );
};

export default App;
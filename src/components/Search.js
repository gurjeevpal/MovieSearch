import React, {useState} from 'react'
import Select from 'react-select';

const Search = ({search,actors}) => {
  const [ searchValue, setSearchValue] = useState("C-3PO");

  console.log("Props ------------ "+actors);
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue("");
  }

  

  const callSearchFunction = (e) => {
    e.preventDefault();
    //alert(e.target.value);
    //setSearchValue(e.target.value);
    search(searchValue);
    resetInputField();
  }

  return (
    <div>
      <form className="search">
      <div className="container">
      <div className="row">
        
        <div className="col-md-4">
          <select className="dropdown"  onChange={callSearchFunction}>
            {actors && actors.map((actor,index) => (
             <option key={index}
             value={actor.name} >{actor.name}</option>
            ))}
          </select>
     </div>
        <div className="col-md-4"></div>
      </div>
    </div>
      </form>
    </div>
  )
}

export default Search

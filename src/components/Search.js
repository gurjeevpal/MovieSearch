import React, {useState} from 'react'
import Select from 'react-select';

const Search = (props) => {
  const [ searchValue, setSearchValue, name] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue("");
  }

  

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }
//   const names = [
//     { label: "Luke Skywalker", value: 1 },
//     { label: "C-3PO", value: 2 },
//     { label: "R2-D2", value: 3 },
//     { label: "Darth Vader", value: 4 },
//     { label: "Leia Organa", value: 5 },
//     { label: "Owen Lars", value: 6 },
//   ];
  
  return (
    <div>
      <form className="search">
      <div className="container">
      <div className="row">
        
        <div className="col-md-4">
          <select className="dropdown" >
            {name && name.map((name,index) => (
             <option key={index}
             value={handleSearchInputChanges} onChange={(e, data) => { callSearchFunction(data.value) }}>{name}</option>
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

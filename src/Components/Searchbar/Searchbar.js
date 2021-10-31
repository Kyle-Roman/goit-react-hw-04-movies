import { useState } from "react";
import s from './Searchbar.module.css'

export default function Searchbar({onSubmit}) {

  const [searchRequest, setSearchRequest] = useState('');

  const handleInput = (e) => {
      setSearchRequest(e.currentTarget.value.toLowerCase());
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchRequest.trim() === "") {
      return alert("Please enter something...");
    }
    
    onSubmit(searchRequest);
    setSearchRequest('');
    e.target.reset();
  }

  return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.SearchForm_button}>
           <span className={s.SearchForm_button_label}>Search</span>
          </button>
           
        <input
           className={s.SearchForm_input}
           type="text"
           autoComplete="off"
           autoFocus
           placeholder="Search images and photos"
           onChange={handleInput}
         />
       </form>
     </header>
    )
}
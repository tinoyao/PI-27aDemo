import React from 'react';
import { Link } from "react-router-dom";
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { getNameRecipes } from '../redux/actions';
import styles from '../styles/SearchBar.module.css';

function SearchBar({pages}) {
  const dispatch= useDispatch()
  const [name, setName] = useState('')
    
  function handleInputChange (e){
      setName(e.target.value)
  }

  function handleSubmit(e){
      e.preventDefault()
      dispatch(getNameRecipes(name))
      setName("")
      pages(1)
  }

  function handleReset() {
    dispatch(getNameRecipes(name))
    setName("")
  }

  return (
    <div className={styles.navBar}>
        <input 
        className={styles.navBar_input}
        autoComplete="off"
        type="text" 
        placeholder='Search...'
        id="search"
        onChange={(e) => handleInputChange(e)}
        />
        <button 
        className={styles.navBar_button}
        type='submit' 
        onClick={(e) => handleSubmit(e)} >Search</button>
        <div className={styles.navBar_link}>
				<Link to='/recipes' className={styles.navBar_linkAnchor}>
					Create your own recipe!
				</Link>
			</div>

      <button onClick={ () => handleReset() }>RESET</button>
    </div>
  )
}

export default SearchBar
import React from 'react';
import styles from '../styles/Paginado.module.css'


function Paginado({recipesPerPage, allRecipes, paginado}) {
    const pageNumbers = []

    
    for (let i = 1; i <=Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumbers.push(i);
        
    }

    const handleClick = (e) => {
        for (let num of pageNumbers) {
          if (num === parseInt(e.target.value)) {
            document.getElementById(num).classList.add(styles.btn_active);
          } else {
            document.getElementById(num).classList.remove(styles.btn_active);
          }
        }
        paginado(e.target.value);
    };

  return (
    <div>
    {pageNumbers?.map((num) =>{
      return(
      <button className={styles.btn}
         id={num}
         value={num}
         key={num}
         onClick={handleClick}>
         {num}
       </button>

      )
    })}
  </div>
  )
}

export default Paginado

{/* <div className={styles.paginado_contain} >
        <nav  >
            <ul >
                {pageNumbers && 
                pageNumbers.map(number => (
                    <li  key={number}>
                        <a onClick={()=> paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    </div> */}
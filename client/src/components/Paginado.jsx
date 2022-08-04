import React from 'react';
import styles from '../styles/Paginado.module.css'

//TODA LA LOGICA QUE VAMOS A HACER EN ESTE COMPONENTE ES PARA MOSTRAR LOS NUMERITOS
//CADA NUMERITO VA A SER CADA PAGINA CON 9 RECETAS

function Paginado({recipesPerPage, allRecipes, paginado}) {
    const pageNumbers = []

    //con el for recorro todas la recetas y con el Math.ceil redondeo el resultado de
    //la siguiente operacion: (todas las recetas dividido la cantidad de recetas por pagina[9])
    //y guardo esas 9 recetas por pagina con la variable con el push
    for (let i = 1; i <=Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumbers.push(i);
        
    }
  return (
    <div className={styles.paginado_contain} >
        <nav  >
            <ul >
                {pageNumbers && 
                pageNumbers.map(number => (
                    <li key={number}>
                        <a onClick={()=> paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    </div>
  )
}

export default Paginado

import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getRecipes, filterRecipesByDiets, filterCreated, orderByName, filterByHealthScore, resetRecipes } from '../redux/actions';

import Paginado from './Paginado';
import SearchBar from './SearchBar';
import styles from '../styles/Home.module.css';
import Card22 from './Card22';

function Home() {
    const dispatch = useDispatch()
    
    const [loading, setLoading] = useState(false);
    
    const allRecipes = useSelector((state) => state.recipes)

    
    const [currentPage, setCurrentPage] = useState(1)
    
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    
    const [orden, setOrden] = useState('')  // ESTADO QUE SOLO SE USA PARA VOLVER A RENDERIZAR EL HOME AL IMPLEMENTAR ORDENAMIENTOS QUE NO MODIFIQUEN EL LENGTH DE RECIPES
    
    const [btnHover, setBtnHover] = useState('')

    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)


    
    const paginado = (pageNumbers) => {
        setCurrentPage(pageNumbers)
    }


    
    useEffect(()=>{
        const fetchPages = async () => {
            setLoading(true)
            dispatch(getRecipes())
            setLoading(false)
        }
        fetchPages()

        return ()=> {
            dispatch(resetRecipes())
          };

    },[dispatch])

   
    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
        setCurrentPage(1);
    }

    function handleSort (e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterDiets(e){
        dispatch(filterRecipesByDiets(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
    }
    
    
    function handleSortHealth (e) {
        e.preventDefault();
        dispatch(filterByHealthScore(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado poe ${e.target.value}`)
    }



  return (
    <div className={styles.mainContainer} >
        <div  className={styles.content} >
            
            <div className={styles.navbar} >
                <SearchBar pages={setCurrentPage} />
            </div>
            
            <div className={styles.filters} >
                <div className={styles.filters_header} >
                    <h3>Filters</h3>
                    <button onClick={e=> {handleClick(e)}}>
                        Reload all recipes
                    </button>
                </div>

                <div className={styles.filters_dietSelect} >
                    <h3>By Diet</h3>
                    <select onChange={e => handleFilterDiets(e)}>
                        <option value="All">----Diet Types----</option>
                        <option value="gluten free">gluten free</option>
                        <option value="ketogenic">ketogenic</option>
                        <option value="vegetarian">vegetarian</option>
                        <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
                        <option value="ovo-vegetarian">ovo-vegetarian</option>
                        <option value="vegan">vegan</option>
                        <option value="pescetarian">pescetarian</option>
                        <option value="paleo">paleo</option>
                        <option value="primal">primal</option>
                        <option value="low fodmap">low fodmap</option>
                        <option value="whole 30">whole 30</option>
                        <option value="dairy free">dairy free</option>

                    </select>
                </div>

                <div className={styles.filters_sortFilters} >
                    <h3>Sort</h3>
                    <select onChange={e => handleFilterCreated(e)}>
                        <option value="All">----All----</option>
                        <option value="Created">Created</option>
                        <option value="Api">Existing</option>
                    </select>
                    <select onChange={e => handleSort(e)}>
                        <option value="Order">----Order AZ-ZA----</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                    </select>
                    <select onChange={e => handleSortHealth(e)}>
                        <option value="Nada">----Order Health Score----</option>
                        <option value="hasc">1-100</option>
                        <option value="hdesc">100-1</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className={styles.recipesGrid}>
                    <span className={styles.loading}></span>
                </div>
            ) : (
                <div className={styles.recipesGrid} >
                    <Card22 recipes={currentRecipes} />
                </div>
            )}
            
            
        </div>

        <div  className={styles.pagination} >
            <Paginado
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginado={paginado}
            />
            {/* <span>{currentPage}</span> */}
        </div>
       
    </div>
  )
}

export default Home
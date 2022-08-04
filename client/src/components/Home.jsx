
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getRecipes, filterRecipesByDiets, filterCreated, orderByName, filterByHealthScore } from '../redux/actions';
import { Link } from 'react-router-dom';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import styles from '../styles/Home.module.css';
import Card22 from './Card22';

function Home() {
    const dispatch = useDispatch()
    //lo de abajo es lo mismo que hacer el mapStateToPros
    //en seudocodigo lo leeria así: con useSelector, traeme en esa constante,
    //todo lo que está en el estado de recipes
    const allRecipes = useSelector((state) => state.recipes)

    //ahora quiero tener varios estados locales,
    //1ro quiero tener un estado con la pagina actual(1), y un estado que me setee la pagina actual
    const [currentPage, setCurrentPage] = useState(1)
    //2do un estado que me diga cuantas recetas tengo que mostrar por pagina, y el set
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    
    const [orden, setOrden] = useState('')

    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    //lo que hago abajo con el slice es en la pagina 1 traerme las recetas desde el indice
    //de la 1er receta hasta el indice de mi ultima receta ----> page 1= 0 -------> 8
    //en la pagina 2 me va a traer desde el indice 9 al 17 ----> page 2= 9 -------> 17 etc
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    //creo esto y ahora me voy al componente Paginado
    const paginado = (pageNumbers) => {
        setCurrentPage(pageNumbers)
    }


    //ahora tenemos que traernos del estado, las recetas cuando el componente se monta
    //para eso usamos useEffect y dentro le pasamos un arrow function y
    //despachamos la action que nos trae todas la recetas
    //el dispatch que usamos abajo, es lo mismo que usar el mapDispatchToProps
    useEffect(()=>{
        dispatch(getRecipes())
    },[dispatch])

    //esta function es la que me va a volver a cargar la pagina
    //y la voy a usar en el boton creado mas abajo
    //esto me va a servir para cuando haga algun filtro o algo
    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleSort (e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterDiets(e){
        dispatch(filterRecipesByDiets(e.target.value))
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }
    
    //funcion para despachar la accion de filtrar el health score
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
                <SearchBar />
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
            
            <div className={styles.recipesGrid} >
                <Card22 recipes={currentRecipes} />
            </div>
        </div>

        <div  className={styles.pagination} >
            <Paginado
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginado={paginado}
            />
        </div>
       
    </div>
  )
}

export default Home
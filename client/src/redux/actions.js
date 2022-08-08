import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES';
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS';
export const FILTER_CREATED = 'FILTER_CREATED';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const GET_NAME_RECIPES = 'GET_NAME_RECIPES';
export const GET_DIETS = 'GET_DIETS';
export const GET_DETAILS = 'GET_DETAILS';
export const FILTER_HEALTHSCORE = 'FILTER_HEALTHSCORE';


//aca es donde sucede la conexion del front con el back
export function getRecipes(){
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/recipes');
        return dispatch({
            type: GET_RECIPES,
            payload: json.data
        })
    }
}

//este payload va a ser lo que tengo en value en el componente Home en la parte de <select / <option value
export function filterRecipesByDiets(payload){
    return {
        type: FILTER_BY_DIETS,
        payload
    }
}
 
//filtro por creados, existentes...
export function filterCreated(payload){
    return {
        type: FILTER_CREATED,
        payload
    }
}

//filtros para ordenar de forma ascendente o descendente
export function orderByName(payload){
    return {
        type:ORDER_BY_NAME,
        payload
    }
}

//debo traerme primero del back la direccion que armé para buscar por name
//para hacerme toda la logica de la barra de busqueda
//---------IMPORTANTE, ESTA ACTION LA PONGO 2DA EN EL REDUCER SINO NO ME FUNCIONA EL SORT
export function getNameRecipes (name) {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/recipes?name=' + name)
            return dispatch({
                type: GET_NAME_RECIPES,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDiets(){
    return async function (dispatch){
        var info = await axios.get('http://localhost:3001/diets', {

        });
        return dispatch({
            type: GET_DIETS,
            payload: info.data
        })
    } 
}

export function postRecipe(payload){
    return async function (dispatch){
        const response = await axios.post('http://localhost:3001/recipes', payload)
        return response;
    }
}

export function getDetailId (id) {
   return async function (dispatch) {
    try {
        let json = await axios.get('http://localhost:3001/recipes/' + id);
        return dispatch({
            type: GET_DETAILS,
            payload: json.data
        })
    } catch (error) {
        console.log(error)
    }
   }
}

export function resetPoe () {
    return {
        type: 'RESET'
    }
}

export function filterByHealthScore(payload) {
	return {
		type: FILTER_HEALTHSCORE,
		payload
	};
}

export function resetRecipes () {
    return {
        type: 'RESET_RECIPES'
    }
}
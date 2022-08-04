import { GET_RECIPES, FILTER_BY_DIETS, FILTER_CREATED, ORDER_BY_NAME, GET_NAME_RECIPES, GET_DIETS, GET_DETAILS, FILTER_HEALTHSCORE } from "./actions";

const initialState = {
    recipes : [],
    detail: [],
    allRecipes: [],
    diets: [],
    recipesRemix: [],
    
}

function rootReducer(state= initialState, action) {
    switch (action.type) {
        case GET_RECIPES :
            
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
                recipesRemix: [...action.payload],
            }
        case GET_NAME_RECIPES :
            return {
                ...state,
                recipes: action.payload
            }
        case GET_DIETS :
            return {
                ...state,
                diets: action.payload
            }
        case FILTER_BY_DIETS :
            const allRecipes = state.allRecipes
            const dietsFiltered = action.payload === 'All' ? allRecipes : allRecipes.filter(el => el.diets.includes(action.payload.toLowerCase()))
            const filterFinal = action.payload === "All"
            ? [...state.allRecipes]
            : [
                ...state.allRecipes.filter((recipe) => {
                  if(recipe.diets.length > 0 && recipe.diets[0].name ){
              
                    
                    recipe.diets = [...recipe.diets.map(diet => diet.name)]
                
                  }
                
                 
                 return recipe.diets.includes(action.payload.toLowerCase());
                
                }),
              ]
            return {
                ...state,
                recipes: filterFinal,
            }
        case 'POST_RECIPES' :
            return {
                ...state,
            }
        case FILTER_CREATED :
            const allRecipes2 = state.allRecipes
            const createdFilter = action.payload === 'Created' ? allRecipes2.filter(el => el.createdInDb) : allRecipes2.filter(el => !el.createdInDb)
            return {
                ...state,
                recipes: action.payload === 'All' ? state.allRecipes : createdFilter
            }
        case ORDER_BY_NAME :
            const todoRecipes = state.allRecipes
            if (action.payload === "a-z" || action.payload === "") {
				let filterAZ = todoRecipes.sort((a, b) => {
					if (a.name.toLowerCase() > b.name.toLowerCase()) {
						return 1;
					}
					if (b.name.toLowerCase() > a.name.toLowerCase()) {
						return -1;
					}
					return 0;
				});

				return {
					...state,
					recipes: filterAZ,
				};
			} else {
				let filterZA = todoRecipes.sort((a, b) => {
					if (a.name.toLowerCase() > b.name.toLowerCase()) {
						return -1;
					}
					if (b.name.toLowerCase() > a.name.toLowerCase()) {
						return 1;
					}
					return 0;
				});

				return {
					...state,
					allRecipes: filterZA,
				};
			}
            case FILTER_HEALTHSCORE :
                const todoRecipes2 = state.recipesRemix
                let filteredHeathScore = [];
                if (action.payload === "hasc") {
                    filteredHeathScore = todoRecipes2.sort((a, b) => {
                        return b.healthScore - a.healthScore;
                    });
                } else {
                    filteredHeathScore = todoRecipes2.sort((a, b) => {
                        return a.healthScore - b.healthScore;
                    });
                }

                return {
                    ...state,
                    recipes: [...filteredHeathScore],
                };
        
        case GET_DETAILS :
            return {
                ...state,
                detail: action.payload,
            }
        case 'RESET' :
            return {
                ...state,
                detail: []
            }
        
        default:
            return state;
    }
}

export default rootReducer;
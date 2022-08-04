require("dotenv").config();
const { Router } = require("express");
const { default: axios } = require("axios");
const { API } = process.env;
const { typesDeDiets } = require('./cargandoDb')

const { Recipe, Diet } = require("../db");
const Sequelize = require("sequelize");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getApiInfo = async () => {
  const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API}&addRecipeInformation=true&number=100`);
  const apiInfo = await apiUrl.data.results.map(el => {
    return {
      name: el.title,
      id: el.id,
      summary: el.summary,
      healthScore: el.healthScore,
      score: el.spoonacularScore,
      image: el.image,
      steps: el.analyzedInstructions[0]?.steps.map(e => ({number: e.number, step: e.step})),
      dishTypes: el.dishTypes.map(el => el),
      diets: el.diets.map(el => el),
    }
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    }
  })
}

const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal
}


const roter = Router();

router.get('/recipes', async (req, res, next) => {
  try {
    const name = req.query.name
    let recipesTotal = await getAllRecipes();
    if (name) {
      let recipeName = await recipesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
      recipeName.length?
      res.status(200).send(recipeName) :
      res.status(404).send('Recipe not found');
    } else {
      res.status(200).send(recipesTotal)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/recipes/:id', async (req,res, next) => {
  try {
    const id = req.params.id;
    const recipeTotal = await getAllRecipes()
    if(id) {
      let recipeId = await recipeTotal.filter(el => el.id == id)
      recipeId.length?
      res.json(recipeId) :
      res.send('Recipe not found')
    }
  } catch (error) {
    next(error)
  }
 
})

router.post('/recipes', async (req, res, next) => {
  //todo lo de abajo me llega por body
  let {image, name, summary, healthScore, steps, createdInDb, diets} = req.body;
  try {
    //con todo esto, lo creo
    let recipeCreated = await Recipe.create({
      image, name, summary, healthScore, steps, createdInDb,
    })
    //pero la dieta lo tengo que buscar en un modelo que ya tengo, que es lo de abajo
    //y el name va a ser el 'diets' que me llega por body
    const dietDB = await Diet.findAll({
      where: { name: diets},
    })
    recipeCreated.addDiet(dietDB)
    res.json(recipeCreated)

    /* diets.map(async (e) => {
      let id_diet = await Diet.findAll({ where: { name: e } });
      await recipeCreated.addDiet(id_diet);
    }); */
  } catch (error) {
    next(error)
  }
})



router.get('/diets', async (req, res, next) => {
  try {
    res.send(await typesDeDiets());
  } catch (error) {
    next(error)
  }
})

module.exports = router;




/* 

router.post('/recipes', async (req, res, next) => {
  //todo lo de abajo me llega por body
  let {image, name, summary, healthScore, steps, createdInDb, diets} = req.body;
  try {
    //con todo esto, lo creo
    let recipeCreated = await Recipe.create({
      image, name, summary, healthScore, steps, createdInDb
    })
    //pero la dieta lo tengo que buscar en un modelo que ya tengo, que es lo de abajo
    //y el name va a ser el 'diets' que me llega por body
    const dietDB = await Diet.findAll({
      where: { name: diets},
    })
    recipeCreated.addDiet(dietDB)
    res.json(recipeCreated)
    res.send('Recipe created correctly!')
  } catch (error) {
    next(error)
  }
})

router.post('/recipes', async (req, res, next) => {
  let {name, summary, healthScore, score, image, steps, diets} = req.body;
  try {
    let recipeCreated = await Recipe.create({
      name, summary, healthScore, score, image, steps,
    })
    diets.map(async el => {
      let dietDB = await Diet.findAll({where: { name: el}})
      await recipeCreated.addDiet(dietDB);
    });

    res.send('Recipe created correctly!')
  } catch (error) {
    next(error)
  }
}) 

router.get('/diets', async (req, res, next) => {
  try {
    res.send(await typesDeDiets());
  } catch (error) {
    next(error)
  }
})

router.get('/diets', async (req, res, next) => {
  try {
    const dietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API}&addRecipeInformation=true&number=100`)
    const diets = dietsApi.data.map(el => el.diets)
    const dietEach = diets.map(el => {
      for (let i = 0; i<el.length; i++) return el[i]
    })
    dietEach.forEach(el => {
      Diet.findOrCreate({
        where: { name: el }
      })
    });
    const allDiets = await Diet.findAll();
    res.send(allDiets);
  } catch (error) {
    next(error)
  }
})

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    }
  })
}

var analyzedInstructions = [{na:"", steps:[ {1:1,2,3:3:2,4:4}, {2:2,3:3,4:4}, {3:3,4:4}, {4:4}, {5:5}]}];

steps: el.analyzedInstructions[0].steps.map(el => el.step)

---------------------PARA PROBAR EL GET/RECIPES Y EL GET POR NAME---------------------

http://localhost:3001/recipes?name=berry

---------------------PARA PROBAR EL POST---------------------
{
    "name": "tino",
    "steps": [
        {
            "number": 1,
            "step": "bajarse el cierre del pantalon"
        },
        {
            "number": 2,
            "step": "rascarse las bolas"
        }
        
        ],
        "summary": "es una receta de tinoyao",
        "healthScore": 7,
        "diets": ["low fodmao"]
        
}
*/
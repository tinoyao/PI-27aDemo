const { Diet } = require("../db");
const dietTypesDb = [
  "gluten free",
  "ketogenic",
  "vegetarian",
  "lacto ovo vegetarian",
  "ovo-vegetarian",
  "vegan",
  "pescetarian",
  "paleo",
  "primal",
  "low fodmap",
  "whole 30",
  "dairy free",
];


async function typesDeDiets () {
    try {
      let types = await Diet.findAll();
      if(!types.length) {
        const createTypes = dietTypesDb.map(
          async (el) => await Diet.create({ name: el })
        );
        types = await Promise.all(createTypes);
      }
      return types;
    } catch (error) {
      return error;
    }
  }

module.exports={
    typesDeDiets
  }
  
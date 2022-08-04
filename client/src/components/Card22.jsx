import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../styles/Cards.module.css";

function Card({recipes}) {
    const allRecipes = useSelector((state) => state.recipes);
    
  return (
    <div className={styles.recipeContainer}>
				{recipes.length ? (
					recipes.map((recipe) => (
						<div key={recipe.id} className={styles.recipeCard}>
							<div className={styles.recipeCard_title}>
								<h3>{recipe.name}</h3>
							</div>
							<img
								src={recipe.image}
								alt="Recipe"
								className={styles.recipeCard_image}
							/>
							{recipe.diets.length ? (
								<ul className={styles.recipeCard_dietsContainer}>{
                                    recipe.diets.map((el, index) => el.name ? (
                                      <li key={index} className={styles.dietsContainer_dietElement} >{el.name}</li>)
                                      : (<li key={index} className={styles.dietsContainer_dietElement} >{el}</li>))
                                  }</ul>
							) : (
								"diet not found"
							)}

                            <Link
                                className={styles.recipeCard_learnMore}
                                to={'/home/' + recipe.id}
                            >
                                Learn More
                            </Link>
						</div>
					))
				) : (
					<img
						src="https://media.istockphoto.com/vectors/an-elderly-male-chef-wearing-a-cook-coat-is-depressed-vector-id1173055368?k=20&m=1173055368&s=612x612&w=0&h=fHsy6Xar3oV7qP0HMzsuDhLEFUEfLPL8IGMRxL7sOsg="
						alt="sad chef"
					></img>
				)}
			</div>
  )
}

export default Card
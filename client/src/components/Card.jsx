import React from 'react';
import { Link } from "react-router-dom";
import styles from "../styles/Cards.module.css";

function Card({name, image, diets, id}) {
  return (
    <div className={styles.recipeContainer} >
        <div key={id} className={styles.recipeCard} >
          <div className={styles.recipeCard_title} >
            <h3>{name}</h3>
          </div>
          <img src={image} alt="img not found" className={styles.recipeCard_image} />
          <ul className={styles.recipeCard_dietsContainer}>{
            diets.map((el, index) => el.name ? (
              <li key={index} className={styles.dietsContainer_dietElement} >{el.name}</li>)
              : (<li key={index} className={styles.dietsContainer_dietElement} >{el}</li>))
          }</ul>
          <Link
            className={styles.recipeCard_learnMore}
            to={'/home/' + id}
          >
            Learn More
          </Link>
        </div>
    </div>
  )
}

export default Card

/* import React from 'react';

function Card({name, image, diets}) {
  return (
    <div className={styles.recipeContainer} >
        <h3>{name}</h3>
        <img src={image} alt="img not found" />
        <h5>{
          diets.map((el) => el.name ? (
            <li >{el.name}</li>)
            : (<li>{el}</li>))
        }</h5>
    </div>
  )
}

export default Card */


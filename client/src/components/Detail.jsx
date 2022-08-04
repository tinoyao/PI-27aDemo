import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailId, resetPoe } from '../redux/actions';
import { useEffect } from 'react';
import styles from '../styles/Detail.module.css';

function Detail(props) {
    

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailId(props.match.params.id));
    
    return ()=> {
      dispatch(resetPoe())
    };
      
  },[dispatch])
    
  const myRecipe = useSelector((state) => state.detail)
    
  const getSummary = () => {
		if (myRecipe[0].summary) {
			return myRecipe[0].summary.replace(/<[^>]+>/g, "");
		}
	};

  return (
    <div >
        {
          myRecipe.length > 0 ? 
          <div className={styles.detailContainer} >
            <h1>{myRecipe[0].name}</h1>
            <div className={styles.detail_infoGrid}>
              <div className={styles.detail_image}>
                <img src={myRecipe[0].image? myRecipe[0].image: myRecipe[0].img } alt="image not fount" />
              </div>

              <div className={styles.detail_dietsList}>
                <h2>Diets:</h2>
                <ul>
                  {!myRecipe[0].createdInDb? 
                    myRecipe[0].diets.map((el) => {return <li key={el.id} >{el}</li>}) : 
                    myRecipe[0].diets.map(el => { return <li key={el.id} >{el.name}</li>})
                  }
                </ul>
              </div>

              <div className={styles.detail_scoreContainer}>
                <div className={styles.healthScore}>
                  <h2>health Score</h2> <span>{myRecipe[0].healthScore}</span>
                </div>
                <div className={styles.normalScore}>
                  {!myRecipe[0].dishTypes? "" : (
                    <div >
                      <h2>Dish Types</h2>
                      <ul>
                        {myRecipe[0].dishTypes.map((el, index) => {
                          return (
                            <li className={styles.dish} key={index}>
                              <span>{el}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div  className={styles.detail_summaryContainer} >
              <h2>Summary</h2>
              <p>{getSummary()}</p>
            </div>
            
            {myRecipe[0].createdInDb?
            !myRecipe[0].steps? "No steps available" : (
              <div className={styles.detail_stepContainer}>
                <h2>Step by Step</h2>
                <ul>
                  {myRecipe[0].steps.map((step) => {
                    return (
                      <li className={styles.detail_stepContainer_list} key={step.number}>
                        <span>Step {step.number + 1}: </span>
                        <span>{step.stepInput}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )
            
            : !myRecipe[0].steps? "No steps available" : (
              <div className={styles.detail_stepContainer} >
                <h2>Step by Step</h2>
                <ul>
                  {myRecipe[0].steps.map((step) => {
                    return (
                      <li className={styles.detail_stepContainer_list} key={step.number}>
                        <span>Step {step.number}: </span>
                        <span>{step.step}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            
            <Link to='/home'>
                <button className={styles.btn} >Back to recipes</button>
            </Link>

          </div> : <img src="https://www.jayrospizza.com/assets/images/loader.gif" alt="loading" /> 
          
        }
    </div>
  )
}

export default Detail


{/* {!myRecipe[0].steps? "No steps available" : myRecipe[0].steps.map(el => (
                  <li >
                    <span>{el.number}:</span>
                    <span>{el.step}</span>
                  </li>
                ))} 
              
 <p>Loading..</p> 

 {!myRecipe[0].createdInDb? myRecipe[0].diets + ' ' : myRecipe[0].diets.map(el => el.name + (' '))}
              
              */}



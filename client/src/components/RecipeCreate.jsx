import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom';
import { postRecipe, getDiets } from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../styles/RecipeCreate.module.css';





function RecipeCreate() {
    const dispatch= useDispatch()

    const dietas = useSelector((state) => state.diets)
    const history = useHistory();
    const [steps, setSteps] = useState([{ stepInput: "", number: 0 }]);
    /* const [errors, setErrors] = useState({}); */
    
    
    const [input, setInput] = useState({
        image: '',
        name: '',
        summary: '',
        healthScore: '',
        diets: [],
    })


    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        
        /* setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        })); */
        
    }
    

    function handleSelect(e) {
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
        
    }

    function handleStepInputChange (e, number) {
        setSteps(
            steps.map((step) => {
                if (step.number === number) {
                    step.stepInput = e.value;
                }
                return step;
            })
        );
    };

    const addStep = (e) => {
    e.preventDefault();
    if (steps.length > 7) return;
        setSteps([
            ...steps,
            { stepInput: "", number: steps[steps.length - 1].number + 1 },
        ]);
	};

	const resetSteps = (e) => {
		e.preventDefault();
		setSteps([{ stepInput: "", number: 0 }]);
	};


    const formatSend = {
        name: input.name,
        summary: input.summary,
        healthScore: parseFloat(input.healthScore),
        image: input.image,
        diets: input.diets,
        steps: steps,
    };


    function handleSubmit(e) {
        e.preventDefault();

        if (errorPoe) {
            //aca no anda el alert porque si existe error
            //me desabilita el boton, por lo tanto, nunca va a 
            //mandar el alert
            return;
		} else {
			dispatch(postRecipe(formatSend))
            alert('Recipe created correctly')
            
            setInput({
                image: '',
                name: '',
                summary: '',
                healthScore: '',
                diets: [],
            })
            setSteps([{ stepInput: "", number: 0 }]);
            
            history.push('/home')
		};

        
    }

    function handleDelete(el) {
        setInput({
            ...input,
            diets: input.diets.filter( diet => diet !== el)
        })
    }

    useEffect(() => {
        dispatch(getDiets())
    },[]);

    const errorPoe = validate(input, steps);

  return (
    <div>
        <Link to= '/home' className={styles.backLink}><span className={styles.span}>&lt;</span>Back to recipes</Link>
        
        <form className={styles.form_container} onSubmit={(e) => handleSubmit(e)} >
            <h1>CREATE YOUR OWN RECIPE!</h1>
            <div className={styles.inputs_mainContainer}>
                <div className={styles.inputInfo_container}>
                    <h2>
                        <span className={styles.infoNumber}>1</span>Recipe Info
                    </h2>
                    <div className={styles.inputContainer}>
                        <label>NAME</label>
                        <input 
                        className={styles.userInput}
                        type="text"
                        value={input.name}
                        name= 'name'
                        onChange={(e)=> handleChange (e)}
                        />
                        {/* {errors.name && (<p className={styles.errorMessage}>{errors.name}</p>)} */}
                    </div>

                    <div className={styles.inputContainer}>
                        <label>SUMMARY</label>
                        <textarea 
                            className={styles.userInput}
                            type="text"
                            autoComplete="off"
                            value={input.summary}
                            name= 'summary'
                            onChange={(e)=> handleChange (e)}
                        ></textarea>
                        {/* {errors.summary && (<p className={styles.errorMessage}>{errors.summary}</p>)} */}
                    </div>

                    <div className={styles.scoresContainer}>
                        <div className={styles.inputContainer}>
                            <label>HEALTHSCORE</label>
                            <input 
                            className={styles.userInput}
                            type="number"
                            value={input.healthScore}
                            name= 'healthScore'
                            onChange={(e)=> handleChange (e)}
                            />
                           {/*  {errors.healthScore && (<p className={styles.errorMessage}>{errors.healthScore}</p>)} */}
                        </div>
                    </div>

                    <div className={styles.imageInputContainer}>
                        <label>IMAGE (URL)</label>
                        <input 
                        placeholder='https://exaple.com'
                        className={styles.userInput}
                        type="text"
                        value={input.image}
                        name= 'image'
                        onChange={(e)=> handleChange (e)}
                        />
                        <div className={styles.imageChosen}>
                            {input.image.length > 5 ? (
                                <img src={input.image} alt="temporary input"></img>
                            ) : (
                                <div>Choose your recipe image </div>
                            )}
						</div>
                    </div>
                </div>
                <div className={styles.input_Steps}>
                    <h2>
                        <span className={styles.infoNumber}>2</span>Step by Step
                    </h2>
                    <span className={styles.infoNumber} >(Max. 8 steps)</span>
                    {steps.map((step) => {
                        return (
                            <div className={styles.stepNumberInput} key={step.number + 1}>
                                <label>{`STEP ${step.number + 1}`}</label>
                                <input
                                    className={styles.stepTextInput}
                                    type="text"
                                    onChange={(e) => {
                                        handleStepInputChange(e.target, step.number);
                                    }}
                                    value={step.stepInput}
                                ></input>
                            </div>
                        );
                    })}

                    <button className={styles.stepButton} onClick={(e) => addStep(e)}>
                        Add Step
                    </button>
                    <button className={styles.stepButton} onClick={(e) => resetSteps(e)}>
                        Reset steps
                    </button>
                </div>

                <div className={styles.dietsContainer}>
                    <h2>
                        <span className={styles.infoNumber}>3</span>Diets
                    </h2>
                    <select className={styles.dietSelect} onChange={(e) => handleSelect(e)}>
                        {dietas.map((di) => (
                            <option value={di.name}>{di.name}</option>
                        ))}
                    </select>
                    {input.diets.map(el =>
                        <div className={styles.dietChosen}>
                            <p>{el}</p>
                            <button className={styles.dietDeleteButton} onClick={()=> handleDelete(el)} >x</button>
                        </div>
                    )}
                </div>
               
                
               
            </div>
            <button className={styles.form_submitButton} type='submit' disabled={errorPoe} >CREATE RECIPE</button>
                {errorPoe && (<p className={styles.errorMessage}>{errorPoe}</p>)}
        </form>
        
    </div>
  )
}

function validate(input, steps) {
    if(!input.name) return 'Name is required';
    if(!input.summary) return 'Summary is required';
    if(input.healthScore > 100 || input.healthScore < 0 || !input.healthScore) return 'Enter numbers from 0 to 100';
    if(!input.image) return 'Image is required';
    if(!steps[0].stepInput) return 'One step is required';
    if(input.diets.length < 1) return 'Diet is required';
}

export default RecipeCreate

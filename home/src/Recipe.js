import React from 'react'
import style from './recipes.module.css'

const Recipe = ({title, calories, image, ingredients}) => { //the props is gotten from the props passed to the recipe in the app 
    return ( // details to be display about a recipe
        <div className={style.recipes}> 
            <h1 className={style.h1}>{title}</h1>
            <p><b>Calories: </b>{calories}</p>
            <img src={image} alt="" className={style.image} />
            <ul className={style.ul}><b>Ingredients</b>{ingredients.map(ingredient =>(
                <li>{ingredient.text}</li>
            ))}</ul>
        </div>
    )
}

export default Recipe;

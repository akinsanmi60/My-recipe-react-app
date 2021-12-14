/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

    const APP_ID = '354656f5' //gotten from registering on EDAMAM APi website
    const APP_KEY = 'a67946fa34607c09aaaffc0923a0cf49' // the application key to access the site, seen under APIs (Recipes)
    
   

    // this useState hook  to stored data gotten from the useEffect hook
    const [recipes, setRecipes] = useState([]); //the reason for an empty array is because the output is array of objects

    // incase of searching for an info about recipe in the App, we create a useState for such event
    const [search, setSearch] = useState(''); //reason for empty string in useState is to have the value of state variable empty by default. ie search is ""


    //this is created so that info on recipe is fetched when the search button is clicked
    const [query, setQuery] = useState('chicken') // chicken is the default base on list of array of objects



    //useEffect is use to call web API. useEffect takes effect when the component mount.
    //defining useEffect (it takes an arrow function in parameter)
    useEffect(() =>  {
       getRecipes();
    }, [query]);
    // the reason for comma and brace-bracket is for the useEffect to run once the page loads
    // comma is the first arguement and brace-bracket is the second arguement in useEffect and it is called dependencies array
    //if the brace-bracket is empty the useEffect runs once when the app runs but vice-versa is the case 
   

    //getting data from the API
    async function getRecipes() {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        /* the reason for backquote `` is to be able to own APP ID & KEY */
        // the query in the link is the parameter in line 21
        // we create a JSON out of the response gotten back and store it in data
        const data = await response.json(); // add await before the response (it is a promise) because we dont know the exact time of reply
        setRecipes(data.hits); // this will be stored in useState
    }

    const updateSearch = e => { // this is get the target of the event and will be pass in onChange event so that we can use to monitor change in input element. it is a controlled component
        setSearch(e.target.value);
    }  

    const getSearch = e => { // will be run when the search button is clicked
        e.preventDefault(); // this stopt the page from refresh
        setQuery(search);
        setSearch(''); // to clear input after search
    }

    return (
        <div className="App">
            <form className='search-form' onSubmit={getSearch}>
             <input className='search-bar' type="text" value={search} onChange={updateSearch} /> 
             <button className='search-button' type='submit'>Search</button>
            </form>

            <div className='recipes'>
            {recipes.map(recipe => (   //reason for brace after the => is for the output to be in html layout in Recipe.js
                <Recipe
                        key={recipe.recipe.label} // these are key to differentiate recipe from each other and is pass from the useState
                        title={recipe.recipe.label}
                        calories={recipe.recipe.calories}
                        image={recipe.recipe.image}
                        ingredients={recipe.recipe.ingredients} /> 
            ))}
            </div>
           
        </div>
    );
} 

export default App;

//we set the valuse of the input to empty by deafult with search
//onChange event is set on input to detect when  the value of an input element changes
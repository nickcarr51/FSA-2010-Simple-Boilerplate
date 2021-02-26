import React, {useEffect, useState} from "react";
import axios from 'axios';
import {NavLink} from "react-router-dom";

const RandomMeal = () => {

  const [meal, setMeal] = useState(null);

  useEffect(async () => {
    const { meals } = (
      await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
    ).data;
    setMeal(meals[0]);
  }, []);

  if (!meal){
    return null;
  }

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strMeasure${i}`]} - ${meal[`strIngredient${i}`]}`
        );
      } else {
        // Stop if there are no more ingredients
        break;
      }
    }
    // console.log("meal state is ? ",meal) - meal is an object.
    let youTubeId = meal.strYoutube.slice(-11);
    let youTubeURL = "https://www.youtube.com/embed/"+youTubeId;

    console.log("meal state is ",meal);


    return (
      <div className="dinner-box">
      <center>
      <NavLink to="/AnotherMeal" className="main-nav" activeClassName="main-nav-active">I'm not feeling this, Show me another meal!
      </NavLink>
      <h1><strong>{meal.strMeal}</strong></h1>
      <h2>Ingredients</h2>
      <ul>
      {
        ingredients.map((item, idx) =>{
          return (
          <li key={idx}>
            {item}
          </li>
          )
        })
      }
      </ul>

      <h3>Recipe</h3>
      <body>
      {
        meal.strInstructions
      }
      </body>

      {
			meal.strYoutube ?
		<div className="row">
			<h3>Video Recipe</h3>

			<div className="videoWrapper">
				<iframe width="420" height="315"
				src={youTubeURL}>
				</iframe>
			</div>

		</div>	: ''
		}

    </center>
    </div>
     );

}

export default RandomMeal;

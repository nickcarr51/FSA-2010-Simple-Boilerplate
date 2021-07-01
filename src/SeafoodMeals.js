import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import NavBar from "./NavBar";

const SeafoodMeals = (props) => {

  const [meal, setMeal] = useState(null);

      useEffect(async () => {
        const { meals } = (
          await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=salmon`)
        ).data;
        console.log("axios call return", meals)
        setMeal(meals);
      }, []);

      if (!meal){
        return null;
      }


    return (
      <div className="dinner-box">
        <NavBar />
      <center>
      <h2>Meals you can make with Seafood</h2>
      <ul>
      {
        meal.map((dishObj, idx) =>{
          return (
          <li key={idx}>
            {dishObj.strMeal}
            <div className="gap-10"/>
            <img src = {dishObj.strMealThumb} className="img-single-meal" />
            <div className="gap-10"/>
          </li>
          )
        })
      }
      </ul>
      </center>
      </div>

     );

}

export default SeafoodMeals;

import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";

const MealsByItem = (props) => {

      const propsParse = (props) => {
        if (props.value !== ""){
          let valuePassed = props.value
        }
        return valuePassed;
      }

      const [meal, setMeal] = useState(null);

      useEffect(async () => {
        let valuePassed = propsParse();
        console.log("value passed", valuePassed)
        const { meals } = (
          await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${valuePassed}`)
        ).data;
        console.log("axios call return", meals)
        setMeal(meals);
      }, []);

      if (!meal){
        return null;
      }


    return (
      <div className="dinner-box">
      <center>
      <h2>Meals you can make with {valuePassed}</h2>
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

export default MealsByItem;

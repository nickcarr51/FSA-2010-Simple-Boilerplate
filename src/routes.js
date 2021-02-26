import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import RandomMeal from "./RandomMeal";
import AnotherMeal from "./AnotherMeal";
import MealsByItem from './MealsByItem';

const Routes = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/randommeal" exact component={RandomMeal} />
        <Route path="/anothermeal" exact component={AnotherMeal} />
        <Route path="/mealbyitem" exact component={MealsByItem} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;

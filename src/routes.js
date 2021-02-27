import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import RandomMeal from "./RandomMeal";
import AnotherMeal from "./AnotherMeal";
import ChickenMeals from './ChickenMeals';
import PorkMeals from "./PorkMeals";
import SeafoodMeals from "./SeafoodMeals";
import SingleMeal from "./SingleMeal";

const Routes = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/randommeal" exact component={RandomMeal} />
        <Route path="/anothermeal" exact component={AnotherMeal} />
        <Route path="/chickenmeal" exact component={ChickenMeals} />
        <Route path="/porkmeal" exact component={PorkMeals} />
        <Route path="/seafoodmeal" exact component={SeafoodMeals} />

        <Route path="/singlemeal/:meal" exact component={SingleMeal} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;

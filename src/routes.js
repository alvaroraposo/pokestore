import React from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import PokemonGrid from './pages/PokemonGrid';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={PokemonGrid}/>
            </Switch>
        </BrowserRouter>
    );
}
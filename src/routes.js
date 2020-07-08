import React from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import PokemonGrid from './pages/PokemonGrid';
import Item from './pages/Item';
import ListaDeCompras from './pages/ListaDeCompras';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={PokemonGrid}/>
                <Route path="/AddItem" component={Item}/>
                <Route path="/ListaDeCompras" component={ListaDeCompras}/>
            </Switch>
        </BrowserRouter>
    );
}
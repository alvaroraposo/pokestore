import React from 'react';
import { Logo } from './../components';

export default function Item() {
  return (
    <>
        <div className="container-fluid">
            {/* { Logo() } */}
            {/* { Carrinho() } */}
            { AddItem() }                 
        </div>                     
    </>
  );
};

function AddItem() {
  return (
      <div id="divItemId">
          <div className="row justify-content-center">
              <div className="col-12 col-lg-8">
                  <div className="card">
                      <div className="card-title">
                      Featured
                      </div>
                      <div className="card-body">
                          <h5 className="card-title">Special title treatment</h5>
                          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                      </div>
                  </div>
              </div>
              <div className="col-12 col-lg-4">
                  <div className="card">
                      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" className="card-img-top" alt="..."/>
                      <div className="card-body">
                          <p className="card-text">NOME DO POKEMON</p>
                          <p className="card-text">R$ 10,00</p>
                          <p className="card-text"><img src="images\formas-pagamento.png" className="card-img-bottom" alt="..."/></p>
                          <p className="card-text"><button className="btn" type="submit">ADICIONAR AO CARRINHO</button></p>                       
                      </div>                                         
                  </div>
              </div>            
          </div>                                     
      </div>
  );
};

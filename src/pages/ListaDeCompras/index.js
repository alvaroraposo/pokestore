import React from 'react';
import { Jumbotron} from 'react-bootstrap';
import { Logo } from '../components';

export default function Item() {
  return (
    <>
        <div className="container-fluid">
            {/* { Logo() } */}
            {/* { Carrinho() } */}
            { ListaDeCompras() }                 
        </div>                     
    </>
  );
};

function ListaDeCompras() {
  return (
      <>
          <div id="divTituloId">
              <span>CARRINHO</span>
              <span>Clique em finalizar compra para efetuar o seu pedido</span>                    
          </div>
          <Jumbotron fluid id="divItensId">
              <div className="row">
                  <div className="col-12">
                      <ul>
                          <div className="row">
                              <lh className="d-none d-md-block col-md-2 col-lg-2">Item</lh>
                              <lh className="d-none d-md-block col-md-2 col-lg-2">Descrição</lh>
                              <lh className="d-none d-md-block col-md-2 col-lg-2">Preço unitário</lh>
                              <lh className="d-none d-md-block col-md-2 col-lg-2">Quantidade</lh>
                              <lh className="d-none d-md-block col-md-2 col-lg-2">Subtotal</lh>
                              <lh className="d-none d-md-block col-md-2 col-lg-2">Excluir</lh>
                          </div>
                          <div className="row align-items-center">
                              <li className="col-12 col-md-2 col-lg-2"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt=""/></li>
                              <li className="col-12 col-md-2 col-lg-2">Item 01 - Pokemon 01 - Nome 01 - força 01</li>
                              <li className="col-12 col-md-2 col-lg-2">R$ 10,00</li>
                              <li className="col-12 col-md-2 col-lg-2">
                                  <button>-</button>
                                  <input type="text" value="1"/>
                                  <button>+</button>
                              </li>
                              <li className="col-12 col-md-2 col-lg-2">R$ 10,00</li>
                              <li className="col-12 col-md-2 col-lg-2"><a href="" className="fas fa-trash-alt"></a></li>
                          </div>
                          <div id="totalDivId" className="row">
                              <lh>TOTAL:</lh>
                              <lh>R$ 20,00</lh>                            
                          </div>
                      </ul>
                  </div>
              </div>
              <div className="row justify-content-center">
                  <button className="btn col-7 col-md-4 col-lg-3" type="submit">Continuar comprando</button>
                  <button className="btn col-7 col-md-4 col-lg-3" type="submit">Finalizar compra</button>
              </div>                                     
          </Jumbotron>
      </>
  );
};
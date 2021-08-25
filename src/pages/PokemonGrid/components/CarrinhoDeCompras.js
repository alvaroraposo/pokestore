import React from 'react';
import { Button } from 'react-bootstrap';
import { Accordion, Card } from 'react-bootstrap';
//import './App.css';

function CarrinhoDeCompras({carrinhoDeCompras, onGerenciarClick, that}) {
    const isVazio = ((!carrinhoDeCompras) || (carrinhoDeCompras.length === 0));
    const vazioClass =  !isVazio ? "card-text" : "d-none";

    function onGerenciar() {
        onGerenciarClick(that);
    }

  return (                
        <>
            <Accordion id="carrinhoDivId" className="col-12 col-md-6 col-lg-3 col-xl-3">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0" className="card-link fas fa-cart-plus">
                        <span> ITENS: ({carrinhoDeCompras.length})</span>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body className="card-body">
                            <p className={vazioClass}><i>Carrinho Vazio</i></p>
                            { carrinhoDeCompras.map((item) => {
                                return <p className="card-text"><i>{item.name.toUpperCase()} - R$ {item.price},00</i></p>
                            }) }
                            <Button type="submit" onClick={onGerenciar} disabled={isVazio}>
                                    <i className="fas fa-cart-plus"></i>
                                    <span className="d-inline"> CARRINHO</span>
                            </Button>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>            
        </>            
    );
}

export default CarrinhoDeCompras;

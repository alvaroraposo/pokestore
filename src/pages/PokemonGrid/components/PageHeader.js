import React from 'react';
import { Jumbotron } from 'react-bootstrap';

function PageHeader () {
    const poke1 = Math.floor(Math.random() * (891 - 1) + 1);
    const poke2 = Math.floor(Math.random() * (891 - 1) + 1);
    const image1 = (poke1 >= 100) ? poke1 : (poke1 >= 10) ? "0" + poke1 : "00" + poke1;
    const image2 = (poke2 >= 100) ? poke2 : (poke2 >= 10) ? "0" + poke2 : "00" + poke2;

    return (
        <>
            <div id="divHeader" className="row">
                <div className="col-md-12">
                    <Jumbotron fluid>
                        <div className="row">
                            <div className="col-4 d-md-block col-md-3 col-lg-3">
                                <img className="imgLogo" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${image1}.png`} alt="" onError={(e) => { 
                                    e.target.onerror = null;
                                    e.target.src = "/image/pikachu.png"
                                }}/>
                            </div>
                            <div className="col-8 col-md-6 col-lg-6"><img className="imgLogo" src="images/logo.png" alt=""/></div>
                            <div className="d-none col-md-3 d-md-block  col-lg-3">
                                <img className="imgLogo" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${image2}.png`} alt="" onError={(e) => { 
                                    e.target.onerror = null;
                                    e.target.src = "/image/bulbasaur.png"
                                }}/>
                            </div>                                            
                        </div>                
                    </Jumbotron>			          
                </div>
            </div>
        </>
    );
}

export default PageHeader;
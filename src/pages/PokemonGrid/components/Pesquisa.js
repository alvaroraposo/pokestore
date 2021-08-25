import React from 'react';
import { Button } from 'react-bootstrap';

function Pesquisa ({onPesquisaChange, onPesquisaClick, inputValue, that}) {
    function onChangePesquisa(e) {
        onPesquisaChange(e, that);
    }

    function onClickPesquisa() {
        onPesquisaClick(that);
    }

    return (
        <div id="searchDivId" className="col-12 col-md-6 col-lg-9">
            <input className="form-control" type="search" placeholder="Procure pelo seu pokemon" onChange={onChangePesquisa} value={inputValue}/>
            <Button className="btn" type="submit" onClick={onClickPesquisa}><i className="fas fa-search"></i></Button>
        </div>
    );
}

export default Pesquisa
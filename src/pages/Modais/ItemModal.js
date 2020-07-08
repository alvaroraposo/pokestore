import { Modal } from 'react-bootstrap';
import React from 'react';
import Pokemon from '../../classes/Pokemon';

export default function ItemModal(props) {  
    const [botoes, corpo] = RenderAddItem(props);    

    return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      id="myModalId"
    >
      <Modal.Body>
        {corpo}
      </Modal.Body>
      <Modal.Footer class="text-center"  id="divFooterId">
        <div>
            {botoes}
        </div>                
      </Modal.Footer>
    </Modal>
    );
}

function RenderEstatisticas(item, index) {
    return (
        <p key={index} className="card-text"><i>{item.name}: {item.baseStat}</i></p>
    );
}

function RenderAddItem(props) {

    let renderPokemon = props.myPokemon;
    

    if(renderPokemon == null) {
        renderPokemon = new Pokemon();
    }

    return [
    (<>
        <button className="btn" type="submit" onClick={props.onHide}>CONTINUAR COMPRANDO</button>
        <button className="btn" type="submit" onClick={props.onAddClick}>ADICIONAR AO CARRINHO</button>
    </>
    ), (
        <div id="divItemId">
            <div className="card-deck justify-content-center">
                <div className="col-12 col-xl-6 d-flex align-items-stretch">
                    <div className="card">
                        <img src={renderPokemon.image} className="card-img-top" alt="..." onError={(e) => { 
                            e.target.onerror = null;

                            if(e.target.src !== renderPokemon.errorImage) {
                                e.target.src = renderPokemon.errorImage;
                            }
                        }}/>
                        <div className="card-body">
                            <p className="card-text">{renderPokemon.name.toUpperCase()}</p>
                            <p className="card-text">R$ {renderPokemon.price}</p>
                            <div><img src="images\formas-pagamento.png" alt="..."/></div>                       
                        </div>                                         
                    </div>
                </div>
                <div className="col-12 col-xl-6 d-flex align-items-stretch">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-text">ESTATÍSTICAS</p>
                            { 
                                renderPokemon.stats.map((item, index) => {
                                    return RenderEstatisticas(item, index);
                            })}
                        </div>
                    </div>
                </div>                            
            </div>                                     
        </div>
    )];
  };
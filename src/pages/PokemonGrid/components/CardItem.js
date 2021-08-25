import React from 'react';
//import './App.css';

function CardItem({item, index, onCardItemClick, that}) {
    function onCardClick(e) {
        onCardItemClick(e, that);
    }

  return (
    <div id={index} key={item.id} className="col-6 col-md-6 col-lg-4 col-xl-3">
        <div className="card" onClick={ (e) => {onCardClick(e)}  }>
            <img src={item.image} className="card-img-top" alt="..." onError={(e) => { 
                e.target.onerror = null;

                if(e.target.src !== item.errorImage) {
                    e.target.src = item.errorImage;
                }
            }} />
            <div className="card-body">
                <p className="card-text">{item.name.toUpperCase()}</p>                                                                      
                <p className="card-text">R$ {item.price},00</p>                        
            </div>
        </div>
    </div>
  );
}

export default CardItem;

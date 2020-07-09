import React from 'react';
import { Accordion, Button, Jumbotron} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { getPokemonList, getFullPokemonListByName } from '../components';
import ItemModal from '../Modais/ItemModal'
import GerenciarModal from '../Modais/GerenciarModal';
import ConfirmarModal from '../Modais/ConfirmarModal';

export default class PokemonGrid extends React.Component {

    STATE_INICIAL = {
        loaded: false,
        inputValue: "",
        gridList: [],
        total: 0,
        paginaAtual: 1,
        paginacaoList: [1,2,3,4,5],
        termoPesquisa: "",
        showItemModal: false,
        showGerenciarModal: false,
        showConfirmarModal: false,
        pokemonModal: null,
        carrinhoDeCompras: [],
        pokeLogo1: 25,
        pokeLogo2: 4
    };

    constructor(props) {

        super(props)
        this.state = {
            ...this.STATE_INICIAL,
        }
    }

    renderLogo() {
        const poke1 = this.state.pokeLogo1;
        const poke2 = this.state.pokeLogo2;
        return (
            <>
                <div id="divHeader" className="row">
                    <div className="col-md-12">
                        <Jumbotron fluid>
                            <div className="row">
                                <div className="col-4 d-md-block col-md-3 col-lg-3">
                                    <img className="imgLogo" src={`https://pokeres.bastionbot.org/images/pokemon/${poke1}.png`} alt="" onError={(e) => { 
                                        e.target.onerror = null;

                                        e.target.src = "image/pikachu.png"
                                    }}/>
                                </div>
                                <div className="col-8 col-md-6 col-lg-6"><img className="imgLogo" src="images/logo.png" alt=""/></div>
                                <div className="d-none col-md-3 d-md-block  col-lg-3">
                                    <img className="imgLogo" src={`https://pokeres.bastionbot.org/images/pokemon/${poke2}.png`} alt="" onError={(e) => { 
                                        e.target.onerror = null;

                                        e.target.src = "image/ash.png.png"
                                    }}/>
                                </div>                                            
                            </div>                
                        </Jumbotron>			          
                    </div>
                </div>
            </>
        );
    }

    render() { 
        const CONFIRMAR_MODEL_OBRIGADO = "OBRIGADO";

        return (
            <>
                <div className="container-fluid">
                    { this.renderLogo() }  
                    { this.renderCarrinho() }
                    
                    <div id="divCardsId">                
                        <div className="row justify-content-center">
                            {   
                                this.state.gridList.map((item, index) => {
                                    return (this.renderCardItem(item, index))
                                })                                    
                            }
                        </div>                            
                    </div>

                    {this.renderPaginacao()}
                </div>
                <ItemModal show={this.state.showItemModal} onHide={() => this.setState({...this.state, showItemModal: false, pokemonModal: null})} myPokemon={this.state.pokemonModal} onAddClick={() => this.onAdicionarCarrinhoClick()}/>
                <GerenciarModal show={this.state.showGerenciarModal} onHide={() => this.setState({...this.state, showGerenciarModal: false })} myCart={this.state.carrinhoDeCompras} onFinalizarCompra={() => {this.onFinalizarCompra()}} onConfirmarClick={() => {this.onConfirmarClick()}}/>
                <ConfirmarModal modalType={CONFIRMAR_MODEL_OBRIGADO} show={this.state.showConfirmarModal} onHide={() => { window.location.reload() }} onConfirmarClick={() => {this.onConfirmarClick()}}/>
            </>
        )
    }

    onConfirmarClick() {
        window.location.reload();
    }
    
    onFinalizarCompra(){ 
        const carrinhoDeCompras = [];       
        this.setState({...this.STATE_INICIAL, carrinhoDeCompras, showConfirmarModal: true})
    }

    onAdicionarCarrinhoClick(){
        if(this.state.carrinhoDeCompras.indexOf(this.state.pokemonModal) === -1){
            this.state.carrinhoDeCompras.push(this.state.pokemonModal);
            this.setState({...this.state, showItemModal: false, carrinhoDeCompras: this.state.carrinhoDeCompras});
        }
        else {
            this.setState({...this.state, showItemModal: false, pokemonModal: null});
        }
    }

    renderCardItem(item, index){
        return (
            <div id={index} key={item.id} className="col-6 col-md-6 col-lg-4 col-xl-3">
                <div className="card" onClick={ (e) => {this.onCardItemClick(e)}  }>
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
        )
    }

    onCardItemClick(e) {
        const index = parseInt(e.currentTarget.parentElement.id);
        this.state.pokemonModal= this.state.gridList[index];
        this.setState({...this.state, showItemModal: true });         
    }
    
    renderCarrinho() {
        const isVazio = ((!this.state.carrinhoDeCompras) || (this.state.carrinhoDeCompras.length === 0));
        const vazioClass =  isVazio ? "card-text" : "d-none";

        return (                
            <div id="divControls" className="row">                                
                <Accordion id="carrinhoDivId" className="col-12 col-md-6 col-lg-3 col-xl-3">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0" className="card-link fas fa-cart-plus">
                            <span> ITENS: ({this.state.carrinhoDeCompras.length})</span>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body className="card-body">
                                <p className={vazioClass}><i>Carrinho Vazio</i></p>
                                { this.state.carrinhoDeCompras.map((item) => {
                                    return <p className="card-text"><i>{item.name.toUpperCase()} - R$ {item.price},00</i></p>
                                }) }
                                <Button type="submit" onClick={() => this.onGerenciarClick()} disabled={isVazio}>
                                        <i className="fas fa-cart-plus"></i>
                                        <span className="d-inline"> CARRINHO</span>
                                </Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                {this.renderPesquisa()}                
            </div>            
        );
    }

    onGerenciarClick() {
        this.setState({...this.state, showGerenciarModal: true });  
    }

    renderPesquisa() {
        return (
            <div id="searchDivId" className="col-12 col-md-6 col-lg-9">
                <input className="form-control" type="search" placeholder="Procure pelo seu pokemon" onChange={e => this.setState({...this.state, inputValue: e.target.value}) } value={this.state.inputValue}/>
                <Button className="btn" type="submit" onClick={() => { this.onPesquisaClick() }}><i className="fas fa-search"></i></Button>
            </div>
        );
    }

    onPesquisaClick() {
        this.state.termoPesquisa = this.state.inputValue;

        if(this.state.termoPesquisa === ""){  
            this.setState({ ...this.STATE_INICIAL });
        }
        
        this.state.paginaAtual = 1;
        
        this.loadPage();
    }

    pesquisa(offset=0) {        
        getFullPokemonListByName(this.state.inputValue).then((response) => {
            setTimeout(() => {
                const lista = response;
                const totalPaginas = Math.ceil(lista.length / 8);
                let paginacao = [];

                for(let i = 1; i <= 5; i++){
                    if(i > totalPaginas) {
                        if(totalPaginas === 0) {
                            paginacao.push(1);
                        }
                        break;
                    }
                        
        
                    paginacao.push(i);
                } 
                const total = lista.length;

                this.setState({
                    ...this.state,
                        loaded: false,
                        gridList: lista.splice(offset, 8),
                        paginaAtual: (offset === 0) ? 1 : this.state.paginaAtual,
                        paginacaoList: paginacao,
                        total
                });

            }, 1000);
        });
        
        this.setState({
            ...this.state,
            loaded: false
        })
    }

    loadPage(){
        const offset = (this.state.paginaAtual - 1)*8;

        if(!this.state.termoPesquisa || this.state.termoPesquisa.length === 0) {
            getPokemonList(offset).then((response) => {           
                setTimeout(() => {
                    const [lista, total] = response;

                    this.setState({
                        ...this.state,
                        loaded: false,
                        gridList: lista,
                        total
                    });
                }, 1000);
            });
        }
        else {
            this.pesquisa(offset);
        }

    }

    componentDidMount() {
        console.log("componentDidMount");
        const poke1 = Math.floor(Math.random() * (891 - 1) + 1);
        const poke2 = Math.floor(Math.random() * (891 - 1) + 1);

        this.setState({...this.state, pokeLogo1: poke1, pokeLogo2: poke2})
        this.loadPage();                
    }
    
    renderPaginacao() {
        const disableString = "page-item disabled" ;
        const enableString = "page-item";
        const totalItems = this.state.total;
        const totalPaginas = Math.ceil((totalItems / 8));
        const lista = [];

        this.state.paginacaoList.map((item, index) => {
            let disable = (item === this.state.paginaAtual) ? disableString: enableString;
            lista.push(
                <li key={index} className={disable}>
                    <a className="page-link" href="javascript:void(0);" onClick={() => { 
                            this.state.paginaAtual = item; 

                            if(item > this.state.paginaAtual){
                                this.pageNext(item, totalPaginas);
                            }

                            this.loadPage()
                        }}>
                        {item}
                    </a>
                </li>
            );

            return;
        });

        const menorDisable = (this.state.paginaAtual === 1) ? disableString : enableString;
        const maiorDisable = (this.state.paginaAtual === totalPaginas) ? disableString : enableString;
        
        return (
            <div id="divPaginacaoId">            
                <nav aria-label="Page navigation example">
                    <div>
                        <ul className="pagination justify-content-center">
                            <li className={menorDisable}>
                                <a className="page-link" href="javascript:void(0);" aria-label="Previous" onClick={() => {
                                        if(this.state.paginaAtual > 1) {
                                            this.state.paginaAtual--;
                                            this.pagePrevious(this.state.paginaAtual, totalPaginas);
                                            this.loadPage();
                                        }                                        
                                    } 
                                }>
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            {   
                                    lista.map((item) => {
                                        return (item);
                                    })                                    
                            }                            
                            <li className={maiorDisable}>
                                <a className="page-link" href="javascript:void(0);" aria-label="Next" onClick={() => {                                       
                                        if(this.state.paginaAtual <= totalPaginas) { 
                                            this.state.paginaAtual++;                                             
                                            this.pageNext(this.state.paginaAtual, totalPaginas);
                                            this.loadPage();
                                        }                                        
                                    } 
                                }>
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>    
        );
    }

    pagePrevious(page, totalPaginas) {
        this.state.paginaAtual = page;

        if(this.state.paginacaoList[0] === 1) {
            return;
        }

        if(this.state.paginaAtual >= this.state.paginacaoList[1]){
            let novaPaginacao = [
                this.state.paginaAtual - 1,
                this.state.paginaAtual
            ];

            if(this.state.paginaAtual - 2 >= 1) {
                novaPaginacao.unshift(this.state.paginaAtual-2);
            }

            for(let i = 1; i <= 2; i++) {     
                if(this.state.paginaAtual + i < totalPaginas)
                {
                    novaPaginacao.push(this.state.paginaAtual + i);
                }
            }

            this.state.paginacaoList = novaPaginacao;
        }
    }

    pageNext(page, totalPaginas){

        this.state.paginaAtual = page;

        if(this.state.paginacaoList[this.state.paginacaoList.length-1] === totalPaginas) {
            return;
        }

        if(this.state.paginaAtual >= this.state.paginacaoList[3]) {
            let novaPaginacao = [
             this.state.paginaAtual,
             this.state.paginaAtual + 1
            ];

            if(this.state.paginaAtual + 2 <= totalPaginas) {
                novaPaginacao.push(this.state.paginaAtual+2);
            }

            for(let i = 1; i <= 2; i++) {
                 if(this.state.paginaAtual - i >= 1)
                 {
                     novaPaginacao.unshift(this.state.paginaAtual - i);
                 }
            }
            
            this.state.paginacaoList = novaPaginacao;
         }
    }
}

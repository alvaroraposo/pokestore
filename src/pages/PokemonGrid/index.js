import React from 'react';
import { getPokemonList, getFullPokemonListByName } from '../components';
import ItemModal from '../Modais/ItemModal'
import GerenciarModal from '../Modais/GerenciarModal';
import ConfirmarModal from '../Modais/ConfirmarModal';
import CardItem from './components/CardItem';
import CarrinhoDeCompras from './components/CarrinhoDeCompras';
import PageHeader from './components/PageHeader';
import Pesquisa from './components/Pesquisa';
import Paginacao from './components/Paginacao';

export default class PokemonGrid extends React.Component {
//https://github.com/felipefadul/desafio-gama-pokestore // Ver design
//https://seralterego-gama-pokestore.netlify.app/ // Ver design
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
    };

    constructor(props) {
        super(props)
        this.state = {
            ...this.STATE_INICIAL,
        }
    }

    render() { 
        const CONFIRMAR_MODEL_OBRIGADO = "OBRIGADO";

        return (
            <>
                <div className="container-fluid">
                    <PageHeader/>
                    <div id="divControls" className="row">
                        <CarrinhoDeCompras carrinhoDeCompras={this.state.carrinhoDeCompras} onGerenciarClick={this.onGerenciarClick} that={this}/>
                        <Pesquisa onPesquisaChange={this.onPesquisaChange} onPesquisaClick={this.onPesquisaClick} inputValue={this.state.inputValue} that={this}/>
                    </div>
                    
                    <div id="divCardsId">                
                        <div className="row justify-content-center">
                            {   
                                this.state.gridList.map((item, index) => {
                                    return (<CardItem item={item} index={index} onCardItemClick={this.onCardItemClick} that={this}/>)
                                })                                    
                            }
                        </div>                            
                    </div>
                    <Paginacao that={this}/>
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

    onCardItemClick(e, that) {
        const index = parseInt(e.currentTarget.parentElement.id);
        that.state.pokemonModal= that.state.gridList[index];
        that.setState({...that.state, showItemModal: true });         
    }

    onGerenciarClick(that) {
        that.setState({...that.state, showGerenciarModal: true });  
    }

    onPesquisaChange(e, that) {
        that.setState({...that.state, inputValue: e.target.value});
    }
 
    onPesquisaClick(that) {
        that.state.termoPesquisa = that.state.inputValue;

        if(that.state.termoPesquisa === ""){  
            that.setState({ ...that.STATE_INICIAL });
        }
        
        that.state.paginaAtual = 1;
        
        that.loadPage();
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

        this.loadPage();                
    }    
}

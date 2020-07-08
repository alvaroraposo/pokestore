import { Modal, Jumbotron } from 'react-bootstrap';
import ConfirmarModal from './ConfirmarModal';
import React from 'react';

export default class GerenciarModal extends React.Component {

    CONFIRMAR_MODEL_EXCLUIR = "EXCLUIR";
    CONFIRMAR_MODEL_FINALIZAR = "FINALIZAR";

    constructor(props) {
        super(props)

        this.state = {
            carrinhoDeCompras: props.myCart,
            showConfirmarModalExcluir: false,
            showConfirmarModalFinalizar: false,
            confirmarModelType: "",
            itemExcluirIndex: -1
        }
    }

    render() {
        const [botoes, corpo] = this.RenderListaDeCompras(this.props);

        return (
        <Modal
          {...this.props}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          id="myModalId"
          backdrop="static"        
        >
          <Modal.Body>
            {corpo}
          </Modal.Body>
          <Modal.Footer class="text-center" id="divFooterId">
            <div>
                {botoes}
            </div>                
          </Modal.Footer>
          <ConfirmarModal modalType={this.CONFIRMAR_MODEL_FINALIZAR} show={this.state.showConfirmarModalFinalizar && !this.state.showConfirmarModalExcluir} onHide={() => {this.setState({...this.state, showConfirmarModalFinalizar: false })}} onConfirmarClick={() => {this.onConfirmarClick()}}/>         
        </Modal>        
        );
    }

    RenderCompra(index) {
        const carrinhoDeCompras = this.state.carrinhoDeCompras;
        const item = carrinhoDeCompras[index];
        
        return (
            <>
                <li className="d-block d-lg-none col-12 ">{item.name.toUpperCase()}</li>
                <li className="col-12 col-lg-2">
                    <img src={item.image} className="card-img-top" alt="..." onError={(e) => { 
                        e.target.onerror = null;
    
                        if(e.target.src !== item.errorImage) {
                            e.target.src = item.errorImage;
                        }
                    }} />
                </li>
                <li className="d-none d-lg-block col-lg-2">{item.name.toUpperCase()}</li>        
                <li className="col-12  col-lg-2">R$ {item.price},00</li>
                <li className="col-12 col-lg-2">
                    <button id={`btnDecrease${index}`} onClick={() => this.onButtonDecreaseClick(carrinhoDeCompras, index)}>-</button>
                    <span>{this.state.carrinhoDeCompras[index].quantidade}</span>
                    {/* <input id={`btnInput${index}`} type="text" onChange={(e) => { this.onChangeInput(e, carrinhoDeCompras, index); }} 
                        onBlur={(e) => { console.log("ONBLUR", e.target.value, this.state.carrinhoDeCompras[index].quantidade);
                                            if(e.target.value === "") {
                                                e.target.value = 1;
                                                const carrinhoDeCompras = this.state.carrinhoDeCompras;
                                                carrinhoDeCompras[index].quantidade = 1;
                                                this.setState({...this.state, carrinhoDeCompras: carrinhoDeCompras});
                                            } }}                         
                        value={this.state.carrinhoDeCompras[index].quantidade} 
                        className="gerenciarModalInput"/> */}
                    <button id={`btnIncrease${index}`} onClick={() => this.onButtonIncreaseClick(carrinhoDeCompras, index)}>+</button>
                </li>
                <li className="col-12 col-lg-2">R$ {item.price * item.quantidade}</li>
                <li className="col-12 col-lg-2"><a id={`linkPoubelle${index}`} href="javascript:void(0);" className="fas fa-trash-alt" onClick={() => {this.setState({...this.state, itemExcluirIndex: index, showConfirmarModalExcluir: true})}}></a></li>
                <ConfirmarModal modalType={this.CONFIRMAR_MODEL_EXCLUIR} show={this.state.showConfirmarModalExcluir && !this.state.showConfirmarModalFinalizar} onHide={() => {this.setState({...this.state, showConfirmarModalExcluir: false})}} onConfirmarClick={() => {
                     this.onConfirmarClick();
                     }}/>
            </>
        );       
    }

    onConfirmarClick() {
        if(this.state.showConfirmarModalExcluir) {            
            this.onPoubelleClick();
            this.setState({...this.state, itemExcluirIndex: -1, showConfirmarModalExcluir: false});            
        }        
        else if(this.state.showConfirmarModalFinalizar) {
            this.props.onFinalizarCompra();       
            this.setState({...this.state, showConfirmarModalFinalizar: false, carrinhoDeCompras: this.props.myCart});         
        }
    }

    onPoubelleClick() {
        const index = this.state.itemExcluirIndex;
        const carrinhoDeCompras = this.state.carrinhoDeCompras;

        carrinhoDeCompras.splice(index, 1);

        if(carrinhoDeCompras.length === 0)
            this.props.onHide();

        this.setState({ ...this.state, carrinhoDeCompras, showConfirmarModalExcluir: false });
    }

    onChangeInput(e, carrinhoDeCompras, index) {        
        const re = /^[1-9\b]$/;

        if (e.target.value === '' || re.test(e.target.value)) {
            carrinhoDeCompras[index].quantidade = e.target.value; 
            this.setState({ ...this.state, carrinhoDeCompras });
        }        
    }

    onButtonDecreaseClick(carrinhoDeCompras, index) {
        if(carrinhoDeCompras[index].quantidade <= 1)
            return;
        
        carrinhoDeCompras[index].quantidade--;
        this.setState({ ...this.state, carrinhoDeCompras });
    }

    onButtonIncreaseClick(carrinhoDeCompras, index) {
        if(carrinhoDeCompras[index].quantidade >= 9)
            return;
        
        carrinhoDeCompras[index].quantidade++;
        this.setState({ ...this.state, carrinhoDeCompras });
    }

    RenderListaDeCompras() {
        let total = 0;

        this.state.carrinhoDeCompras.forEach((item) => {
            total += item.quantidade * item.price;
        })

        return [(
            <>
                <button className="btn col-9 col-lg-3" type="submit" onClick={this.props.onHide}>Continuar comprando</button>
                <button className="btn col-9 col-lg-3" type="submit" onClick={() => this.setState({...this.state, showConfirmarModalFinalizar: true})}>Finalizar compra</button>                
            </>
        ),
        (
            <>
                <div id="divTituloId">
                    <span>CARRINHO</span>
                    <span>Clique em finalizar compra para efetuar o seu pedido</span>                    
                </div>
                <Jumbotron fluid id="divItensId">
                    <div className="row">
                        <div className="col-12">
                            <ul className="justify-content-center">
                                <div className="row">
                                    <lh className="d-none d-lg-block col-md-2 col-lg-2">Imagem</lh>
                                    <lh className="d-none d-lg-block col-md-2 col-lg-2">Nome</lh>
                                    <lh className="d-none d-lg-block col-md-2 col-lg-2">Preço unitário</lh>
                                    <lh className="d-none d-lg-block col-md-2 col-lg-2">Quantidade</lh>
                                    <lh className="d-none d-lg-block col-md-2 col-lg-2">Subtotal</lh>
                                    <lh className="d-none d-lg-block col-md-2 col-lg-2">Excluir</lh>
                                </div>
                                <div className="row align-items-center">
                                    { this.state.carrinhoDeCompras.map((_, index) => {
                                        return this.RenderCompra(index);
                                    })}
                                </div>
                                <div id="totalDivId" className="d-flex justify-content-sm-center justify-content-lg-end">
                                    <lh className="col-12 col-lg-4">TOTAL: R$ {total},00</lh>                       
                                </div>
                            </ul>
                        </div>
                    </div>                                 
                </Jumbotron>                
            </>
        )];
    };
    
}






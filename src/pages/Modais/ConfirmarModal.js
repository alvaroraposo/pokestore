import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ConfirmarModal(props) {
    const CONFIRMAR_MODEL_EXCLUIR = "EXCLUIR";
    const CONFIRMAR_MODEL_FINALIZAR = "FINALIZAR";
    const CONFIRMAR_MODEL_OBRIGADO = "OBRIGADO";

    const modalType = props.modalType;
    
    const titulo = (modalType === CONFIRMAR_MODEL_EXCLUIR) ? "EXCLUIR ITEM" : (modalType === CONFIRMAR_MODEL_FINALIZAR) ? "FINALIZAR COMPRA" : (modalType === CONFIRMAR_MODEL_OBRIGADO) ? "POKESTORE AGRADECE" : "";
    const mensagem = (modalType === CONFIRMAR_MODEL_EXCLUIR) ? "Clique em confirmar para remover o item do carrinho de compras" : (modalType === CONFIRMAR_MODEL_FINALIZAR) ? "Confirmar o pagamento do pedido?" : (modalType === CONFIRMAR_MODEL_OBRIGADO) ? "VOLTE SEMPRE!" : "";
    const btnCancelar = (modalType === CONFIRMAR_MODEL_OBRIGADO) ? "d-none" : "d-inline";
    const btnConfirmar = !(modalType === CONFIRMAR_MODEL_OBRIGADO) ? "Confirmar" : "Fechar";

    return (
      <>
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            size="sm"
            centered
            id="myConfirmarModalId"
            backdrop="static"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                <div id="divTituloId">
                    <span>{titulo}</span>
                </div>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>            
            <p>
                {mensagem}
            </p>
        </Modal.Body>        
        <Modal.Footer id="divFooterId" class="text-center">
                <span class={btnCancelar}><Button onClick={props.onHide} class="btn col-6">Cancelar</Button></span>
                <Button onClick={props.onConfirmarClick} class="btn col-6">{btnConfirmar}</Button>
        </Modal.Footer>
        </Modal>
      </>
    );
  }
import React from 'react';

function Paginacao ({that}) {
    const disableString = "page-item disabled" ;
    const enableString = "page-item";
    const totalItems = that.state.total;
    const totalPaginas = Math.ceil((totalItems / 8));
    const lista = [];

    that.state.paginacaoList.map((item, index) => {
        let disable = (item === that.state.paginaAtual) ? disableString: enableString;
        lista.push(
            <li key={index} className={disable}>
                <a className="page-link" href="javascript:void(0);" onClick={() => { 
                        that.state.paginaAtual = item; 

                        if(item > that.state.paginaAtual){
                            that.pageNext(item, totalPaginas);
                        }

                        that.loadPage()
                    }}>
                    {item}
                </a>
            </li>
        );

        return;
    });

    const menorDisable = (that.state.paginaAtual === 1) ? disableString : enableString;
    const maiorDisable = (that.state.paginaAtual === totalPaginas) ? disableString : enableString;

    function pagePrevious(page, totalPaginas) {
        that.state.paginaAtual = page;

        if(that.state.paginacaoList[0] === 1) {
            return;
        }

        if(that.state.paginaAtual >= that.state.paginacaoList[1]){
            let novaPaginacao = [
                that.state.paginaAtual - 1,
                that.state.paginaAtual
            ];

            if(that.state.paginaAtual - 2 >= 1) {
                novaPaginacao.unshift(that.state.paginaAtual-2);
            }

            for(let i = 1; i <= 2; i++) {     
                if(that.state.paginaAtual + i < totalPaginas)
                {
                    novaPaginacao.push(that.state.paginaAtual + i);
                }
            }

            that.state.paginacaoList = novaPaginacao;
        }
    }

    function pageNext(page, totalPaginas){

        that.state.paginaAtual = page;

        if(that.state.paginacaoList[that.state.paginacaoList.length-1] === totalPaginas) {
            return;
        }

        if(that.state.paginaAtual >= that.state.paginacaoList[3]) {
            let novaPaginacao = [
             that.state.paginaAtual,
             that.state.paginaAtual + 1
            ];

            if(that.state.paginaAtual + 2 <= totalPaginas) {
                novaPaginacao.push(that.state.paginaAtual+2);
            }

            for(let i = 1; i <= 2; i++) {
                 if(that.state.paginaAtual - i >= 1)
                 {
                     novaPaginacao.unshift(that.state.paginaAtual - i);
                 }
            }
            
            that.state.paginacaoList = novaPaginacao;
         }
    }    
    
    return (
        <div id="divPaginacaoId">            
            <nav aria-label="Page navigation example">
                <div>
                    <ul className="pagination justify-content-center">
                        <li className={menorDisable}>
                            <a className="page-link" href="javascript:void(0);" aria-label="Previous" onClick={() => {
                                    if(that.state.paginaAtual > 1) {
                                        that.state.paginaAtual--;
                                        pagePrevious(that.state.paginaAtual, totalPaginas);
                                        that.loadPage();
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
                                    if(that.state.paginaAtual <= totalPaginas) { 
                                        that.state.paginaAtual++;                                             
                                        pageNext(that.state.paginaAtual, totalPaginas);
                                        that.loadPage();
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

export default Paginacao;
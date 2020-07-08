import React from 'react';
import Axios from 'axios';
import Pokemon from '../classes/Pokemon';


export async function getPokemonList(offset = 0) {
    const lista = []; 
    let totalItems = 0;

    await Axios.get(`https://pokeapi.co/api/v2/pokemon?limit=8&offset=${offset}`).then((response) => {
            const urls = [];             
            
            if(!response.data || !Array.isArray(response.data.results)) {
                return;
            }
            
            totalItems = response.data.count;
            response.data.results.forEach(element => {
                urls.push(element.url);                    
            });

            urls.forEach(async (url) => {                
                await Axios.get(url).then((response) => {
                    const errorImage = (response.data.sprites.front_default) ? response.data.sprites.front_default : "images/imagem-nao-disponivel.png";
                    const imagem = "https://pokeres.bastionbot.org/images/pokemon/" + response.data.id + ".png";
                    const stats = [];

                    response.data.stats.forEach((item) => {
                        
                        const pokeStat = {
                            name: item.stat.name.toUpperCase(),
                            baseStat: item.base_stat
                        }
    
                        stats.push(pokeStat);
                    });                               
                
                    lista.push(new Pokemon(
                        response.data.id,
                        response.data.name, 
                        imagem,
                        response.data.weight,
                        errorImage,
                        stats
                    ));
                });
            })
    });   

    return [lista, totalItems];
}

export async function getFullPokemonListByName(name, offset=0) {
    const lista = []; 
    let totalItems = 0;

    await Axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`).then((response) => {
        const urls = [];             

        if(!response.data || !Array.isArray(response.data.results)) {
            return;
        }
       
        response.data.results.forEach(element => {
            if(element.name.includes(name.toLowerCase())){                
                urls.push(element.url);                
            }
        });        

        urls.forEach(async (url) => {  
            await Axios.get(url).then((response) => {
                    const errorImage = (response.data.sprites.front_default) ? response.data.sprites.front_default : "images/imagem-nao-disponivel.png"  
                    const imagem = "https://pokeres.bastionbot.org/images/pokemon/" + response.data.id + ".png"
                    const stats = [];

                    response.data.stats.forEach((item) => {
                        
                        const pokeStat = {
                            name: item.stat.name.toUpperCase(),
                            baseStat: item.base_stat
                        }
    
                        stats.push(pokeStat);
                    });                               
                
                    lista.push(new Pokemon(
                        response.data.id,
                        response.data.name, 
                        imagem,
                        response.data.weight,
                        errorImage,
                        stats
                    ));
            });
        })
    });     
    
    return lista;
}

export default function setInputFilter(textbox, inputFilter) {
    ["onInput", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseUp", "onSelect", "onContextMenu", "onDrop"].forEach(function(event) {
      textbox.addEventListener(event, function() {

        console.log("addEventListener", event);
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
}

export function isNumberKey(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
}  


export function isNumericKey(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 
    && (charCode < 48 || charCode > 57))
    return true;
    return false;
} 

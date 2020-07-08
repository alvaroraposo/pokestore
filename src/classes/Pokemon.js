export default class Pokemon {
    constructor(id=0, name="Carregando", image="images/imagem-nao-disponivel.png", price="", errorImage="images/imagem-nao-disponivel.png", stats=[{}]) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.errorImage = errorImage;
        this.stats = stats;
        this.quantidade = 1;
    }
}
/**
 * define a classe Produto com as propriedades básicas.
 */
export class Produto {
    codigo;
    nome;
    quantidade;

    /**
     * construtor para criar uma nova instância de Produto.
     * @param {number} codigo - O código do produto.
     * @param {string} nome - O nome do produto.
     * @param {number} quantidade - A quantidade em estoque.
     */
    constructor(codigo, nome, quantidade) {
        this.codigo = codigo;
        this.nome = nome;
        this.quantidade = quantidade;
    }
}
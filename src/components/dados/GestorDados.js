import AsyncStorage from '@react-native-async-storage/async-storage';
import { Produto } from './Produto'; // Importa a classe para saber o que está salvando

// Define um prefixo para as chaves, para não misturar com outros dados
const CHAVE_PREFIXO = 'produto_';

/**
 * Gerencia as operações de Adicionar, Remover e Obter
 * produtos do AsyncStorage.
 */
export default class GestorDados {

    /**
     * Adiciona ou atualiza um produto no AsyncStorage.
     * @param {Produto} produto - O objeto Produto a ser salvo.
     */
    async adicionar(produto) {
        try {
            // Usa o código do produto como parte da chave
            const key = CHAVE_PREFIXO + produto.codigo;
            const jsonValue = JSON.stringify(produto);
            await AsyncStorage.setItem(key, jsonValue);
            console.log("Produto salvo com sucesso:", produto);
        } catch (e) {
            console.error("Erro ao salvar o produto:", e);
        }
    }

    /**
     * Remove um produto do AsyncStorage usando seu código.
     * @param {number} codigo - O código do produto a ser removido.
     */
    async remover(codigo) {
        try {
            const key = CHAVE_PREFIXO + codigo;
            await AsyncStorage.removeItem(key);
            console.log("Produto removido com sucesso:", codigo);
        } catch (e) {
            console.error("Erro ao remover o produto:", e);
        }
    }

    /**
     * Retorna um array com todos os produtos salvos.
     * @returns {Promise<Array<Produto>>} - Uma promessa que resolve para um array de Produtos.
     */
    async obterTodos() {
        try {
            // 1. Pega todas as chaves
            const keys = await AsyncStorage.getAllKeys();

            // 2. Filtra apenas as chaves que são de produtos
            const chavesProdutos = keys.filter(key => key.startsWith(CHAVE_PREFIXO));

            if (chavesProdutos.length === 0) {
                return []; // Retorna vazio se não encontrar nada
            }

            // 3. Busca todos os dados de uma vez (mais rápido)
            const objJSON = await AsyncStorage.multiGet(chavesProdutos);

            // 4. Mapeia os resultados para converter o JSON de volta em objetos
            const objetos = objJSON.map(element => {
                // element[0] é a chave, element[1] é o valor (string JSON)
                return JSON.parse(element[1] || '{}');
            });

            console.log("Produtos buscados do AsyncStorage:", objetos);
            
            return objetos;
        } catch (e) {
            console.error("Erro ao obter todos os produtos:", e);
            return []; // Retorna vazio em caso de erro
        }
    }
}
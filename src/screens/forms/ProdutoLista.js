import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import GestorDados from '../../components/dados/GestorDados';
import ProdutoItem from './ProdutoItem'
import { styles } from '../../../styles/CommonStyles';
import { useIsFocused } from '@react-navigation/native';

export default function ProdutoLista({ navigation }) {

    const gestor = useMemo(() => new GestorDados(), []);

    const [produtos, setProdutos] = useState([]);

    const isFocused = useIsFocused();

    const carregarProdutos = useCallback(async () => {
        try {
            const objs = await gestor.obterTodos();
            setProdutos(objs);
            console.log("Lista de Produtos Atualizada:", objs);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        }
    }, [gestor]); // Dependência: gestor (embora ele não mude, é bom manter a prática)

    useEffect(() => {
        if (isFocused) {
            carregarProdutos();
        }
        // gestor.obterTodos().then(objs => setProdutos(objs));
    }, [isFocused, carregarProdutos]);

    const myKeyExtractor = item => {
        // garante que o código seja uma string
        return item.codigo ? item.codigo.toString() : Math.random().toString();
    };

    function excluirProduto(codigo) {
        // garante que a lista seja recarregada APÓS a remoção
        gestor.remover(codigo).then(() => {
            console.log(`Produto ${codigo} removido. Recarregando lista...`);
            carregarProdutos();
        });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={
                () => navigation.navigate('NovoProd')
                }>
                <Text style={styles.buttonTextBig}>Novo Produto</Text>
            </TouchableOpacity>
            <FlatList style={styles.scrollContainer}
                data={produtos}
                contentContainerStyle={styles.itemsContainer}
                keyExtractor={myKeyExtractor}
                renderItem={
                    ({ item }) =>
                        <ProdutoItem
                            onDelete={
                                () => excluirProduto(item.codigo)
                            }
                            produto={item}
                        />
                }
            />
        </View>
    );
}

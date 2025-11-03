import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ProdutoForm from './src/screens/forms/ProdutoForm';
import ProdutoLista from './src/screens/forms/ProdutoLista';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='ListaProd'>
                <Stack.Screen name='ListaProd'
                    options={{ title: 'Listagem de Produtos' }}
                    component={ProdutoLista} />
                <Stack.Screen name='NovoProd'
                    options={{ title: 'Novo Produto' }}
                    component={ProdutoForm} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

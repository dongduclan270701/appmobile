import React from 'react';
import { Colors } from '../components/styles'
import { Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Homepage from '../screens/Homepage'
import Product from '../screens/Product'
import Cart from '../screens/Cart'
import User from '../screens/User'
import ProductListScreen from '../screens/ProductListScreen'
import ProductDetailScreen from '../screens/ProductDetailScreen'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeDrawer = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: 'red',
                tabBarStyle: {
                    height: 90,
                    paddingHorizontal: 5,
                    paddingTop: 0,
                    backgroundColor: 'black',
                    position: 'absolute',
                    borderTopWidth: 0,
                },
            })}
        >
            <Tab.Screen name="Homepage" component={Homepage} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <Ionicons name="home" color={color} size={26} />
                ),
            }} />
            <Tab.Screen name="Product" component={Product} options={{
                tabBarLabel: 'Product',
                tabBarIcon: ({ color }) => (
                    <Ionicons name="laptop-outline" color={color} size={26} />
                ),
            }} />
            <Tab.Screen name="Cart" component={Cart} options={{
                tabBarLabel: 'Cart',
                tabBarIcon: ({ color }) => (
                    <Ionicons name="cart" color={color} size={26} />
                ),
            }} />
            <Tab.Screen name="User" component={User} options={{
                tabBarLabel: 'User',
                tabBarIcon: ({ color }) => (
                    <Ionicons name="person" color={color} size={26} />
                ),
            }} />
        </Tab.Navigator>
    )
}

const { primary, tertiary } = Colors
const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyled: {
                        backgroundColor: 'transparent',
                    },
                    headerTintColor: tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    }
                }}
                initialRouteName='HomeDrawer'
            >
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Signup' component={Signup} />
                <Stack.Screen name='HomeDrawer' component={HomeDrawer} />
                <Stack.Screen name="ProductListScreen" component={ProductListScreen} />
                <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default RootStack

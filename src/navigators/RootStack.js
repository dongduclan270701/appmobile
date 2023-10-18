import React, { useState, useEffect } from 'react';
import { Colors } from '../components/styles'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Homepage from '../screens/Homepage'
import Product from '../screens/Product'
import Cart from '../screens/Cart'
import User from '../screens/User'
import Payment from '../screens/Payment'
import PaymentInformation from '../screens/PaymentInformation'
import ApplyDiscount from '../screens/ApplyDiscount'
import ProductListScreen from '../screens/ProductListScreen'
import ProductDetailScreen from '../screens/ProductDetailScreen'
import AccountSecurity from '../screens/AccountSecurity'
import ChangeInformationAccount from '../screens/ChangeInformationAccount'
import ChangePassword from '../screens/ChangePassword'
import Order from '../screens/Order'
import OrderDetail from '../screens/OrderDetail'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    fetchCartUser,
    fetchSyncUser,
    fetchUserOrderDetails
} from '../apis/index'
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeDrawer = (props) => {
    const { cartData, token, userInformation, handleSetLogged, handleChangeDataCart } = props
    const [lengthCart, setLengthCart] = useState([])
    useEffect(() => {
        setLengthCart(cartData)
    }, [cartData]);

    const handleChangeLengthCart = (data) => {
        setLengthCart(data)
        handleChangeDataCart(data)
    }

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
            <Tab.Screen name="Homepage" options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <Ionicons name="home" color={color} size={26} />
                ),
            }} >
                {({ navigation, route }) => <Homepage token={token} userInformation={userInformation} navigation={navigation} route={route} />}
            </Tab.Screen>
            <Tab.Screen name="Product" options={{
                tabBarLabel: 'Product',
                tabBarIcon: ({ color }) => (
                    <Ionicons name="laptop-outline" color={color} size={26} />
                ),
            }} >
                {({ navigation, route }) => <Product token={token} userInformation={userInformation} navigation={navigation} route={route} />}
            </Tab.Screen>
            <Tab.Screen name="Cart" options={{
                tabBarLabel: 'Cart',
                tabBarIcon: ({ color }) => (
                    <Ionicons name="cart" color={color} size={26} />
                ),
                tabBarBadge: lengthCart.length
            }} >
                {({ navigation, route }) => <Cart token={token} lengthCart={lengthCart} handleChangeLengthCart={handleChangeLengthCart} userInformation={userInformation} navigation={navigation} route={route} />}
            </Tab.Screen>
            < Tab.Screen name="User" options={{
                tabBarLabel: 'User',
                tabBarIcon: ({ color }) => (
                    <Ionicons name="person" color={color} size={26} />
                ),
            }} >
                {({ navigation, route }) => <User token={token} userInformation={userInformation} navigation={navigation} route={route} handleSetLogged={handleSetLogged} />}
            </Tab.Screen>
        </Tab.Navigator >
    )
}

const { primary, tertiary } = Colors
const RootStack = ({ navigation }) => {
    const [cartData, setCartData] = useState([]);
    const [token, setToken] = useState(null)
    const [userInformation, setUserInformation] = useState(null)
    const [orderList, setOrderList] = useState([])
    const handleSetLogged = (data) => {
        if (data.token !== null & data.user !== null) {
            setToken(data.token)
            setUserInformation(data.user)
            fetchCartUser(data.user[0], data.token)
                .then(result => {
                    setCartData(result.product)
                })
                .catch(error => {
                    console.log(error)
                })
            fetchUserOrderDetails(data.user[0], data.token)
                .then(result => {
                    setOrderList(result)
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('userInformation');
            setToken(data.token)
            setUserInformation(data.user)
            setCartData([])
        }
    }
    const handleChangeInformation = (data) => {
        setUserInformation(data)
    }
    const handleChangeDataCart = (data) => {
        setCartData(data)
    }
    useEffect(() => {
        const getData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                setToken(token)
                const userInf = await AsyncStorage.getItem('userInformation');
                setUserInformation(JSON.parse(userInf))
                fetchSyncUser(token)
                    .then(result => {
                        setUserInformation(result)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                fetchCartUser(JSON.parse(userInf)[0], token)
                    .then(result => {
                        setCartData(result.product)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                fetchUserOrderDetails(JSON.parse(userInf)[0], token)
                    .then(result => {
                        setOrderList(result)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                return value
            } catch (error) {
            }
        };
        getData()

    }, []);
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
                <Stack.Screen name='Login' options={{ headerShown: false }}>
                    {({ navigation }) => <Login handleSetLogged={handleSetLogged} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen name='Signup' component={Signup} />
                <Stack.Screen name='HomeDrawer' options={{ headerShown: false }}>
                    {() => <HomeDrawer cartData={cartData} token={token} userInformation={userInformation} handleSetLogged={handleSetLogged} handleChangeDataCart={handleChangeDataCart} />}
                </Stack.Screen>
                <Stack.Screen name="ProductListScreen" component={ProductListScreen} />
                <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
                <Stack.Screen name="Payment" >
                    {({ navigation }) => <Payment cartData={cartData} handleChangeDataCart={handleChangeDataCart} token={token} userInformation={userInformation} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen name="PaymentInformation" component={PaymentInformation} />
                <Stack.Screen name="ApplyDiscount" component={ApplyDiscount} />
                <Stack.Screen name="AccountSecurity" >
                    {({ navigation }) => <AccountSecurity userInformation={userInformation} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen name="ChangeInformationAccount" >
                    {({ navigation }) => <ChangeInformationAccount userInformation={userInformation} token={token} handleChangeInformation={handleChangeInformation} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen name="ChangePassword" >
                    {({ navigation }) => <ChangePassword userInformation={userInformation} token={token} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen name="Order" >
                    {({ navigation }) => <Order orderList={orderList} token={token} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen name="OrderDetail" component={OrderDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default RootStack

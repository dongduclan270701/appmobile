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
import Notification from '../screens/Notification'
import Order from '../screens/Order'
import OrderDetail from '../screens/OrderDetail'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    fetchCartUser,
    fetchSyncUser,
    fetchUserOrderDetails,
    fetchNoticeByCustomer
} from '../apis/index'
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeDrawer = (props) => {
    const { cartData, token, userInformation, handleSetLogged, orderList, noticeList, handleChangeStepDefault, handleReadNotice, countOrder } = props
    const [lengthCart, setLengthCart] = useState([])
    const [lengthNotice, setLengthNotice] = useState([])
    useEffect(() => {
        setLengthCart(cartData)
        setLengthNotice(noticeList)
    }, [cartData, noticeList, countOrder]);
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
                {({ navigation, route }) => <Homepage token={token} lengthCart={lengthCart} userInformation={userInformation} navigation={navigation} route={route} />}
            </Tab.Screen>
            <Tab.Screen name="Product" options={{
                tabBarLabel: 'Product',
                tabBarIcon: ({ color }) => (
                    <Ionicons name="laptop-outline" color={color} size={26} />
                ),
            }} >
                {({ navigation, route }) => <Product token={token} userInformation={userInformation} navigation={navigation} route={route} />}
            </Tab.Screen>
            <Tab.Screen name="Notification" options={{
                tabBarLabel: 'Notification',
                tabBarIcon: ({ color }) => (
                    <Ionicons name="notifications-outline" color={color} size={26} />
                ),
                tabBarBadge: lengthNotice ? lengthNotice.filter(item => item.isReadCus === false).length > 99 ? '99+' : lengthNotice.filter(item => item.isReadCus === false).length : 0
            }} >
                {({ navigation, route }) => <Notification handleReadNotice={handleReadNotice} lengthNotice={lengthNotice} token={token} userInformation={userInformation} navigation={navigation} route={route} />}
            </Tab.Screen>
            < Tab.Screen name="User" options={{
                tabBarLabel: 'User',
                tabBarIcon: ({ color }) => (
                    <Ionicons name="person" color={color} size={26} />
                ),
            }} >
                {({ navigation, route }) => <User countOrder={countOrder} orderList={orderList} handleChangeStepDefault={handleChangeStepDefault} token={token} userInformation={userInformation} navigation={navigation} route={route} handleSetLogged={handleSetLogged} />}
            </Tab.Screen>
        </Tab.Navigator >
    )
}

const { primary, tertiary } = Colors
const RootStack = ({ navigation }) => {
    const [cartData, setCartData] = useState([]);
    const [token, setToken] = useState(null)
    const [userInformation, setUserInformation] = useState(null)
    const [orderList, setOrderList] = useState(null)
    const [noticeList, setNoticeList] = useState(null)
    const [stepDefault, setStepDefault] = useState(0)
    const [countOrder, setCountOrder] = useState({ processing: 0, delivery: 0, successful: 0, cancel: 0 })
    const stepStatusMapping = {
        processing: ['Ordered', 'Payment information confirmed'],
        delivery: ['Delivered to the carrier', 'Being transported'],
        successful: ['Delivery successful'],
        cancel: ['Cancel', 'Delivery failed'],
    }
    const handleSetLogged = (data) => {
        if (data.token !== null & data.user !== null) {
            setToken(data.token)
            setUserInformation({ image: data.user[4], address: data.user[3], phoneNumber: data.user[2], email: data.user[0], username: data.user[1] })
            fetchCartUser(data.user[0], data.token)
                .then(result => {
                    setCartData(result.product)
                })
                .catch(error => {
                    console.log(error)
                })
            fetchUserOrderDetails(data.user[0], data.token)
                .then(result => {
                    setOrderList(result.orders)
                    const countOrders = result.orders.reduce((accumulator, order) => {
                        for (const type in stepStatusMapping) {
                            if (stepStatusMapping[type].includes(order.status)) {
                                accumulator[type] += 1
                                break
                            }
                        }
                        return accumulator;
                    }, { processing: 0, delivery: 0, successful: 0, cancel: 0 })
                    setCountOrder(countOrders);
                })
                .catch(error => {
                    console.log(error)
                })
            fetchNoticeByCustomer(data.user[0], data.token)
                .then(result => {
                    setNoticeList(result)
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
            setNoticeList([])
        }
    }
    const handleChangeInformation = (data) => {
        setUserInformation(data)
    }
    const handleChangeDataCart = (data) => {
        setCartData(data)
    }
    const handleChangeStepDefault = (data) => {
        setStepDefault(data)
    }
    const handleReadNotice = (id) => {
        const updatedArray = noticeList.map(item => {
            if (item._id === id) {
                return { ...item, isReadCus: true }
            }
            return item
        });
        setNoticeList(updatedArray)
    }
    const handleChangeNotice = (data) => {
        setNoticeList([data, ...noticeList])
    }
    const handleChangeOrderList = (data) => {
        const firstImg = data.product[0].img[0]
        data.product[0].img = firstImg
        orderList.unshift(data)
        const countOrders = orderList.reduce((accumulator, order) => {
            for (const type in stepStatusMapping) {
                if (stepStatusMapping[type].includes(order.status)) {
                    accumulator[type] += 1
                    break
                }
            }
            return accumulator;
        }, { processing: 0, delivery: 0, successful: 0, cancel: 0 })
        setCountOrder(countOrders);
    }
    const handleChangeOrderListCancel = (data) => {
        const updatedArray = orderList.map(item => {
            if (item.orderId === data.orderId) {
                const firstImg = data.product[0].img[0]
                data.product[0].img = firstImg
                return data
            }
            return item
        });
        const countOrders = updatedArray.reduce((accumulator, order) => {
            for (const type in stepStatusMapping) {
                if (stepStatusMapping[type].includes(order.status)) {
                    accumulator[type] += 1
                    break
                }
            }
            return accumulator;
        }, { processing: 0, delivery: 0, successful: 0, cancel: 0 })
        setCountOrder(countOrders);
        setOrderList(updatedArray)
    }
    useEffect(() => {
        const getData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                setToken(token)
                const userInf = await AsyncStorage.getItem('userInformation');
                // setUserInformation(JSON.parse(userInf))
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
                        setOrderList(result.orders)
                        const countOrders = result.orders.reduce((accumulator, order) => {
                            for (const type in stepStatusMapping) {
                                if (stepStatusMapping[type].includes(order.status)) {
                                    accumulator[type] += 1
                                    break
                                }
                            }
                            return accumulator;
                        }, { processing: 0, delivery: 0, successful: 0, cancel: 0 })
                        setCountOrder(countOrders);
                    })
                    .catch(error => {
                        console.log(error)
                    })
                fetchNoticeByCustomer(JSON.parse(userInf)[0], token)
                    .then(result => {
                        setNoticeList(result)
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
                    {() => <HomeDrawer countOrder={countOrder} handleChangeStepDefault={handleChangeStepDefault} handleReadNotice={handleReadNotice} noticeList={noticeList} orderList={orderList} cartData={cartData} token={token} userInformation={userInformation} handleSetLogged={handleSetLogged} handleChangeDataCart={handleChangeDataCart} />}
                </Stack.Screen>
                <Stack.Screen name="ProductListScreen" component={ProductListScreen} />
                <Stack.Screen name="ProductDetailScreen" >
                    {({ navigation, route }) => <ProductDetailScreen handleChangeDataCart={handleChangeDataCart} cartData={cartData} token={token} userInformation={userInformation} navigation={navigation} route={route} />}
                </Stack.Screen>
                <Stack.Screen name="Cart" >
                    {({ navigation, route }) => <Cart handleChangeDataCart={handleChangeDataCart} cartData={cartData} token={token} userInformation={userInformation} navigation={navigation} route={route} />}
                </Stack.Screen>
                <Stack.Screen name="Payment" >
                    {({ navigation }) => <Payment handleChangeNotice={handleChangeNotice} handleChangeOrderList={handleChangeOrderList} cartData={cartData} handleChangeDataCart={handleChangeDataCart} token={token} userInformation={userInformation} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen name="PaymentInformation" >
                    {({ navigation, route }) => <PaymentInformation navigation={navigation} route={route} />}
                </Stack.Screen>
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
                    {({ navigation }) => <Order orderList={orderList} stepDefault={stepDefault} token={token} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen name="OrderDetail" >
                    {({ navigation, route }) => <OrderDetail handleChangeOrderListCancel={handleChangeOrderListCancel} token={token} route={route} handleChangeNotice={handleChangeNotice} userInformation={userInformation} navigation={navigation} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default RootStack

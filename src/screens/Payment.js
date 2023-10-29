import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Alert
} from 'react-native';
import {
    HomepageContainer,
    LinePayment
} from '../components/styles'

import { 
    createOrderByCustomer,
    updateCart
} from '../apis/index'
import { Octicons, Ionicons, Entypo } from '@expo/vector-icons'
const Payment = ({ navigation, cartData, userInformation, handleChangeDataCart,token }) => {
    const formatter = new Intl.NumberFormat('en-US')
    const [orderCheckOut, setOrderCheckOut] = useState({})
    const [dataCart, setDataCart] = useState([])
    useEffect(() => {
        setDataCart(cartData)
        setOrderCheckOut({
            product: cartData,
            email: userInformation.email,
            username: userInformation.username,
            phoneNumber: userInformation.phoneNumber,
            address: userInformation.address,
            city: "",
            district: "",
            commune: "",
            discountCode: [],
            shipping_process: [],
            method_payment: "Thanh toán khi nhận hàng",
            ship: 30000,
            sumOrder: 0,
            status: 'Ordered',
        })
    }, [cartData, userInformation])
    const total = dataCart.reduce((accumulator, currentItem) => {
        const productTotal = currentItem.nowPrice * currentItem.quantity
        return accumulator + productTotal
    }, 0)
    const handleChangeInformation = (data) => {
        setOrderCheckOut(data)
    }
    const handleCreateOrder = () => {
        const date = new Date();
        const minutes = date.getMinutes();
        const hours = date.getHours();
        const time = `${hours}:${minutes}`;
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const today = `${year}-${month}-${day}`;
        if (orderCheckOut.address === "") {
            Alert.alert('Missing', `Fill your address`);
        }
        else if (orderCheckOut.phoneNumber === null) {
            Alert.alert('Missing', `Fill your phoneNumber`);
        }
        else if (orderCheckOut.phoneNumber.length !== 10) {
            Alert.alert('Missing', `Your phone number incorrect format`);
        }
        else if (orderCheckOut.city === "") {
            Alert.alert('Missing', `Fill your city`);
        }
        else if (orderCheckOut.district === "") {
            Alert.alert('Missing', `Fill your district`);
        }
        else if (orderCheckOut.commune === "") {
            Alert.alert('Missing', `Fill your commune`);
        }
        else if (orderCheckOut.product === null || orderCheckOut.product.length < 1) {
            Alert.alert('Missing', `You don't have product`);
        }
        else {
            const newData = {
                ...orderCheckOut,
                shipping_process: [{ time: time, date: today, content: 'Ordered' }],
                sumOrder: total + 30000,
                createDate: today
            }
            
            createOrderByCustomer(newData, token)
                .then(result => {
                    updateCart(userInformation.email, [], token)
                        .then(result => {
                            handleChangeDataCart([])
                            Alert.alert('Successful', `Your order has been created`);
                            navigation.navigate('Homepage')
                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'black' }}>
                <HomepageContainer>
                    <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: 20, fontWeight: 'bold' }}>Payment</Text>
                </HomepageContainer>
                <View style={[styles.information]}>
                    <Ionicons name='location' style={{ color: 'red', paddingHorizontal: 10, fontSize: 24 }}></Ionicons>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('PaymentInformation', { orderCheckOut, handleChangeInformation })
                    }} style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'white', fontSize: 15, paddingVertical: 5 }}>Địa chỉ nhận hàng</Text>
                            <Text style={{ color: 'white', fontSize: 15 }}>{userInformation.username} | {userInformation.phoneNumber}</Text>
                            <Text style={{ color: 'white', fontSize: 15 }}>{userInformation.address}</Text>
                            <Text style={{ color: 'white', fontSize: 15 }}>{orderCheckOut.commune} {orderCheckOut.district} {orderCheckOut.city}</Text>
                        </View>
                        <Ionicons name='chevron-forward' style={{ color: 'white', padding: 30, fontSize: 24 }}></Ionicons>
                    </TouchableOpacity>
                </View>
                <LinePayment style={{ flexDirection: 'row' }} />
                {dataCart.map((item, index) => (
                    <View style={styles.cartItems} key={index}>
                        <View style={styles.cartItem}>
                            <Image source={{ uri: item.img[0] }} style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>{item.nameProduct}</Text>
                                <Text style={styles.productPrice}>{formatter.format(item.nowPrice)} VNĐ</Text>
                            </View>
                            <View style={styles.quantityContainer}>
                                <Text style={styles.quantityText}>x {item.quantity}</Text>
                            </View>
                        </View>
                    </View>
                ))}
                <LinePayment style={{ flexDirection: 'row' }} />
                <View style={[styles.information, { justifyContent: 'space-between', padding: 10 }]}>
                    <Text style={{ color: 'white', paddingHorizontal: 10, fontSize: 16 }}>Total amount ( 3 goods)</Text>
                    <Text style={{ color: 'red', paddingHorizontal: 10, fontSize: 16 }}>{formatter.format(total)} VNĐ</Text>
                </View>
                {/* <LinePayment style={{ flexDirection: 'row' }} />
                <View style={[styles.information, { justifyContent: 'space-between', padding: 10 }]}>
                    <Entypo name='ticket' style={{ color: 'red', paddingHorizontal: 10, fontSize: 24 }}></Entypo>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('ApplyDiscount')
                    }} style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'red', fontSize: 15, paddingVertical: 5 }} >- 24,000 VNĐ</Text>
                        <Ionicons name='chevron-forward' style={{ color: 'white', textAlign: 'right', fontSize: 24 }}></Ionicons>
                    </TouchableOpacity>
                </View> */}
                <LinePayment style={{ flexDirection: 'row' }} />
                <View style={[styles.information, { justifyContent: 'space-between', padding: 10 }]}>
                    <Text style={{ color: 'white', paddingHorizontal: 10, fontSize: 16 }}>Ship fee</Text>
                    <Text style={{ color: 'red', paddingHorizontal: 10, fontSize: 16 }}>30,000 VNĐ</Text>
                </View>
                <LinePayment style={{ flexDirection: 'row' }} />
                <View style={[styles.information, { justifyContent: 'space-between', padding: 10 }]}>
                    <Text style={{ color: 'white', paddingHorizontal: 10, fontSize: 16 }}>Payment method</Text>
                    <Text style={{ color: 'white', paddingHorizontal: 10, fontSize: 16 }}>Payment upon delivery</Text>
                </View>
                <LinePayment style={{ flexDirection: 'row' }} />
                <View style={[styles.information, { justifyContent: 'space-between', padding: 10 }]}>
                    <Text style={{ color: 'white', paddingHorizontal: 10, fontSize: 16 }}>Total </Text>
                    <Text style={{ color: 'red', paddingHorizontal: 10, fontSize: 16 }}>{formatter.format(total + 30000)} VNĐ</Text>
                </View>
                <LinePayment style={{ flexDirection: 'row' }} />
                <View style={[styles.information, { justifyContent: 'space-between', padding: 10, paddingBottom: 100 }]}>
                    <Text style={{ color: 'white', paddingHorizontal: 10, fontSize: 16, fontWeight: 'bold' }}>You need to pay <Text style={{ color: 'red' }}>{formatter.format(total + 30000)} VND</Text> upon receiving the goods</Text>
                </View>
            </ScrollView>
            <TouchableOpacity
                style={styles.buyButton}
                onPress={() => {
                    // navigation.navigate('Cart')
                    handleCreateOrder()
                }}
            >
                <Text style={styles.buyButtonText}>Create Order</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    information: {
        flexDirection: 'row',
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: 'black',
        position: 'relative'
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 40,
    },
    quantityButton: {
        backgroundColor: 'unset',
        padding: 0,
        borderRadius: 5,
    },
    quantityButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 10,
        color: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    cartItems: {
        marginBottom: 16,
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 16,
    },
    productInfo: {
        textAlign: 'left'
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        width: 210
    },
    productPrice: {
        fontSize: 14,
        color: 'red',
        marginTop: 8,
    },
    buyButton: {
        position: 'absolute',
        left: 100,
        right: 100,
        bottom: 30,
        backgroundColor: 'red',
        padding: 10,
        alignItems: 'center',
        borderRadius: 30,
    },
    buyButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default Payment;

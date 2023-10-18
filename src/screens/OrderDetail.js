import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import {
    HomepageContainer,
    LinePayment
} from '../components/styles'

import {
    fetchOrderInformation
} from '../apis/index'
import {
    Octicons,
    EvilIcons,
    Ionicons,
    Entypo,
    AntDesign,
    MaterialCommunityIcons,
    Feather,
    MaterialIcons
} from '@expo/vector-icons'
const { width, height } = Dimensions.get('window');
const OrderDetail = ({ navigation, route }) => {
    const formatter = new Intl.NumberFormat('en-US')
    const [dataCart, setDataCart] = useState(null)
    useEffect(() => {
        fetchOrderInformation(route.params.orderId, route.params.token)
            .then(result => {
                // setOrder(result)
                setDataCart(result)
            })
            .catch(error => {
                console.log(error)
            })
    }, [route.params]);
    return (
        <View style={{ flex: 1 }}>
            {dataCart ? <><ScrollView style={{ backgroundColor: 'black' }}>
                <HomepageContainer>
                    <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: 20, fontWeight: 'bold' }}>Order Detail</Text>
                </HomepageContainer>
                {dataCart.status === 'Delivery successful' ?
                    <View style={[styles.information, { backgroundColor: 'green', padding: 15, marginVertical: 10 }]}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: 'white', fontSize: 15, paddingVertical: 5, fontWeight: 'bold' }}>Order has been completed</Text>
                                <Text style={{ color: 'white', fontSize: 15 }}>Thank you for using our service</Text>
                            </View>
                        </View>
                    </View>
                    :
                    dataCart.status === 'Cancel' ?
                        <View style={[styles.information, { backgroundColor: 'red', padding: 15, marginVertical: 10 }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ color: 'white', fontSize: 15, paddingVertical: 5, fontWeight: 'bold' }}>Order has been cancelled</Text>
                                    <Text style={{ color: 'white', fontSize: 15 }}>You have canceled this order (Your reason: {dataCart.reasonCancel})</Text>
                                </View>
                            </View>
                        </View>
                        :
                        dataCart.status === 'Delivery failed' ?
                            <View style={[styles.information, { backgroundColor: 'red', padding: 15, marginVertical: 10 }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: 'white', fontSize: 15, paddingVertical: 5, fontWeight: 'bold' }}>Delivery failed</Text>
                                        <Text style={{ color: 'white', fontSize: 15 }}>Reason: {dataCart.reasonCancel}</Text>
                                    </View>
                                </View>
                            </View>
                            :
                            dataCart.status === 'Ordered' ? 
                            <View style={[styles.information, { backgroundColor: 'rgb(156 142 30)', padding: 15, marginVertical: 10 }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: 'white', fontSize: 15, paddingVertical: 5, fontWeight: 'bold' }}>Verifying the order</Text>
                                        <Text style={{ color: 'white', fontSize: 15 }}>We have verified your order, please wait</Text>
                                    </View>
                                </View>
                            </View>
                            :
                            <View style={[styles.information, { backgroundColor: 'rgb(93, 93, 217)', padding: 15, marginVertical: 10 }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ color: 'white', fontSize: 15, paddingVertical: 5, fontWeight: 'bold' }}>Order is being shipped</Text>
                                        <Text style={{ color: 'white', fontSize: 15 }}>The order is being handed over to the carrier, please wait for delivery</Text>
                                    </View>
                                </View>
                            </View>
                }
                <View style={[styles.information, { paddingHorizontal: 10, marginBottom: 10 }]}>
                    <Text style={{ color: 'white', fontSize: 18, paddingVertical: 5, fontWeight: 'bold' }}>ID:</Text>
                    <Text style={{ color: 'white', fontSize: 18, padding: 5, fontWeight: 'bold' }}>{dataCart.orderId}</Text>
                </View>
                <View style={[styles.information, { marginBottom: 10 }]}>
                    <MaterialIcons name="payment" style={{ color: 'white', paddingHorizontal: 10, fontSize: 24 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'white', fontSize: 15, paddingVertical: 5, fontWeight: 'bold' }}>Payment method</Text>
                            <Text style={{ color: 'white', fontSize: 15, paddingVertical: 2 }}>Thanh toán khi nhận hàng</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.information, { marginBottom: 10 }]}>
                    <Ionicons name='location-outline' style={{ color: 'white', paddingHorizontal: 10, fontSize: 24 }}></Ionicons>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'white', fontSize: 15, paddingVertical: 5, fontWeight: 'bold' }}>Địa chỉ nhận hàng</Text>
                            <Text style={{ color: 'white', fontSize: 15, paddingVertical: 2 }}>{dataCart.username}</Text>
                            <Text style={{ color: 'white', fontSize: 15, paddingVertical: 2 }}>{dataCart.phoneNumber}</Text>
                            <Text style={{ color: 'white', fontSize: 15, paddingRight: 50 }}>{dataCart.address + ' ' + dataCart.city + ' ' + dataCart.district + ' ' + dataCart.commune}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.information]}>
                    <MaterialCommunityIcons name='truck-delivery-outline' style={{ color: 'white', paddingHorizontal: 10, fontSize: 24 }}></MaterialCommunityIcons>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'white', fontSize: 15, paddingVertical: 5, fontWeight: 'bold' }}>Thông tin vận chuyển</Text>
                            {dataCart.shipping_process.map((item, index) => {
                                return <Text style={{ color: 'white', fontSize: 15, paddingVertical: 5 }} key={index}><Entypo name="dot-single" size={16} color="white" /> {item.date} {item.time} - {item.content}</Text>
                            })}
                        </View>
                    </View>
                </View>
                <LinePayment style={{ flexDirection: 'row' }} />
                {dataCart.product.map((item, index) => (
                    <ScrollView horizontal={true} style={styles.cartItems} key={index}>
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
                    </ScrollView>
                ))}
                <LinePayment style={{ flexDirection: 'row' }} />
                <View style={[styles.information, { justifyContent: 'space-between', padding: 10 }]}>
                    <Text style={{ color: 'white', paddingHorizontal: 10, fontSize: 16 }}>Total amount ( 3 goods)</Text>
                    <Text style={{ color: 'red', paddingHorizontal: 10, fontSize: 16 }}>{formatter.format(dataCart.sumOrder)} VNĐ</Text>
                </View>
                {/* <LinePayment style={{ flexDirection: 'row' }} />
                <View style={[styles.information, { justifyContent: 'space-between', padding: 10 }]}>
                    <Entypo name='ticket' style={{ color: 'red', paddingHorizontal: 10, fontSize: 24 }}></Entypo>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'red', fontSize: 15, paddingVertical: 5 }} >- 24,000 VNĐ</Text>
                    </View>
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
                <View style={[styles.information, { justifyContent: 'space-between', padding: 10, paddingBottom: 100 }]}>
                    <Text style={{ color: 'white', paddingHorizontal: 10, fontSize: 16 }}>Total </Text>
                    <Text style={{ color: 'red', paddingHorizontal: 10, fontSize: 16 }}>{formatter.format(dataCart.sumOrder + 30000)} VNĐ</Text>
                </View>
            </ScrollView>
                {dataCart.status === 'Ordered' &&
                    <TouchableOpacity
                        style={styles.buyButton}
                        onPress={() => {
                            // navigation.navigate('Cart')
                            // handleCreateOrder()
                        }}
                    >
                        <Text style={styles.buyButtonText}>Cancel order</Text>
                    </TouchableOpacity>}
                {dataCart.status === 'Delivery successful' &&
                    <TouchableOpacity
                        style={styles.buyButton}
                        onPress={() => {
                            // navigation.navigate('Cart')
                            // handleCreateOrder()
                        }}
                    >
                        <Text style={styles.buyButtonText}>Review</Text>
                    </TouchableOpacity>}
            </>
                :
                <View style={[styles.loading, { width, height }]}>
                    <ActivityIndicator size='large' color='white' />
                </View>
            }

        </View>

    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 16,
        paddingTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
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

export default OrderDetail;

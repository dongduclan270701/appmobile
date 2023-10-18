import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    TextInput,
    Alert
} from 'react-native';
import {
    HomepageContainer,
    LinePayment
} from '../components/styles'
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
const Order = ({ navigation, orderList, token }) => {
    const formatter = new Intl.NumberFormat('en-US')
    const [searchOrderId, setSearchOrderId] = useState('');
    const [newOrderList, setNewOrderList] = useState(orderList.orders)
    const handleSearchOrder = () => {
        const foundOrders = orderList.orders.filter(order => order.orderId.includes(searchOrderId.toLowerCase()));
        if (foundOrders.length > 0) {
            setNewOrderList([...foundOrders])
        } else {
            Alert.alert('Order Not Found', `Order ID ${searchOrderId} was not found.`);
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'black' }}>
                <HomepageContainer>
                    <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: 20, fontWeight: 'bold' }}>Order</Text>
                </HomepageContainer>
                <View style={{ flexDirection: 'row', width: '100%', padding: 10 }}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Enter Order ID"
                        placeholderTextColor="gray"
                        onChangeText={text => setSearchOrderId(text)}
                        value={searchOrderId}
                    />
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={handleSearchOrder}
                    >
                        <EvilIcons name='search' style={styles.searchButtonText} />
                    </TouchableOpacity>
                </View>
                {newOrderList.map((item, index) => (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('OrderDetail', { orderId: item.orderId, token: token })
                    }} key={index}>
                        <View style={styles.cartItems} key={index}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={{ color: 'white' }}>ID: <Text style={{ color: 'red' }}>{item.orderId}</Text></Text>
                                {(item.status === 'Cancel' || item.status === 'Delivery failed') ?
                                    <Text style={{ color: 'red' }}>Failed</Text>
                                    : item.status === 'Ordered' ?
                                        <Text style={{ color: 'yellow' }}>In process</Text>
                                        :
                                        <Text style={{ color: 'rgb(93, 93, 217)' }}>In process</Text>
                                }
                            </View>
                            <View style={styles.cartItem}>
                                <Image source={{ uri: item.product[0].img }} style={styles.productImage} />
                                <View style={styles.productInfo}>
                                    <Text style={styles.productName}>{item.product[0].nameProduct}</Text>
                                    <Text style={styles.productPrice}>{formatter.format(item.product[0].nowPrice)} VNĐ</Text>
                                </View>
                                <Text style={styles.removeButtonText}>x{item.product[0].quantity}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'white' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Total</Text>
                                <Text style={{ color: 'red', fontWeight: 'bold' }}>{formatter.format(item.sumOrder + item.ship)} VNĐ</Text>
                            </View>
                            <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: 'white' }}>
                                <MaterialCommunityIcons name='truck-delivery' style={{ color: 'white', paddingRight: 10, fontSize: 20 }}></MaterialCommunityIcons>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.status}</Text>
                            </View>
                        </View>
                        <View style={{ height: 10, width: '100%', backgroundColor: '#282828', marginBottom: 20 }} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    searchInput: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        color: 'white',
        fontSize: 16,
        padding: 10,
        width: "80%"
    },
    searchButton: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: "20%"
    },
    searchButtonText: {
        color: 'white',
        fontSize: 24,
        alignItems: 'center',
    },
    removeButton: {
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 15,
        padding: 10,
    },
    removeButtonText: {
        color: 'white',
        fontWeight: 'bold',
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
    }
});

export default Order;

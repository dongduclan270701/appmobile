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
import { } from '../apis/index'
const Order = ({ navigation }) => {
    const [dataCart, setDataCart] = useState({
        "product": [
            {
                "_id": "650afa0a82ae198eca8a6a0c",
                "img": [
                    "https://res.cloudinary.com/dolydpat4/image/upload/v1695301949/nifrn7kzljhac6xp70zk.webp",
                    "https://res.cloudinary.com/dolydpat4/image/upload/v1695301950/q9y0mdz3fohhsvrsflqg.webp"
                ],
                quantity: 1,
                "nameProduct": "Laptop ASUS Vivobook S 14 Flip TN3402YA LZ192W",
                "realPrice": 18999000,
                "nowPrice": 17190000,
                "collection": "laptop",
            },
            {
                "_id": "650afa0a82ae198eca8a6a0c",
                "img": [
                    "https://res.cloudinary.com/dolydpat4/image/upload/v1695301949/nifrn7kzljhac6xp70zk.webp",
                    "https://res.cloudinary.com/dolydpat4/image/upload/v1695301950/q9y0mdz3fohhsvrsflqg.webp"
                ],
                quantity: 1,
                "nameProduct": "Laptop ASUS Vivobook S 14 Flip TN3402YA LZ192W",
                "realPrice": 18999000,
                "nowPrice": 17190000,
                "collection": "laptop",
            },
            {
                "_id": "650afa0a82ae198eca8a6a0c",
                "img": [
                    "https://res.cloudinary.com/dolydpat4/image/upload/v1695301949/nifrn7kzljhac6xp70zk.webp",
                    "https://res.cloudinary.com/dolydpat4/image/upload/v1695301950/q9y0mdz3fohhsvrsflqg.webp"
                ],
                quantity: 1,
                "nameProduct": "Laptop ASUS Vivobook S 14 Flip TN3402YA LZ192W",
                "realPrice": 18999000,
                "nowPrice": 17190000,
                "collection": "laptop",
            },
            {
                "_id": "650afa0a82ae198eca8a6a0c",
                "img": [
                    "https://res.cloudinary.com/dolydpat4/image/upload/v1695301949/nifrn7kzljhac6xp70zk.webp",
                    "https://res.cloudinary.com/dolydpat4/image/upload/v1695301950/q9y0mdz3fohhsvrsflqg.webp"
                ],
                quantity: 1,
                "nameProduct": "Laptop ASUS Vivobook S 14 Flip TN3402YA LZ192W",
                "realPrice": 18999000,
                "nowPrice": 17190000,
                "collection": "laptop",
            },
            {
                "_id": "650afa0a82ae198eca8a6a0c",
                "img": [
                    "https://res.cloudinary.com/dolydpat4/image/upload/v1695301949/nifrn7kzljhac6xp70zk.webp",
                    "https://res.cloudinary.com/dolydpat4/image/upload/v1695301950/q9y0mdz3fohhsvrsflqg.webp"
                ],
                quantity: 1,
                "nameProduct": "Laptop ASUS Vivobook S 14 Flip TN3402YA LZ192W",
                "realPrice": 18999000,
                "nowPrice": 17190000,
                "collection": "laptop",
            },
            {
                "_id": "650afa0a82ae198eca8a6a0c",
                "img": [
                    "https://res.cloudinary.com/dolydpat4/image/upload/v1695301949/nifrn7kzljhac6xp70zk.webp",
                    "https://res.cloudinary.com/dolydpat4/image/upload/v1695301950/q9y0mdz3fohhsvrsflqg.webp"
                ],
                quantity: 1,
                "nameProduct": "Laptop ASUS Vivobook S 14 Flip TN3402YA LZ192W",
                "realPrice": 18999000,
                "nowPrice": 17190000,
                "collection": "laptop",
            },
            {
                "_id": "650afa0a82ae198eca8a6a0c",
                "img": [
                    "https://res.cloudinary.com/dolydpat4/image/upload/v1695301949/nifrn7kzljhac6xp70zk.webp",
                    "https://res.cloudinary.com/dolydpat4/image/upload/v1695301950/q9y0mdz3fohhsvrsflqg.webp"
                ],
                quantity: 1,
                "nameProduct": "Laptop ASUS Vivobook S 14 Flip TN3402YA LZ192W",
                "realPrice": 18999000,
                "nowPrice": 17190000,
                "collection": "laptop",
            },
        ],
    })
    const [searchOrderId, setSearchOrderId] = useState(''); // Thêm state để lưu giá trị nhập từ người dùng

    const handleSearchOrder = () => {
        // Xử lý tìm kiếm Order ID ở đây
        const foundOrder = dataCart.product.find(order => order._id === searchOrderId);

        if (foundOrder) {
            // Hiển thị thông tin đơn hàng tìm thấy hoặc thực hiện hành động bạn muốn ở đây
            Alert.alert('Order Found', `Order ID: ${foundOrder._id}\nProduct Name: ${foundOrder.nameProduct}`);
        } else {
            // Hiển thị thông báo nếu không tìm thấy Order ID
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
                {dataCart.product.map((item, index) => (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('OrderDetail')
                    }}>
                        <View style={styles.cartItems} key={index}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={{ color: 'white' }}>ID: <Text style={{ color: 'red' }}>123123123123123qưeqwe</Text></Text>
                                <Text style={{ color: 'green' }}>Complete</Text>
                            </View>
                            <View style={styles.cartItem}>
                                <Image source={{ uri: item.img[0] }} style={styles.productImage} />
                                <View style={styles.productInfo}>
                                    <Text style={styles.productName}>Giảm tối đa 300k123 13qưeqweqwe qweqwe 123123</Text>
                                    <Text style={styles.productPrice}>24,000,000 VNĐ</Text>
                                </View>
                                <Text style={styles.removeButtonText}>x1</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'white' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Total</Text>
                                <Text style={{ color: 'red', fontWeight: 'bold' }}>24,000,000 VNĐ</Text>
                            </View>
                            <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: 'white' }}>
                                <MaterialCommunityIcons name='truck-delivery' style={{ color: 'white', paddingRight: 10, fontSize: 20 }}></MaterialCommunityIcons>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Đơn hàng đã được giao thành công</Text>
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

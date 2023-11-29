import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    ActivityIndicator,
    Dimensions,
    TextInput,
} from 'react-native';
import {
    HomepageContainer,
    LinePayment
} from '../components/styles'

import {
    fetchOrderInformation,
    fetchCancelOrder,
    createNoticeByCustomer,
    fetchRatingOrder
} from '../apis/index'
import {
    Ionicons,
    Entypo,
    MaterialCommunityIcons,
    MaterialIcons
} from '@expo/vector-icons'
import Toast from 'react-native-toast-message';
import Modal from "react-native-modal";
const { width, height } = Dimensions.get('window');
const OrderDetail = ({ navigation, userInformation, route, token, handleChangeNotice, handleChangeOrderListCancel }) => {
    const formatter = new Intl.NumberFormat('en-US')
    const [dataCart, setDataCart] = useState(null)
    const [isReview, setIsReview] = useState(false)
    const [isCancel, setIsCancel] = useState(false)
    const [listGoodsReview, setListGoodsReview] = useState(null)
    const [isSubmitCancel, setIsSubmitCancel] = useState(false)
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const time = `${hours}:${minutes}`;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const today = `${year}-${month}-${day}`;
    useEffect(() => {
        fetchOrderInformation(route.params.orderId, route.params.token)
            .then(result => {
                setDataCart(result)
                setListGoodsReview({
                    status: true,
                    statusOrder: "",
                    date: "",
                    time: "",
                    username: userInformation.username,
                    email: userInformation.email,
                    image: userInformation.image,
                    product: result.statusReview.status ?
                        result.statusReview.product.map(item => ({ nameProduct: item.nameProduct, img: item.img, imgExchange: userInformation.image, star: item.star, content: item.content, collection: item.collection }))
                        :
                        result.product.map(item => ({ nameProduct: item.nameProduct, img: item.img[0], imgExchange: userInformation.image, star: 0, content: "", collection: item.collection }))
                })
            })
            .catch(error => {

                Toast.show({
                    type: 'error',
                    text1: error.message,
                    position: 'bottom'
                });
            })
    }, [route.params]);
    const handleChangeReasonCancel = (data) => {
        setDataCart({ ...dataCart, reasonCancel: data })
    }
    const handleSubmitCancelOrder = () => {
        setIsSubmitCancel(true)
        const newOrder = {
            ...dataCart,
            status: 'Cancel',
            shipping_process: [
                { time: time, date: today, content: 'Cancel' },
                ...dataCart.shipping_process
            ]
        }

        fetchCancelOrder(dataCart.orderId, newOrder, token)
            .then(result => {
                createNoticeByCustomer({
                    product: result.product[0],
                    email: result.email,
                    time: time,
                    date: today,
                    content: 'Order has been canceled',
                    status: result.status,
                    orderId: result.orderId,
                    createDate: today
                }, token)
                    .then(result1 => {
                        handleChangeNotice({
                            product: result.product[0],
                            email: result.email,
                            time: time,
                            date: today,
                            content: 'Order placed successfully, please wait for order confirmation',
                            status: result.status,
                            orderId: result.orderId,
                            isReadCus: false,
                            createDate: today
                        })
                    })
                    .catch(error => {

                        Toast.show({
                            type: 'error',
                            text1: error.message,
                            position: 'bottom'
                        });
                    })
                Toast.show({
                    type: 'success',
                    text1: 'Order has been cancel',
                    position: 'bottom'
                });
                setIsCancel(false)
                setIsSubmitCancel(false)
                setDataCart(result)
                handleChangeOrderListCancel(newOrder)
            })
    }
    const handleSubmitReview = () => {
        const test = listGoodsReview.product.map((item) => item.star === 0)
        if (test.includes(true)) {
            Toast.show({
                type: 'info',
                text1: `Missing, It looks like you haven't evaluated all the products in your order!`,
                position: 'bottom'
            });
        }
        else {
            setIsSubmitCancel(true)
            fetchRatingOrder(dataCart.orderId, { ...listGoodsReview, date: today, time: time }, token)
                .then(result => {

                    setDataCart({ ...dataCart, statusReview: { ...listGoodsReview, date: today, time: time } })
                    createNoticeByCustomer({
                        product: dataCart.product[0],
                        email: dataCart.email,
                        time: time,
                        date: today,
                        content: 'Review order successful',
                        status: 'Review order',
                        orderId: dataCart.orderId,
                        createDate: today
                    }, token)
                        .then(result1 => {
                            setIsSubmitCancel(false)
                            setIsReview(false)
                            handleChangeNotice({
                                product: dataCart.product[0],
                                email: dataCart.email,
                                time: time,
                                date: today,
                                content: 'Review order successful',
                                status: 'Review order',
                                orderId: dataCart.orderId,
                                isReadCus: false,
                                createDate: today
                            })
                        })
                        .catch(error => {

                            Toast.show({
                                type: 'error',
                                text1: error.message,
                                position: 'bottom'
                            });
                        })
                })
                .catch(error => {

                    Toast.show({
                        type: 'error',
                        text1: error.message,
                        position: 'bottom'
                    });
                })
        }
    }
    const handleClick = (selectedRating, data) => {
        const updatedArray = listGoodsReview.product.map(item => {
            if (item.nameProduct === data.nameProduct) {
                return { ...data, star: selectedRating }
            }
            return item
        });
        setListGoodsReview({ ...listGoodsReview, product: updatedArray })
    };
    const handleChangeReviewProduct = (content, data) => {
        const updatedArray = listGoodsReview.product.map(item => {
            if (item.nameProduct === data.nameProduct) {
                return { ...data, content: content }
            }
            return item
        });
        setListGoodsReview({ ...listGoodsReview, product: updatedArray })
    }
    const renderStars = (data) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const starStyle = {
                padding: 5,
                color: i <= data.star ? 'yellow' : 'gray',
            };
            stars.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => handleClick(i, data)}
                    style={{ padding: 5 }}
                >
                    <Text style={starStyle}>★</Text>
                </TouchableOpacity>
            );
        }
        return stars;
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            {dataCart ? <>
                {!isReview && !isCancel && <><View style={{}}>
                    <HomepageContainer>
                        <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: 20, fontWeight: 'bold' }}>Order Detail</Text>
                    </HomepageContainer>
                    <ScrollView style={{ marginBottom: 100 }}>
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
                            <Text style={{ color: 'red', paddingHorizontal: 10, fontSize: 16 }}>{formatter.format(dataCart.sumOrder - 30000)} VNĐ</Text>
                        </View>
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
                            <Text style={{ color: 'red', paddingHorizontal: 10, fontSize: 16 }}>{formatter.format(dataCart.sumOrder)} VNĐ</Text>
                        </View>
                    </ScrollView>
                </View>
                    {dataCart.status === 'Ordered' &&
                        <TouchableOpacity
                            style={styles.buyButton}
                            onPress={() => {
                                setIsCancel(true)
                            }}
                        >
                            <Text style={styles.buyButtonText}>Cancel order</Text>
                        </TouchableOpacity>
                    }
                    {dataCart.status === 'Delivery successful' &&
                        <TouchableOpacity
                            style={styles.buyButton}
                            onPress={() => {
                                setIsReview(true)
                            }}
                        >
                            <Text style={styles.buyButtonText}>Review</Text>
                        </TouchableOpacity>}
                </>
                }
                {isCancel && <>

                    <HomepageContainer>
                        <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: 20, fontWeight: 'bold' }}>Reason cancel</Text>
                    </HomepageContainer>
                    <ScrollView style={{ backgroundColor: 'black' }}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Your reason"
                            placeholderTextColor="gray"
                            onChangeText={text => handleChangeReasonCancel(text)}
                            value={dataCart.reasonCancel}
                        />
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => {
                            setIsCancel(false)
                        }}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => {
                            handleSubmitCancelOrder()
                        }}
                    >
                        <Text style={styles.submitButtonText}>Send</Text>
                    </TouchableOpacity>
                </>
                }
                {isReview && <>
                    <HomepageContainer>
                        <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: 20, fontWeight: 'bold' }}>Review</Text>
                    </HomepageContainer>
                    {dataCart.statusReview.status ?
                        <>
                            <ScrollView style={{ backgroundColor: 'black', marginBottom: 100 }}>
                                {listGoodsReview.product.map((item, index) => (
                                    <View style={styles.cartItems} key={index}>
                                        <View style={{ flexDirection: 'column', padding: 16, }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={{ uri: item.img }} style={styles.productImage} />
                                                <View style={styles.productInfo}>
                                                    <Text style={styles.productNameReview}>{item.nameProduct}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ width: 100, color: 'white', fontSize: 16, fontWeight: 'bold' }}>Vote</Text>
                                                <View style={[styles.productInfo, { flexDirection: 'row' }]}>
                                                    {renderStars(item)}
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Product reviews</Text>
                                                <TextInput
                                                    style={[styles.searchInput, { margin: 0, marginTop: 10, height: 100 }]}
                                                    placeholderTextColor="gray"
                                                    value={item.content}
                                                    multiline={true}
                                                    editable={false}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                            <TouchableOpacity
                                style={styles.buyButton}
                                onPress={() => {
                                    setIsReview(false)
                                }}
                            >
                                <Text style={styles.buyButtonText}>Back</Text>
                            </TouchableOpacity>
                        </>
                        :
                        <>
                            <ScrollView style={{ backgroundColor: 'black', marginBottom: 100 }}>
                                {listGoodsReview.product.map((item, index) => (
                                    <View style={styles.cartItems} key={index}>
                                        <View style={{ flexDirection: 'column', padding: 16, }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={{ uri: item.img }} style={styles.productImage} />
                                                <View style={styles.productInfo}>
                                                    <Text style={styles.productNameReview}>{item.nameProduct}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ width: 100, color: 'white', fontSize: 16, fontWeight: 'bold' }}>Vote</Text>
                                                <View style={[styles.productInfo, { flexDirection: 'row' }]}>
                                                    {renderStars(item)}
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Product reviews</Text>
                                                <TextInput
                                                    style={[styles.searchInput, { margin: 0, marginTop: 10, height: 100 }]}
                                                    placeholder="Enter your review"
                                                    placeholderTextColor="gray"
                                                    onChangeText={text => handleChangeReviewProduct(text, item)}
                                                    value={item.content}
                                                    multiline={true}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => {
                                    setIsReview(false)
                                }}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={() => {
                                    handleSubmitReview()
                                }}
                            >
                                <Text style={styles.submitButtonText}>Send</Text>
                            </TouchableOpacity>
                        </>
                    }
                </>
                }
            </>
                :
                <View style={[styles.loading, { width, height }]}>
                    <ActivityIndicator size='large' color='white' />
                </View>
            }
            {isSubmitCancel && <Modal isVisible={isSubmitCancel}>
                <ActivityIndicator size='large' color='white' />
            </Modal>
            }
            <Toast />
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
        margin: 10
        // width: "100%"
    },
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
    productNameReview: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        width: 300
    },
    productPriceReview: {
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
    },
    cancelButton: {
        width: '35%',
        position: 'absolute',
        left: 50,
        right: 175,
        bottom: 30,
        backgroundColor: 'unset',
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        alignItems: 'center',
        borderRadius: 30,
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    submitButton: {
        width: '35%',
        position: 'absolute',
        left: 225,
        right: 25,
        bottom: 30,
        backgroundColor: 'red',
        padding: 10,
        alignItems: 'center',
        borderRadius: 30,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default OrderDetail;

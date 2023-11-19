import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Dimensions,
    Alert,
    FlatList
} from 'react-native';
import {
    HomepageContainer,
} from '../components/styles'
import { fetchGoodsByName, updateCart, fetchBestLaptop } from '../apis/index'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Lightbox from 'react-native-lightbox-v2';
const { width, height } = Dimensions.get('window');
const ProductDetailScreen = ({ navigation, route, userInformation, cartData, token, handleChangeDataCart }) => {
    const formatter = new Intl.NumberFormat('en-US')
    const data = route.params
    const [product, setProduct] = useState(null)
    const [recommendProduct, setRecommendProduct] = useState(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isShowMore, setIsShowMore] = useState(false)
    const [isShowMoreReview, setIsShowMoreReview] = useState(false)
    const [limitDisplayReview, setLimitDisplayReview] = useState(5)

    const collectionToStateMap = {
        'laptop-gaming': 'resultBestLaptopGaming',
        'laptop': 'resultBestLaptop',
        'pc-gaming': 'resultBestPcGaming',
        'pc-creator': 'resultBestPcCreator',
        'pc-company': 'resultBestPcCompany',
        'apple': 'resultBestApple',
    };

    useEffect(() => {
        fetchBestLaptop()
            .then(result => {
                setRecommendProduct(result[collectionToStateMap[data.collection]])
            })
        fetchGoodsByName(data.src, data.collection)
            .then(result => {
                setProduct(result)
            })
            .catch(error => {
                console.log(error)
            })
    }, [route])

    const renderTextWithSpan = (text) => {
        const splitText = text.split(/<br\s*\/?>/i)
        return splitText.map((textPart, index) => {
            if (index === splitText.length - 1) {
                return textPart;
            }
            return textPart + '\n'
        })
    }
    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const imageIndex = Math.floor(contentOffsetX / 300)
        setCurrentImageIndex(imageIndex);
    }
    const sumStarProduct = () => {
        const sum = product && product.rating.reduce((accumulator, item) => {
            return accumulator + item.star;
        }, 0)
        return sum
    }
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const starIcon = i <= Math.round((sumStarProduct()) / product.rating.length) ? 'yellow' : 'white';
            stars.push(
                <Ionicons
                    key={i}
                    name={'ios-star'}
                    size={15}
                    style={{ paddingHorizontal: 5, color: starIcon }}
                />
            );
        }
        return stars;
    };
    const handleToCart = () => {
        if (userInformation) {
            const quantity = 1
            if (cartData.length !== 0) {
                array = cartData
            } else {
                var array = [];
            }
            function isSame(productCompare) {
                return productCompare.src === product.src;
            }
            const result = array.findIndex(isSame);
            if (result !== -1) {
                Alert.alert('Ops!!', `This product already exists in your cart`);
            } else {
                array.push({ ...product, quantity });
                handleChangeDataCart(array)
                updateCart(userInformation.email, array, token)
                    .then(result => {
                        navigation.navigate('Cart')
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        } else {
            Alert.alert('Ops!!', `You need to login`);
        }
    }
    const longPress = (uri) => {
        CameraRoll.saveToCameraRoll(uri)
    }
    return (
        <View style={styles.container}>
            {product ? (<>
                <ScrollView style={{ flex: 1 }}
                    contentContainerStyle={styles.contentContainer}>
                    <HomepageContainer>
                    </HomepageContainer>

                    <View style={{ padding: 10, paddingBottom: 150 }}>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            onScroll={handleScroll}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}
                        >
                            {product.img.map((imgUrl, index) => (
                                <Lightbox longPressCallback={() => longPress(imgUrl)} key={index}>
                                    <Image
                                        source={{ uri: imgUrl }}
                                        style={{ width: 400, height: 400, marginRight: 10 }}
                                    />
                                </Lightbox>
                            ))}
                        </ScrollView>

                        <Text style={{ color: 'white', textAlign: 'center' }}>

                            {product.img.map((item, index) => {
                                if (currentImageIndex === index) {
                                    return <Ionicons key={index} name='radio-button-on' />
                                }
                                else {
                                    return <Ionicons key={index} name='radio-button-off' />
                                }
                            })}
                        </Text>
                        <Text style={styles.productName}>{product.nameProduct}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {renderStars()}
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }}>
                            <Text style={{ fontSize: 15, color: 'white' }}>
                                {product.rating.length} reviews - {product.sold} sold - {product.view} views
                            </Text>
                        </View>
                        <Text style={styles.productPrice}>
                            {formatter.format(product.nowPrice)} VNĐ&ensp;
                            <View>
                                <Text style={styles.grayText}> - {formatter.format(product.percent)} %</Text>
                            </View>
                        </Text>
                        <Text style={styles.productRealPrice}>
                            <Text style={styles.strikeThrough}>{formatter.format(product.realPrice)} VNĐ</Text>
                        </Text>
                        <Text style={styles.sectionTitle}>PRESENT:</Text>
                        {product.gift.map((gift, index) => (
                            <Text style={styles.giftText} key={index}>
                                ⭐ - {gift}
                            </Text>
                        ))}
                        <Text style={styles.sectionTitle}>PROMOTION WHEN BUYING INCLUDED:</Text>
                        {product.gift_buy.map((gift, index) => (
                            <Text style={styles.giftText} key={index}>
                                🎁 - {gift}
                            </Text>
                        ))}
                        <Text style={styles.sectionTitle}>Đặc điểm kỹ thuật:</Text>
                        <ScrollView>
                            {product.description_table.map((item, index) => (
                                <View style={styles.specRow} key={index}>
                                    <Text style={styles.specName}>{item[0]}</Text>
                                    <Text style={styles.specValue}>{renderTextWithSpan(item[1])}</Text>
                                </View>
                            ))}
                        </ScrollView>
                        {isShowMore && <>
                            <Text style={styles.sectionTitle}>Mô tả sản phẩm:</Text>
                            {product.description.map((paragraph, index) => (
                                <View style={styles.specColumn} key={index}>
                                    <Text style={styles.descName}>{paragraph[0]}</Text>
                                    <Text style={styles.descValue}>{renderTextWithSpan(paragraph[1])}</Text>
                                    {product.img[index] ? <Image
                                        key={index}
                                        source={{ uri: product.img[index] }}
                                        style={{ width: 400, height: 400, marginRight: 10 }}
                                    /> : null}
                                </View>
                            ))}
                        </>}
                        <View>
                            <TouchableOpacity onPress={() => {
                                setIsShowMore(!isShowMore)
                            }}>
                                <Text style={styles.toggleMore}>{isShowMore ? 'Less' : 'More'}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.sectionTitle}>Review</Text>
                        <View>
                            {product.rating.slice(0, limitDisplayReview).map((rating, index) => {
                                return <TouchableOpacity onPress={() => {
                                }} key={index}>
                                    <View style={styles.cartItems}>
                                        <View style={styles.cartItem}>
                                            <Image source={{ uri: rating.img }} style={styles.productImage} />
                                            <View style={styles.productInfo}>
                                                <Text style={styles.ratingName}>{rating.email}</Text>
                                                <Text style={styles.ratingTime}>{rating.time} {rating.date}</Text>
                                                <Text style={styles.ratingContent}>{rating.content}</Text>
                                                <Text style={styles.contentNotice}>
                                                    {Array.from({ length: rating.star }, (_, indexStar) => (
                                                        <Ionicons
                                                            key={indexStar}
                                                            name={'ios-star'}
                                                            size={15}
                                                            style={{ paddingHorizontal: 5, color: 'yellow' }}
                                                        />
                                                    ))}
                                                </Text>
                                                <Text style={styles.time}>3</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            })}
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => {
                                setLimitDisplayReview(product.rating.length)
                                setIsShowMoreReview(!isShowMoreReview)
                            }}>
                                <Text style={styles.toggleMoreReview}>{isShowMoreReview ? 'Less' : 'More'}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.sectionTitle}>Recommend</Text>
                        <View style={styles.containerRecommend}>
                            {recommendProduct ?
                                <FlatList
                                    data={recommendProduct}
                                    keyExtractor={(item, index) => index}
                                    horizontal={true}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => {
                                            setProduct(null)
                                            navigation.navigate("ProductDetailScreen", item)
                                        }}>
                                            <View style={styles.itemRecommend}>
                                                <Image source={{ uri: item.img[0] }} style={{ width: '100%', height: '50%' }} />
                                                <Text style={styles.textRecommend}>{item.nameProduct}</Text>
                                                <Text style={styles.textRecommend}>{formatter.format(item.nowPrice)} VNĐ</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                                :
                                <View style={[styles.loading]}>
                                    <ActivityIndicator size='large' color='white' />
                                </View>
                            }
                        </View>
                    </View>

                </ScrollView>
                <TouchableOpacity
                    style={styles.buyButton}
                    onPress={() => {
                        handleToCart()
                    }}
                >
                    <Text style={styles.buyButtonText}>Buy</Text>
                </TouchableOpacity>
            </>) : (
                <View style={[styles.loading, { width, height }]}>
                    <ActivityIndicator size='large' color='white' />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    textRecommend: {
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        paddingTop: 10
    },
    itemRecommend: {
        width: 200,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a0a0ae0',
        borderWidth: 1,
        borderColor: '#535353',
        margin: 8,
        borderRadius: 15,
    },
    containerRecommend: {
        flex: 1,
        backgroundColor: 'black',
    },
    toggleMore: {
        width: '50%',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 15,
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'center',
        color: 'white',
    },
    toggleMoreReview: {
        width: '50%',
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'center',
        color: 'white',
    },
    productInfo: {
        textAlign: 'left'
    },
    productImage: {
        width: 60,
        height: 60,
        marginRight: 0,
        borderRadius: 50,
        marginRight: 15
    },
    cartItem: {
        flexDirection: 'row',
        position: 'relative'
    },
    ratingName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    ratingTime: {
        fontSize: 14,
        color: 'grey',
        marginBottom: 5,
    },
    ratingContent: {
        fontSize: 14,
        color: 'white',
        marginBottom: 5,
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    contentContainer: {
        flexGrow: 1,
    },
    productName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
    },
    productPrice: {
        fontSize: 20,
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    productRealPrice: {
        fontSize: 18,
        textAlign: 'center'
    },
    grayText: {
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 10,
        color: 'red',
    },
    strikeThrough: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
        marginTop: 20,
    },
    descriptionText: {
        fontSize: 16,
        color: 'white',
        marginTop: 10,
    },
    specRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    specColumn: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    descName: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    descValue: {
        width: '100%',
        fontSize: 16,
        color: 'white',
    },
    specName: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    specValue: {
        width: '70%',
        fontSize: 16,
        color: 'white',
    },
    giftText: {
        fontSize: 16,
        color: 'white',
        marginTop: 10,
        fontWeight: 'bold',
    },
    loading: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 16,
        paddingTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buyButton: {
        position: 'absolute',
        left: 100,
        right: 100,
        bottom: 30,
        backgroundColor: 'red',
        padding: 10,
        alignItems: 'center',
        borderRadius: 15,
    },
    buyButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});


export default ProductDetailScreen;

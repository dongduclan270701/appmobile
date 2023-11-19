import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    TextInput,
    Alert,
    TouchableWithoutFeedback
} from 'react-native';
import {
    HomepageContainer,
    Logo,
    LineHomePage
} from '../components/styles'
import {
    fetchBestLaptop,
    fetchCollecting,
    fetchFilterProduct
} from '../apis/index'
import Ionicons from 'react-native-vector-icons/Ionicons';
import RangeSlider from 'rn-range-slider';
const Homepage = ({ navigation, route, lengthCart }) => {
    const formatter = new Intl.NumberFormat('en-US')
    const [laptop, setLaptop] = useState(null)
    const [laptopGaming, setLaptopGaming] = useState(null)
    const [pcGaming, setPcGaming] = useState(null)
    const [pcCreator, setPcCreator] = useState(null)
    const [pcCompany, setPcCompany] = useState(null)
    const [apple, setApple] = useState(null)
    const [search, setSearch] = useState({
        collection: '',
        nameProduct: '',
        sort: 'none',
        category: ['', '', '', '', ''],
        minPrice: 0,
        maxPrice: 90000000
    })
    const [resultSearch, setResultSearch] = useState([])
    const [isSearch, setIsSearch] = useState(false)
    const [isFilter, setIsFilter] = useState(false)
    const [brand, setBrand] = useState([])
    const [category, setCategory] = useState([])
    const data = route.params
    const data2 = [
        { id: '1', src: require('../../assets/banner-ads4.png') },
        { id: '2', src: require('../../assets/banner-ads5.png') },
        { id: '3', src: require('../../assets/banner-ads6.png') },
    ];
    const data3 = [
        { id: '1', src: require('../../assets/banner-ads7.webp') },
        { id: '2', src: require('../../assets/banner-ads8.webp') },
        { id: '3', src: require('../../assets/banner-ads9.webp') },
    ];
    const data4 = [
        { id: '1', src: require('../../assets/banner-ads1.webp') },
        { id: '2', src: require('../../assets/banner-ads2.webp') },
        { id: '3', src: require('../../assets/banner-ads3.webp') },
    ];

    useEffect(() => {
        fetchCollecting()
            .then(result => {
                setBrand(result)
                setSearch({ ...search, collection: result[0].src, category: [result[0].category[0].collecting[0].name, '', '', '', ''] })
                setCategory(result[0].category)
            })
            .catch(error => {
                console.log(error)
            })
        fetchBestLaptop()
            .then(result => {
                setLaptopGaming(result.resultBestLaptopGaming)
                setLaptop(result.resultBestLaptop)
                setPcGaming(result.resultBestPcGaming)
                setPcCreator(result.resultBestPcCreator)
                setPcCompany(result.resultBestPcCompany)
                setApple(result.resultBestApple)
            })
            .catch(error => {
                console.log(error)
            })

    }, []);

    const handleValueChange = useCallback(
        (newLow, newHigh) => {
            setSearch((search) => ({
                ...search,
                minPrice: newLow,
                maxPrice: newHigh
            }))
        },
        [search.minPrice, search.maxPrice]
    );

    const dismissKeyboard = () => {
        Keyboard.dismiss()
    };
    const handleChangeSearch = (name, value, src) => {
        if (name === 'catalogue') {
            const clickedItem = brand.find((item) => item.src === src);
            if (clickedItem) {
                setCategory(clickedItem.category);
                setSearch({ ...search, collection: src, category: [clickedItem.category[0].collecting[0].name, '', '', '', ''] })
            }
        }
        else if (name === 'brand') {
            setSearch((search) => ({
                ...search,
                category: [
                    value,
                    '',
                    ...search.category.slice(2),
                ],
            }))
        }
        else if (name === 'type') {
            setSearch((search) => ({
                ...search,
                category: [
                    search.category[0],
                    value,
                    ...search.category.slice(2),
                ],
            }))
        }
        else if (name === 'cpu') {
            setSearch((search) => ({
                ...search,
                category: [
                    search.category[0],
                    search.category[1],
                    value,
                    ...search.category.slice(3),
                ],
            }))
        }
        else if (name === 'gpu') {
            setSearch((search) => ({
                ...search,
                category: [
                    search.category[0],
                    search.category[1],
                    search.category[2],
                    value,
                    ...search.category.slice(4),
                ],
            }))
        }
        else if (name === 'category') {
            setSearch((search) => ({
                ...search,
                category: [
                    search.category[0],
                    search.category[1],
                    search.category[2],
                    search.category[3],
                    value,
                    ...search.category.slice(5),
                ],
            }))
        }
    }

    const handleSubmitSearch = () => {
        setIsFilter(false)
        setResultSearch(null)
        fetchFilterProduct(search)
            .then(result => {
                setResultSearch(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <View style={{ backgroundColor: 'black' }}>
            {isSearch ? <View style={{ height: '100%', paddingBottom: 100 }}>
                <HomepageContainer>
                    <TouchableOpacity onPress={() => {
                        setIsSearch(false)
                    }}>
                        <Ionicons
                            name="arrow-back-sharp"
                            size={16}
                            color="grey"
                            style={{
                                paddingTop: 10,
                                paddingRight: 10
                            }}
                        />
                    </TouchableOpacity>
                    <View style={[styles.input, { width: '85%' }]} >
                        <View style={[styles.inputContainerSelect]}>
                            <View style={{ padding: 5, width: '10%' }}>
                                <Ionicons name="search" style={{ color: 'grey' }} size={20} />
                            </View>
                            <View style={{ width: search.nameProduct.length > 0 ? '70%' : '80.5%' }}>
                                <TouchableWithoutFeedback onPress={() => { dismissKeyboard }}>
                                    <TextInput
                                        placeholder='Search'
                                        clearButtonMode='always'
                                        autoCorrect={false}
                                        autoCapitalize='none'
                                        placeholderTextColor='grey'
                                        style={{ color: 'white' }}
                                        value={search.nameProduct}
                                        onChangeText={(text) => { setSearch({ ...search, nameProduct: text }) }}
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '20%' }}>
                                {search.nameProduct.length > 0 && <TouchableOpacity style={{ padding: 10 }} onPress={() => { setSearch({ ...search, nameProduct: '' }) }} >
                                    <Ionicons name="close" style={{ color: 'grey', borderRadius: 10, borderWidth: 0.5, borderColor: 'grey' }} size={14.5} />
                                </TouchableOpacity>}
                                <TouchableOpacity onPress={() => {
                                    handleSubmitSearch()
                                }} style={{ borderLeftWidth: 0.5, borderColor: 'grey', padding: 10, paddingLeft: 6 }} >
                                    <View >
                                        <Ionicons name="search" style={{ color: 'grey' }} size={20} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {isFilter ? <TouchableOpacity onPress={() => {
                        setIsFilter(false)
                    }}>
                        <Ionicons
                            name="close"
                            size={20}
                            color="grey"
                            style={{
                                padding: 10
                            }}
                        />
                    </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => {
                            setIsFilter(true)
                        }}>
                            <Ionicons
                                name="filter"
                                size={20}
                                color="grey"
                                style={{
                                    padding: 10
                                }}
                            />
                        </TouchableOpacity>
                    }
                </HomepageContainer>
                {isFilter ?
                    <>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: 'white' }}>Catalogue</Text>
                        </View>
                        <View>
                            {brand ?
                                <FlatList
                                    data={brand}
                                    keyExtractor={(item, index) => index}
                                    horizontal={true}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => {
                                            handleChangeSearch('catalogue', item.name, item.src)
                                        }}>
                                            <View style={[styles.itemBrand, item.src === search.collection && styles.active]}>
                                                <Text style={styles.textBrand}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                /> :
                                <View style={[styles.loading]}>
                                    <ActivityIndicator size='large' color='white' />
                                </View>
                            }
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: 'white' }}>Brand</Text>
                        </View>
                        <View>
                            {category ?
                                <FlatList
                                    data={category[0].collecting}
                                    keyExtractor={(item, index) => index}
                                    horizontal={true}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => {
                                            handleChangeSearch('brand', item.name, item.src)
                                        }}>
                                            <View style={[styles.itemBrand, item.name === search.category[0] && styles.active]}>
                                                <Text style={styles.textBrand}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                /> :
                                <View style={[styles.loading]}>
                                    <ActivityIndicator size='large' color='white' />
                                </View>
                            }
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: 'white' }}>Type</Text>
                        </View>
                        <View>
                            {category ?
                                <FlatList
                                    data={category[0].collecting.find(item => item.name === search.category[0])?.category || []}
                                    keyExtractor={(item, index) => index}
                                    horizontal={true}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => {
                                            handleChangeSearch('type', item.name, item.src)
                                        }}>
                                            <View style={[styles.itemBrand, item.name === search.category[1] && styles.active]}>
                                                <Text style={styles.textBrand}>{item.name} </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                /> :
                                <View style={[styles.loading]}>
                                    <ActivityIndicator size='large' color='white' />
                                </View>
                            }
                        </View>

                        <View style={{ padding: 10 }}>
                            <Text style={{ color: 'white' }}>CPU</Text>
                        </View>
                        <View>
                            {category ?
                                <FlatList
                                    data={category[2].collecting}
                                    keyExtractor={(item, index) => index}
                                    horizontal={true}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => {
                                            handleChangeSearch('cpu', item.name, item.src)
                                        }}>
                                            <View style={[styles.itemBrand, item.name === search.category[2] && styles.active]}>
                                                <Text style={styles.textBrand}>{item.name} </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                /> :
                                <View style={[styles.loading]}>
                                    <ActivityIndicator size='large' color='white' />
                                </View>
                            }
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: 'white' }}>GPU</Text>
                        </View>
                        <View>
                            {category ?
                                <FlatList
                                    data={category[3].collecting}
                                    keyExtractor={(item, index) => index}
                                    horizontal={true}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => {
                                            handleChangeSearch('gpu', item.name, item.src)
                                        }}>
                                            <View style={[styles.itemBrand, item.name === search.category[3] && styles.active]}>
                                                <Text style={styles.textBrand}>{item.name} </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                /> :
                                <View style={[styles.loading]}>
                                    <ActivityIndicator size='large' color='white' />
                                </View>
                            }
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: 'white' }}>Category</Text>
                        </View>
                        <View>
                            {category ?
                                <FlatList
                                    data={category[4].collecting}
                                    keyExtractor={(item, index) => index}
                                    horizontal={true}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => {
                                            handleChangeSearch('category', item.name, item.src)
                                        }}>
                                            <View style={[styles.itemBrand, item.name === search.category[4] && styles.active]}>
                                                <Text style={styles.textBrand}>{item.name} </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                /> :
                                <View style={[styles.loading]}>
                                    <ActivityIndicator size='large' color='white' />
                                </View>
                            }
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: 'white' }}>Price</Text>
                        </View>
                        <View style={styles.root9}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Text style={{ color: 'white' }}>
                                    {search.minPrice} VNĐ
                                </Text>
                                <Text style={{ color: 'white' }}>
                                    -
                                </Text>
                                <Text style={{ color: 'white' }}>
                                    {search.maxPrice} VNĐ
                                </Text>
                            </View>
                            <RangeSlider
                                style={styles.slider}
                                gravity={'center'}
                                min={0}
                                max={90000000}
                                step={100000}
                                selectionColor="#3df"
                                blankColor="#f618"
                                // floatingLabel
                                renderThumb={() => (
                                    <View style={styles.root} />
                                )}
                                renderRail={() => (
                                    <View style={styles.root1} />
                                )}
                                renderRailSelected={() => (
                                    <View style={styles.root2} />
                                )}
                                onValueChanged={handleValueChange}
                            />
                        </View>


                        <View style={{ alignItems: 'center', marginTop: 30 }}>
                            <TouchableOpacity onPress={() => {
                                handleChangeSearch('catalogue', 'Laptop', 'laptop')
                                setSearch({ ...search, minPrice: 0, maxPrice: 90000000 })
                            }}>
                                <View style={styles.itemClear}>
                                    <Text style={styles.textClear}>Clear </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </>
                    :
                    <ScrollView >
                        {resultSearch !== null ? <FlatList
                            data={resultSearch}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <View style={styles.item}>
                                    <Image source={{ uri: item.img[0] }} style={{ width: '100%', height: '50%' }} />
                                    <Text style={styles.text}>{item.nameProduct}</Text>
                                    <Text style={styles.text}>{formatter.format(item.nowPrice)} VNĐ</Text>
                                </View>
                            )}
                            // ListEmptyComponent
                            scrollEnabled={false}
                            numColumns={2} // Số lượng cột
                            contentContainerStyle={{ paddingBottom: 10 }}
                        />
                            :
                            <View style={[styles.loading]}>
                                <ActivityIndicator size='large' color='white' />
                            </View>
                        }
                    </ScrollView>
                }
            </View>
                : 
                <>
                    <View>
                        <HomepageContainer>
                            <TouchableOpacity style={styles.input} onPress={() => {
                                setIsSearch(true)
                            }}>
                                <View style={styles.inputContainer}>
                                    <Ionicons
                                        name="search"
                                        size={15}
                                        color="grey"
                                        style={{
                                            padding: 10
                                        }}
                                    />
                                    <View>
                                        <Text style={{ color: 'grey' }}>Search</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Cart');
                                }}
                                style={{ width: '10%' }}
                            >
                                <View style={styles.column}>
                                    <Ionicons name="cart" style={{ color: 'grey' }} size={26} />
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{lengthCart.length}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </HomepageContainer>
                    </View>
                    <ScrollView style={{marginBottom:150}}>

                        <View style={styles.category}>
                            <TouchableOpacity style={styles.imageBackground1} onPress={() => {
                                navigation.navigate('ProductListScreen', { category: 'laptop-gaming', nameCategory: 'Laptop Gaming' })
                            }}>
                                <ImageBackground
                                    source={require('../../assets/laptopGaming.jpg')}
                                    // style={styles.imageBackground1}
                                    borderRadius={15}
                                >
                                    <Text style={styles.text1}>Laptop Gaming</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.imageBackground2} onPress={() => {
                                navigation.navigate('ProductListScreen', { category: 'laptop', nameCategory: 'Laptop' })
                            }}>
                                <ImageBackground
                                    source={require('../../assets/laptop.jpg')}
                                    borderRadius={15}
                                >
                                    <Text style={styles.text2}>Laptop</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.category}>
                            <TouchableOpacity style={styles.imageBackground3} onPress={() => {
                                navigation.navigate('ProductListScreen', { category: 'pc-creator', nameCategory: 'PC Creator' })
                            }}>
                                <ImageBackground
                                    source={require('../../assets/PC.jpg')}
                                    borderRadius={15}
                                >
                                    <Text style={styles.text2}>PC Creator</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.imageBackground4} onPress={() => {
                                navigation.navigate('ProductListScreen', { category: 'pc-company', nameCategory: 'PC Company' })
                            }}>
                                <ImageBackground
                                    source={require('../../assets/PC.jpg')}
                                    borderRadius={15}
                                >
                                    <Text style={styles.text3}>PC Company</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.imageBackground5} onPress={() => {
                                navigation.navigate('ProductListScreen', { category: 'pc-gaming', nameCategory: 'PC Gaming' })
                            }}>
                                <ImageBackground
                                    source={require('../../assets/PC.jpg')}
                                    borderRadius={15}
                                >
                                    <Text style={styles.text4}>PC Gaming</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.category}>
                            <TouchableOpacity style={styles.imageBackground6} onPress={() => {
                                navigation.navigate('ProductListScreen', { category: 'apple', nameCategory: 'Apple' })
                            }}>
                                <ImageBackground
                                    source={require('../../assets/Apple.png')}
                                    borderRadius={15}
                                >
                                    <Text style={styles.text5}>Apple</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container}>
                            <LineHomePage />
                            <Text style={{ color: 'white', paddingLeft: 10, paddingBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Laptop Gaming Best Selling</Text>
                            {laptopGaming ?
                                <FlatList
                                    data={laptopGaming}
                                    keyExtractor={(item, index) => index}
                                    horizontal={true} // Đặt thuộc tính horizontal thành true để lướt ngang
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate("ProductDetailScreen", item)
                                        }}>
                                            <View style={styles.item}>
                                                <Image source={{ uri: item.img[0] }} style={{ width: '100%', height: '50%' }} />
                                                <Text style={styles.text}>{item.nameProduct}</Text>
                                                <Text style={styles.text}>{formatter.format(item.nowPrice)} VNĐ</Text>
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
                        <View style={styles.container}>
                            <LineHomePage />
                            <Text style={{ color: 'white', paddingLeft: 10, paddingBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Laptop Company Best Selling</Text>
                            {laptop ?
                                <FlatList
                                    data={laptop}
                                    keyExtractor={(item, index) => index}
                                    horizontal={true} // Đặt thuộc tính horizontal thành true để lướt ngang
                                    renderItem={({ item }) => (
                                        <View style={styles.item}>
                                            <Image source={{ uri: item.img[0] }} style={{ width: '100%', height: '50%' }} />
                                            <Text style={styles.text}>{item.nameProduct}</Text>
                                            <Text style={styles.text}>{formatter.format(item.nowPrice)} VNĐ</Text>
                                        </View>
                                    )}
                                /> :
                                <View style={[styles.loading]}>
                                    <ActivityIndicator size='large' color='white' />
                                </View>
                            }
                        </View>
                        <View style={styles.container}>
                            <Text style={{ color: 'white', paddingLeft: 10, paddingBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Special offer</Text>
                            <FlatList
                                data={data2}
                                keyExtractor={(item, index) => index}
                                horizontal={true}
                                renderItem={({ item }) => (
                                    <View style={styles.banner}>
                                        <Image source={item.src} style={{ width: '100%', height: '100%', borderRadius: 15 }} />
                                    </View>
                                )}
                            />
                        </View>
                        <View style={styles.container}>
                            <LineHomePage />
                            <Text style={{ color: 'white', paddingLeft: 10, paddingBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Pc Gaming Best Selling</Text>
                            {pcGaming ?
                                <FlatList
                                    data={pcGaming}
                                    keyExtractor={(item, index) => index}
                                    horizontal={true} // Đặt thuộc tính horizontal thành true để lướt ngang
                                    renderItem={({ item }) => (
                                        <View style={styles.item}>
                                            <Image source={{ uri: item.img[0] }} style={{ width: '100%', height: '50%' }} />
                                            <Text style={styles.text}>{item.nameProduct}</Text>
                                            <Text style={styles.text}>{formatter.format(item.nowPrice)} VNĐ</Text>
                                        </View>
                                    )}
                                /> :
                                <View style={[styles.loading]}>
                                    <ActivityIndicator size='large' color='white' />
                                </View>
                            }
                        </View>
                        <View style={styles.container}>
                            <LineHomePage />
                            <Text style={{ color: 'white', paddingLeft: 10, paddingBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Pc Creator Best Selling</Text>
                            {pcCreator ?
                                <FlatList
                                    data={pcCreator}
                                    keyExtractor={(item, index) => index}
                                    horizontal={true}
                                    renderItem={({ item }) => (
                                        <View style={styles.item}>
                                            <Image source={{ uri: item.img[0] }} style={{ width: '100%', height: '50%' }} />
                                            <Text style={styles.text}>{item.nameProduct}</Text>
                                            <Text style={styles.text}>{formatter.format(item.nowPrice)} VNĐ</Text>
                                        </View>
                                    )}
                                /> :
                                <View style={[styles.loading]}>
                                    <ActivityIndicator size='large' color='white' />
                                </View>
                            }
                        </View>
                        <View style={styles.container}>
                            <Text style={{ color: 'white', paddingLeft: 10, paddingBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Special activities</Text>
                            <FlatList
                                data={data3}
                                keyExtractor={(item, index) => index}
                                horizontal={true}
                                renderItem={({ item }) => (
                                    <View style={styles.banner}>
                                        <Image source={item.src} style={{ width: '100%', height: '100%', borderRadius: 15 }} />
                                    </View>
                                )}
                            />
                        </View>
                        <View style={styles.container}>
                            <LineHomePage />
                            <Text style={{ color: 'white', paddingLeft: 10, paddingBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Pc Company Best Selling</Text>
                            {pcCompany ?
                                <FlatList
                                    data={pcCompany}
                                    keyExtractor={(item, index) => index}
                                    horizontal={true} // Đặt thuộc tính horizontal thành true để lướt ngang
                                    renderItem={({ item }) => (
                                        <View style={styles.item}>
                                            <Image source={{ uri: item.img[0] }} style={{ width: '100%', height: '50%' }} />
                                            <Text style={styles.text}>{item.nameProduct}</Text>
                                            <Text style={styles.text}>{formatter.format(item.nowPrice)} VNĐ</Text>
                                        </View>
                                    )}
                                /> :
                                <View style={[styles.loading]}>
                                    <ActivityIndicator size='large' color='white' />
                                </View>
                            }
                        </View>
                        <View style={styles.container}>
                            <LineHomePage />
                            <Text style={{ color: 'white', paddingLeft: 10, paddingBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Apple Best Selling</Text>
                            {apple ?
                                <FlatList
                                    data={apple}
                                    keyExtractor={(item, index) => index}
                                    horizontal={true} // Đặt thuộc tính horizontal thành true để lướt ngang
                                    renderItem={({ item }) => (
                                        <View style={styles.item}>
                                            <Image source={{ uri: item.img[0] }} style={{ width: '100%', height: '50%' }} />
                                            <Text style={styles.text}>{item.nameProduct}</Text>
                                            <Text style={styles.text}>{formatter.format(item.nowPrice)} VNĐ</Text>
                                        </View>
                                    )}
                                /> :
                                <View style={[styles.loading]}>
                                    <ActivityIndicator size='large' color='white' />
                                </View>
                            }
                        </View>
                        <View style={styles.containerBottom}>
                            <Text style={{ color: 'white', paddingLeft: 10, paddingBottom: 10, fontSize: 16, fontWeight: 'bold' }}>Secret Notification</Text>
                            <FlatList
                                data={data4}
                                keyExtractor={(item, index) => index}
                                horizontal={true}
                                renderItem={({ item }) => (
                                    <View style={styles.banner}>
                                        <Image source={item.src} style={{ width: '100%', height: '100%', borderRadius: 15 }} />
                                    </View>
                                )}
                            />
                        </View>
                    </ScrollView>
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    root9: {
        alignItems: 'stretch',
        padding: 12,
        flex: 1,
    },
    slider: {
    },
    root: {
        width: 20,
        height: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "grey",
        backgroundColor: "red",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.16,
        shadowRadius: 6
    },
    root1: {
        flex: 1,
        height: 5,
        borderRadius: 2,
        backgroundColor: "grey"
    },
    root2: {
        height: 5,
        backgroundColor: 'red',
        borderRadius: 2,
    },
    inputContainerSelect: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 10,
    },
    active: {
        borderColor: 'red'
    },
    input: {
        width: '85%',
        color: 'white',
    },
    itemBrand: {
        width: 'auto',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a0a0ae0',
        borderWidth: 1,
        borderColor: '#535353',
        margin: 8,
        padding: 10,
        borderRadius: 15,
    },
    textBrand: {
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
    },
    itemClear: {
        width: 100,
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a0a0ae0',
        borderWidth: 1,
        borderColor: '#535353',
        margin: 8,
        padding: 10,
        borderRadius: 15,
    },
    textClear: {
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
    },
    process: {
        color: 'grey',
        padding: 10,
        fontSize: 24,
        textAlign: 'center',
    },
    badge: {
        backgroundColor: '#e33c4b',
        borderRadius: 10,
        width: 15,
        height: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: -5,
        top: 0,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
    },
    column: {
        marginTop: 5,
        marginRight: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 10
    },
    containerBottom: {
        flex: 1,
        backgroundColor: 'black',
        padding: 10,
        paddingBottom: 100
    },
    category: {
        backgroundColor: 'black',
        flexDirection: 'row', // Sắp xếp các view theo chiều ngang
    },
    item: {
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
    banner: {
        width: 400,
        height: 200,
        borderWidth: 1,
        borderColor: '#535353',
        margin: 8,
        borderRadius: 15,
    },
    text: {
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        paddingTop: 10
    },
    imageBackground1: {
        margin: 10,
        height: 100,
        borderColor: 'white',
        flex: 2,
        justifyContent: 'flex-start',
    },
    imageBackground2: {
        margin: 10,
        height: 100,
        flex: 1,
        justifyContent: 'flex-start',
    },
    imageBackground3: {
        margin: 10,
        height: 100,
        borderColor: 'white',
        flex: 1,
        justifyContent: 'flex-start',
    },
    imageBackground4: {
        margin: 10,
        height: 100,
        flex: 1,
        justifyContent: 'flex-start',
    },
    imageBackground5: {
        margin: 10,
        height: 100,
        borderColor: 'white',
        flex: 1,
        justifyContent: 'flex-start',
    },
    imageBackground6: {
        margin: 10,
        height: 100,
        flex: 1,
        justifyContent: 'flex-start',
    },
    text1: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: "100%",
        padding: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: 'white',
    },
    text2: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: "100%",
        padding: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: 'white',
    },
    text3: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: "100%",
        padding: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: 'white',
    },
    text4: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: "100%",
        padding: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: 'white',
    },
    text5: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: "100%",
        padding: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: 'white',
    },
    text6: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: "100%",
        padding: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: 'white',
    },
});
export default Homepage;

import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Dimensions,
    TouchableWithoutFeedback,
    TextInput
} from 'react-native';
import {
    HomepageContainer
} from '../components/styles'
import {
    fetchProductCollection,
    fetchCollecting,
    fetchFilterProduct
} from '../apis/index'
import Ionicons from 'react-native-vector-icons/Ionicons';
import RangeSlider from 'rn-range-slider';
const { width, height } = Dimensions.get('window');
const ProductListScreen = ({ navigation, route }) => {
    const formatter = new Intl.NumberFormat('en-US')
    const data = route.params
    const [goods, setGoods] = useState(null)
    const [isFilter, setIsFilter] = useState(false)
    const [search, setSearch] = useState({
        collection: '',
        nameProduct: '',
        sort: 'none',
        category: ['', '', '', '', ''],
        minPrice: 0,
        maxPrice: 90000000
    })
    const [category, setCategory] = useState([])

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
    const handleChangeSearch = (name, value, src) => {
        if (name === 'brand') {
            setSearch((search) => ({
                ...search,
                category: [
                    value,
                    '',
                    '',
                    '',
                    '',
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
    useEffect(() => {
        setSearch((prevFilter) => ({
            ...prevFilter,
            collection: data.category,
        }));
        fetchCollecting()
            .then(result => {
                const clickedItem = result.find((item) => item.src === data.category);
                if (clickedItem) {
                    setCategory(clickedItem.category)
                }
            })
            .catch(error => {
                console.log(error)
            })
        fetchProductCollection({ category: search.category, collection: data.category }, 1)
            .then(result => {
                setGoods(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [data]);

    const handleSubmitSearch = () => {
        setIsFilter(false)
        setGoods(null)
        fetchFilterProduct(search)
            .then(result => {
                setGoods(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            <HomepageContainer>
                <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: 20, fontWeight: 'bold' }}>{data.nameCategory}</Text>
            </HomepageContainer>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
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
            </View>
            {isFilter ? <>
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
                : <View style={{ paddingBottom: 220 }}>
                    {goods ? <FlatList data={goods}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={[styles.productContainer]} onPress={() => {
                                navigation.navigate('ProductDetailScreen', item)
                            }}>
                                <Image source={{ uri: item.img[0] }} style={{ width: '100%', height: '50%' }} />
                                <Text style={styles.text}>{item.nameProduct}</Text>
                                <Text style={styles.text}>{formatter.format(item.nowPrice)} VNĐ</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index}
                        numColumns={2}
                        contentContainerStyle={styles.container}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                    /> : <View style={[styles.loading, { width, height }]}>
                        <ActivityIndicator size='large' color='white' />
                    </View>}
                </View>}

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
        // paddingHorizontal:10,
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
    container: {
        backgroundColor: 'black',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    loading: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 16,
        paddingTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productContainer: {
        width: "46%",
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a0a0ae0',
        borderWidth: 1,
        borderColor: '#535353',
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 30,
    },
    productName: {
        fontSize: 16,
    },
    text: {
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        paddingTop: 10
    },
})

export default ProductListScreen;
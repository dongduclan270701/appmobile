import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput
} from 'react-native';
import axios from 'axios';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
const Payment = ({ navigation }) => {
    const [values, setValues] = useState({ username: '', phoneNumber: '', address: '', city: '', district: '', commune: '' })
    const [cityData, setCityData] = useState([]);
    const [districtData, setDistrictData] = useState([]);
    const [communeData, setCommuneData] = useState([]);
    const [showCityPicker, setShowCityPicker] = useState(false);
    const [showDistrictPicker, setShowDistrictPicker] = useState(false);
    const [showCommunePicker, setShowCommunePicker] = useState(false);
    const handleChange = () => {

    }
    const handleBlur = () => {

    }
    useEffect(() => {
        const getCity = async () => {
            try {
                await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
                    .then(result => {
                        setCityData(result.data)
                    })
            } catch (error) {
                console.log(error)
            }
        }
        getCity()
    }, []);


    const handleChooseCity = (data) => {
        setValues({ ...values, city: data, district: '', commune: '' });
        const indexCity = cityData.findIndex(i => i.Name === data);
        if (indexCity !== -1) {
            setDistrictData(cityData[indexCity].Districts);
        }
        setShowCityPicker(false);
        setShowDistrictPicker(true);
    };

    const handleChooseDistrict = (data) => {
        setValues({ ...values, district: data, commune: '' });
        const indexDistrict = districtData.findIndex(i => i.Name === data);
        if (indexDistrict !== -1) {
            setCommuneData(districtData[indexDistrict].Wards);
        }
        setShowDistrictPicker(false);
        setShowCommunePicker(true);
    };

    const handleChooseCommune = (data) => {
        setValues({ ...values, commune: data });
        setShowCommunePicker(false);
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'black' }}>
                <View style={styles.homeContainer}>
                    <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: 20, fontWeight: 'bold' }}>Edit address</Text>
                </View>
                <View style={[styles.information]}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.label}>Contact</Text>
                        <MyTextInput
                            placeholder='Full name'
                            placeholderTextColor="gray"
                            onChangeText={
                                handleChange('username')
                            }
                            onBlur={handleBlur('username')}
                            value={values.username}
                        />
                        <MyTextInput
                            placeholder='Phone number'
                            placeholderTextColor="gray"
                            onChangeText={
                                handleChange('phoneNumber')
                            }
                            onBlur={handleBlur('phoneNumber')}
                            value={values.phoneNumber}
                        />
                        <Text style={styles.label}>Address</Text>
                        <MyTextInput
                            placeholder='Address'
                            placeholderTextColor="gray"
                            onChangeText={
                                handleChange('address')
                            }
                            onBlur={handleBlur('address')}
                            value={values.address}
                        />
                        <Text style={styles.label}>City</Text>
                        <TouchableOpacity
                            style={styles.inputContainer}
                            onPress={() => setShowCityPicker(true)}
                        >
                            <Text style={styles.input}>{values.city || 'Select City'}</Text>
                        </TouchableOpacity>
                        {showCityPicker && (
                            <Picker
                                itemStyle={{ color: 'white', padding: 0, margin: 0 }}
                                selectedValue={values.city}
                                onValueChange={(itemValue) => {
                                    handleChooseCity(itemValue);
                                }}
                            >
                                <Picker.Item label='Select City' value='' />
                                {cityData.map((item, index) => {
                                    return <Picker.Item label={item.Name} value={item.Name} key={index} />;
                                })}
                            </Picker>
                        )}

                        <Text style={styles.label}>District</Text>
                        <TouchableOpacity
                            style={styles.inputContainer}
                            onPress={() => setShowDistrictPicker(true)}
                        >
                            <Text style={styles.input}>{values.district || 'Select District'}</Text>
                        </TouchableOpacity>
                        {showDistrictPicker && (
                            <Picker
                                itemStyle={{ color: 'white', padding: 0, margin: 0 }}
                                selectedValue={values.district}
                                onValueChange={(itemValue) => {
                                    handleChooseDistrict(itemValue);
                                }}
                            >
                                <Picker.Item label='Select District' value='' />
                                {districtData.map((item, index) => {
                                    return <Picker.Item label={item.Name} value={item.Name} key={index} />;
                                })}
                            </Picker>
                        )}

                        <Text style={styles.label}>Commune</Text>
                        <TouchableOpacity
                            style={styles.inputContainer}
                            onPress={() => setShowCommunePicker(true)}
                        >
                            <Text style={styles.input}>{values.commune || 'Select Commune'}</Text>
                        </TouchableOpacity>
                        {showCommunePicker && (
                            <Picker
                                itemStyle={{ color: 'white', paddingBottom: 100, margin: 0 }}
                                selectedValue={values.commune}
                                onValueChange={(itemValue) => {
                                    handleChooseCommune(itemValue);
                                }}
                            >
                                <Picker.Item label='Select Commune' value='' />
                                {communeData.map((item, index) => {
                                    return <Picker.Item label={item.Name} value={item.Name} key={index} />;
                                })}
                            </Picker>
                        )}
                        <View style={{ paddingBottom: 100 }} />
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                style={styles.buyButton}
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <Text style={styles.buyButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

const MyTextInput = ({ ...props }) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput {...props} style={styles.input} />
        </View>
    )
}

const styles = StyleSheet.create({
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
    homeContainer: {
        padding: 15,
        paddingTop: 60,
        justifyContent: "space-between",
        alignContent: 'center',
        color: 'white',
        overflowY: 'scroll',
        backgroundColor: 'black',
        flexDirection: 'row'
    },
    information: {
        padding: 15,
        backgroundColor: 'black',
    },
    label: {
        color: 'white',
        fontSize: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        marginBottom: 20,
        marginHorizontal: 10
    },
    input: {
        color: 'white',
        fontSize: 16,
        paddingVertical: 5,
    },
    picker: {
        color: 'blue',
        backgroundColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 20,
    }
});

export default Payment;

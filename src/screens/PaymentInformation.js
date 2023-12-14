import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
    Button
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import Modal from "react-native-modal";
import Toast from 'react-native-toast-message';
const PaymentInformation = ({ navigation, route }) => {
    const [values, setValues] = useState({ username: '', phoneNumber: null, address: '', city: '', district: '', commune: '' })
    const [cityData, setCityData] = useState([]);
    const [districtData, setDistrictData] = useState([]);
    const [communeData, setCommuneData] = useState([]);
    const [showCityPicker, setShowCityPicker] = useState(false);
    const [showDistrictPicker, setShowDistrictPicker] = useState(false);
    const [showCommunePicker, setShowCommunePicker] = useState(false);
    const handleChange = (field, data) => {
        setValues(pre => ({
            ...pre,
            [field]: data
        })
        )
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

                Toast.show({
                    type: 'error',
                    text1: error.message,
                    position: 'bottom'
                });
            }
        }
        getCity()
        setValues(route.params.orderCheckOut)
    }, [route]);

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

    const handleSaveInformation = () => {
        if (values.username === '') {
            Toast.show({
                type: 'info',
                text1: `Missing, Fill your username`,
                position: 'bottom'
            });
        } else if (values.phoneNumber === null || values.phoneNumber.length === 0) {
            Toast.show({
                type: 'info',
                text1: `Missing, Fill your phone number`,
                position: 'bottom'
            });
        } else if (values.phoneNumber.length !== 10 ) {
            Toast.show({
                type: 'info',
                text1: `Missing, Your phone number incorrect format`,
                position: 'bottom'
            });
        } else if (values.address === '') {
            Toast.show({
                type: 'info',
                text1: `Missing, Fill your address`,
                position: 'bottom'
            });
        } else if (values.city === '') {
            Toast.show({
                type: 'info',
                text1: `Missing, Fill your city`,
                position: 'bottom'
            });
        } else if (values.district === '') {
            Toast.show({
                type: 'info',
                text1: `Missing, Fill your district`,
                position: 'bottom'
            });
        } else if (values.commune === '') {
            Toast.show({
                type: 'info',
                text1: `Missing, Fill your commune`,
                position: 'bottom'
            });
        } else {
            route.params.handleChangeInformation(values)
            navigation.goBack()
        }
    }
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
                                (text) => handleChange('username', text)
                            }
                            onBlur={handleBlur('username')}
                            value={values.username}
                        />
                        <MyTextInput
                            placeholder='Phone number'
                            placeholderTextColor="gray"
                            onChangeText={
                                (text) => handleChange('phoneNumber', text)
                            }
                            onBlur={handleBlur('phoneNumber')}
                            value={values.phoneNumber}
                        />
                        <Text style={styles.label}>Address</Text>
                        <MyTextInput
                            placeholder='Address'
                            placeholderTextColor="gray"
                            onChangeText={
                                (text) => { handleChange('address', text) }
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
                            <Modal isVisible={showCityPicker}>
                                <View>
                                    <Picker
                                        itemStyle={{ color: 'white', paddingBottom: 100, margin: 0 }}
                                        selectedValue={values.district}
                                        onValueChange={
                                            (text) => {
                                                handleChooseCity(text)
                                            }
                                        }
                                    >
                                        <Picker.Item label='Select Commune' value='' />
                                        {cityData.map((item, index) => {
                                            return <Picker.Item label={item.Name} value={item.Name} key={index} />;
                                        })}
                                    </Picker>
                                    <Button color='grey' title="Close" onPress={() => setShowCityPicker(false)} />
                                </View>
                            </Modal>
                        )}

                        <Text style={styles.label}>District</Text>
                        <TouchableOpacity
                            style={styles.inputContainer}
                            onPress={() => setShowDistrictPicker(true)}
                        >
                            <Text style={styles.input}>{values.district || 'Select District'}</Text>
                        </TouchableOpacity>
                        {showDistrictPicker && (
                            <Modal isVisible={showDistrictPicker}>
                                <View>
                                    <Picker
                                        itemStyle={{ color: 'white', paddingBottom: 100, margin: 0 }}
                                        selectedValue={values.district}
                                        onValueChange={
                                            (text) => {
                                                handleChooseDistrict(text)
                                            }
                                        }
                                    >
                                        <Picker.Item label='Select Commune' value='' />
                                        {districtData.map((item, index) => {
                                            return <Picker.Item label={item.Name} value={item.Name} key={index} />;
                                        })}
                                    </Picker>
                                    <Button color='grey' title="Close" onPress={() => setShowDistrictPicker(false)} />
                                </View>
                            </Modal>
                        )}
                        <Text style={styles.label}>Commune</Text>
                        <TouchableOpacity
                            style={styles.inputContainer}
                            onPress={() => setShowCommunePicker(true)}
                        >
                            <Text style={styles.input}>{values.commune || 'Select Commune'}</Text>
                        </TouchableOpacity>
                        {showCommunePicker && (
                            <Modal isVisible={showCommunePicker}>
                                <View>
                                    <Picker
                                        itemStyle={{ color: 'white', paddingBottom: 100, margin: 0 }}
                                        selectedValue={values.commune}
                                        onValueChange={
                                            (text) => {
                                                handleChooseCommune(text)
                                            }
                                        }
                                    >
                                        <Picker.Item label='Select Commune' value='' />
                                        {communeData.map((item, index) => {
                                            return <Picker.Item label={item.Name} value={item.Name} key={index} />;
                                        })}
                                    </Picker>
                                    <Button color='grey' title="Close" onPress={() => setShowCommunePicker(false)} />
                                </View>
                            </Modal>
                        )}
                        <View style={{ paddingBottom: 100 }} />
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                style={styles.buyButton}
                onPress={() => {
                    handleSaveInformation()
                }}
            >
                <Text style={styles.buyButtonText}>Save</Text>
            </TouchableOpacity>
            <Toast/>
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

export default PaymentInformation;

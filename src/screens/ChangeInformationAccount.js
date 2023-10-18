import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
    Image,
    Alert,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import {
    updateUser
} from '../apis/index'
const Payment = ({ navigation, userInformation, handleChangeInformation, token }) => {
    const [values, setValues] = useState({ username: '', phoneNumber: '', address: '', sex: '', age: '' })
    const [showSex, setShowSex] = useState(false)
    const [showAge, setShowAge] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const handleChange = (field, text) => {
        setValues((prevValues) => ({
            ...prevValues,
            [field]: text,
        }));
        setShowSex(false)
        setShowAge(false)
    }
    const handleSubmitChangeInformation = () => {
        if (values.age === '') {
            Alert.alert('Missing', `You need to edit your age`);
        } else if (values.sex === '') {
            Alert.alert('Missing', `You need to edit your sex`);
        } else if (values.username === '') {
            Alert.alert('Missing', `You need to edit your username`);
        } else if (values.address === '') {
            Alert.alert('Missing', `You need to edit your address`);
        } else {
            setIsLoading(true)
            updateUser(values._id, values, token)
                .then(result => {
                    handleChangeInformation(result)
                    
                    navigation.goBack()
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    useEffect(() => {
        setValues(userInformation)
    }, [userInformation]);
    const ageList = [];
    for (let i = 1; i <= 100; i++) {
        ageList.push(i.toString());
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'black' }}>
                <View style={styles.homeContainer}>
                    <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: 20, fontWeight: 'bold' }}>Edit</Text>
                </View>
                <View style={styles.informationLogo}>
                    <Image style={styles.logo} source={{ uri: values.image }} />
                    <View style={styles.textContainer}>
                        <Text style={styles.email}>{values.email}</Text>
                    </View>
                </View>
                <View style={[styles.information]}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.label}>Username</Text>
                        <MyTextInput
                            placeholder='Full name'
                            placeholderTextColor="gray"
                            onChangeText={(text) => handleChange('username', text)}
                            value={values.username}
                        />
                        <Text style={styles.label}>Phone number</Text>
                        <MyTextInput
                            placeholder='Phone number'
                            placeholderTextColor="gray"
                            onChangeText={(text) => handleChange('phoneNumber', text)}
                            value={values.phoneNumber}
                        />
                        <Text style={styles.label}>Address</Text>
                        <MyTextInput
                            placeholder='Address'
                            placeholderTextColor="gray"
                            onChangeText={(text) => handleChange('address', text)}
                            value={values.address}
                        />
                        <Text style={styles.label}>Age</Text>
                        <TouchableOpacity
                            style={styles.inputContainer}
                            onPress={() => setShowAge(true)}
                        >
                            <Text style={styles.input}>{values.age || 'Select Age'}</Text>
                        </TouchableOpacity>
                        {showAge && (
                            <Picker
                                itemStyle={{ color: 'white', padding: 0, margin: 0 }}
                                selectedValue={values.age}
                                onValueChange={(text) => handleChange('age', text)}
                            >
                                <Picker.Item label='Select Age' value='' />
                                {ageList.map((value) => (
                                    <Picker.Item label={value} value={value} key={value} />
                                ))}
                            </Picker>
                        )}
                        <Text style={styles.label}>Sex</Text>
                        <TouchableOpacity
                            style={styles.inputContainer}
                            onPress={() => setShowSex(true)}
                        >
                            <Text style={styles.input}>{values.sex || 'Select Sex'}</Text>
                        </TouchableOpacity>
                        {showSex && (
                            <Picker
                                itemStyle={{ color: 'white', padding: 0, margin: 0 }}
                                selectedValue={values.sex}
                                onValueChange={(text) => handleChange('sex', text)}
                            >
                                <Picker.Item label='Select Sex' value='' />
                                <Picker.Item label='Male' value='Male' />
                                <Picker.Item label='Female' value='Female' />
                            </Picker>
                        )}
                        <View style={{ paddingBottom: 100 }} />
                    </View>
                </View>
            </ScrollView>
            {isLoading ? 
            <View style={styles.buyButton}>
                <ActivityIndicator size='large' color={'white'} />
            </View>
                :
                <TouchableOpacity
                    style={styles.buyButton}
                    onPress={() => {
                        handleSubmitChangeInformation()
                    }}
                >
                    <Text style={styles.buyButtonText}>Save</Text>
                </TouchableOpacity>
            }
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
    textContainer: {
        alignItems: 'center',
    },
    email: {
        padding: 10,
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
    },
    informationLogo: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        width: '100%',
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'white',
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
    },
    select: {
        position: 'absolute',
        bottom: 100
    }
});

export default Payment;

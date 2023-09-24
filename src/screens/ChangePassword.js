import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
    Image
} from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
const ChangePassword = ({ navigation }) => {
    const [values, setValues] = useState({ username: '', phoneNumber: '', address: '', sex: '', age: '' })
    const [showSex, setShowSex] = useState(false)
    const [showAge, setShowAge] = useState(false)
    const handleChange = () => {

    }
    const handleBlur = () => {

    }
    const handleChooseSex = (data) => {
        setValues({ ...values, sex: data });
        setShowSex(false)
    }
    const handleChooseAge = (data) => {
        setValues({ ...values, age: data });
        setShowAge(false)
    }
    const ageList = [];
    for (let i = 1; i <= 100; i++) {
        ageList.push(i.toString());
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'black' }}>
                <View style={styles.homeContainer}>
                    <Text style={{ color: 'white', textAlign: 'center', flex: 1, fontSize: 20, fontWeight: 'bold' }}>Change password</Text>
                </View>
                
                <View style={[styles.information]}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.label}>Password</Text>
                        <MyTextInput
                            placeholder='Password'
                            placeholderTextColor="gray"
                            onChangeText={
                                handleChange('username')
                            }
                            onBlur={handleBlur('username')}
                            value={values.username}
                        />
                        <Text style={styles.label}>New password</Text>
                        <MyTextInput
                            placeholder='New password'
                            placeholderTextColor="gray"
                            onChangeText={
                                handleChange('phoneNumber')
                            }
                            onBlur={handleBlur('phoneNumber')}
                            value={values.phoneNumber}
                        />
                        <Text style={styles.label}>Renew password</Text>
                        <MyTextInput
                            placeholder='Renew password'
                            placeholderTextColor="gray"
                            onChangeText={
                                handleChange('address')
                            }
                            onBlur={handleBlur('address')}
                            value={values.address}
                        />
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
    textContainer: {
        alignItems: 'center',
    },
    email: {
        padding:10,
        fontWeight:'bold',
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

export default ChangePassword;

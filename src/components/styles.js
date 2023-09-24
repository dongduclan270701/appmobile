import styled from 'styled-components';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
const StatusBarHeight = Constants.statusBarHeight;
// colors
export const Colors = {
    primary: 'black',
    secondary: 'grey',
    tertiary: 'white',
    darkLight: 'white',
    brand: 'red',
    green: '#10B981',
    red: 'white',
};
const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;
export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 30}px;
    background-color: ${primary};
`

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`

// export const HomepageContainer = styled(InnerContainer)`
//     padding: 25px;
//     padding-top: 10px;
//     justify-content: center;
// `

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${secondary};
    margin-bottom: 10px;
    margin-top: 10px;
`

export const HomepageImage = styled.Image`
    height:50%;
    min-width:100%;
`

export const PageLogo = styled.Image`
    width: 100px;
    height: 100px;
`

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align:center;
    font-weight:bold;
    color: ${brand};
    padding: 10px;

    ${(props) => props.homepage && `
    font-size:35px;
    `}
`

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
    
    ${(props) => props.homepage && `
    margin-bottom:5px;
    font-weight:normal;
    `}
`


export const StyledFormArea = styled.View`
    width:90%;
`

export const StyledTextInput = styled.TextInput`
    border: 1px solid white;
    padding: 15px;
    padding-left:55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical:3px;
    margin-bottom: 10px;
    color: ${tertiary};
`

export const StyledInputLabel = styled.Text`
    color: ${tertiary};
    font-size: 13px;
    text-align:left;
`

export const LeftIcon = styled.View`
    left: 15px;
    top: 32px;
    position: absolute;
    z-index: 1;
`
export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top:32px;
    position: absolute;
    z-index: 1;
`

export const StyledButton = styled.TouchableOpacity`
    padding:15px;
    background-color: ${brand};
    justify-content: center;
    align-items:center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;
`

export const Loading = styled.TouchableOpacity`
    padding:15px;
    justify-content: center;
    align-items:center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;
`

export const ButtonText = styled.Text`
    color: white;
    font-size:16px;
`

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
    color: red;
    padding-vertical: 10px;
`

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin-vertical: 10px;
`

export const LineHomePage = styled.View`  
    height: 2px;
    width: 100%;
    background-color: #ff3a3a;
    margin-bottom: 10px;
`
export const LinePayment = styled.View`  
    height: 1px;
    margin-vertical:10px;
    width: 100%;
    background-color: #ff3a3a;
    margin-bottom: 10px;
`

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`

export const ExtraText = styled.Text`
    justify-content: center;
    align-item:center;
    color: ${tertiary};
    font-size: 15px;
`

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-item:center;
`

export const TextLinkContent = styled.Text`
    color: ${brand};
    font-size: 15px;
`

export const HomepageContainer = styled.View`
    padding:15px;    
    padding-top:60px;
    justify-content: space-between;
    flex-direction: row;
    align-content:center;
    color: white;
    overflow-y:scroll;
    background-color:black;
    flex-direction: row;
`
export const Logo = styled.Image`
    marginTop:20px; 
    marginRight:20px;   
    width:55px;
    height:40px;
`
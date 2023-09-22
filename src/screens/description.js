import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

const Description = ({product}) => {

    const renderTextWithSpan = (text) => {
        const splitText = text.split(/<br\s*\/?>/i); // tách chuỗi tại vị trí <br/> hoặc <br>

        return splitText.map((textPart, index) => {
            if (index === splitText.length - 1) {
                // nếu đây là phần tử cuối cùng thì trả về textPart không cần thêm <Text>
                return textPart;
            }

            // nếu không thì thêm <Text> để render
            return textPart + '\n'
        });
    }
    return (
        <FlatList
            data={product.description_table}
            renderItem={({ item }) => (
                <View style={styles.specRow}>
                    <Text style={styles.specName}>{item[0]}</Text>
                    <Text style={styles.specValue}>{renderTextWithSpan(item[1])}</Text>
                </View>
            )}
            keyExtractor={(item, index) => index}
        />
    );
}

const styles = StyleSheet.create({})

export default Description;

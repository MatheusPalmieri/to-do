import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function TaskList({ data, handleDelete }) {
    return(
        <Animatable.View 
            style={styles.container}
            animation= "bounceIn"
            useNativeDriver
        >
            <TouchableOpacity onPress={() => handleDelete(data)}>
                <Ionicons 
                    name="md-checkmark-circle" size={30} color="#121212"
                />
            </TouchableOpacity>
            <View>
                <Text style={styles.taskTitle}> {data.task} </Text>
            </View>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        marginBottom: 0,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 7,
        elevation: 1.5,
        shadowColor: '#000',
        shadowOpacity: .2,
        shadowOffset: {
            width: 1,
            height: 3
        }
    },
    taskTitle: {
        color: '#121212',
        fontSize: 18,
        paddingLeft: 8,
        paddingRight: 20
    }
})

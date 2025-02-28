import { View, Text, StyleSheet, TouchableOpacity, Button, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox'
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from 'axios'
import ReactNativeModal from 'react-native-modal';

const TaskCard = ({ task_id, isComplete, title, description }) => {

    const [deleteBoxVisible, setdeleteBoxVisible] = useState(false);
    const [editBoxVisible, seteditBoxVisible] = useState(false);
    const [formData, setFormData] = useState({ title, description });

    let handleTaskDone = (id) => {
        console.log(id)
        axios.patch(`https://api.freeapi.app/api/v1/todos/toggle/status/${id}`, { isComplete: !isComplete },
        ).catch((err) => {
            console.log(err);
        })
    };

    let handleTaskDelete = (id) => {
        axios.delete(`https://api.freeapi.app/api/v1/todos/${id}`).catch((err) => {
            console.log(err);
        })
        setdeleteBoxVisible(false);
    };

    let handleUpdate = (id) => {
        axios.patch(`https://api.freeapi.app/api/v1/todos/${id}`, formData).catch((err) => {
            console.log(err);
        })
        setFormData({ title: '', description: '' });
        seteditBoxVisible(false);
    }


    return (
        <View style={styles.cardContainer}>

            <View style={styles.checkBoxContainer}>
                <Checkbox
                    value={isComplete}
                    onValueChange={() => handleTaskDone(task_id)}
                    style={styles.checkBox}
                />
            </View>
            <View style={styles.taskContentContainer}>
                <Text style={styles.taskTitle}>{title}</Text>
                <Text style={styles.taskDescription}>{description}</Text>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => seteditBoxVisible(true)} style={styles.editButton}>
                    <Feather name="edit" size={30} color="black" style={styles.icon} />
                </TouchableOpacity>
                <ReactNativeModal
                    isVisible={editBoxVisible}
                    onBackdropPress={() => seteditBoxVisible(false)}
                    onBackButtonPress={() => seteditBoxVisible(false)}
                    animationIn={"fadeIn"}>
                    <View style={styles.alertEditContainer}>
                        <Text style={styles.alertText}>Editing your task!</Text>

                        <View style={styles.editInputBox}>
                            <TextInput placeholder='Edit task title' value={formData?.title} style={styles.editInput} onChangeText={value => setFormData(prev => ({ ...prev, title: value }))} />
                            <TextInput placeholder='Edit task description' value={formData?.description} style={styles.editInput} onChangeText={value => setFormData(prev => ({ ...prev, description: value }))} />
                        </View>

                        <View style={styles.alertActionContainer}>
                            <TouchableOpacity onPress={() => seteditBoxVisible(false)} style={styles.alertActionButton} >
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleUpdate(task_id)} style={styles.alertActionButton} >
                                <Text>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ReactNativeModal>

                <TouchableOpacity onPress={() => setdeleteBoxVisible(true)} style={styles.deleteButton}>
                    <MaterialIcons name="delete-outline" size={30} color="black" style={styles.icon} />
                </TouchableOpacity>
                <ReactNativeModal
                    isVisible={deleteBoxVisible}
                    onBackdropPress={() => setdeleteBoxVisible(false)}
                    onBackButtonPress={() => setdeleteBoxVisible(false)}
                    animationIn={"fadeIn"}>
                    <View style={styles.alertDeleteContainer}>
                        <Text style={styles.alertText}>Alert!</Text>
                        <Text style={styles.alertDescription}>Are you sure to delete ?</Text>
                        <View style={styles.alertActionContainer}>
                            <TouchableOpacity onPress={() => setdeleteBoxVisible(false)} style={styles.alertActionButton} >
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleTaskDelete(task_id)} style={styles.alertActionButton} >
                                <Text>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ReactNativeModal>
            </View>
        </View>
    )
}


let styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        boxShadow: '1px 1px 5px gray',
        marginTop: 5,
        marginHorizontal: 5
    },
    checkBoxContainer: {
    },
    checkBox: {
        width: 20,
        height: 20
    },
    taskContentContainer: {
        width: '60%',
        padding: 10,
        marginHorizontal: 5
    },
    taskTitle: {
        fontSize: 20,
        fontWeight: 600
    },
    taskDescription: {},
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    editButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: 'blue',
        borderRadius: 5
    },
    deleteButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: 'red',
        borderRadius: 5
    },
    icon: {
        color: 'white',
    },
    deleteIcon: {
        backgroundColor: 'red',
        color: 'white',
        borderRadius: 5
    },
    alertDeleteContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        height: 150
    },
    alertEditContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        height: 220
    },
    alertText: {
        fontSize: 20,
        fontWeight: 600,
        padding: 10,
    },
    alertDescription: {
        fontSize: 20,
        padding: 10
    },
    alertActionContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        padding: 5
    },
    alertActionButton: {
        padding: 10,
        fontSize: 20,

    },
    editInputBox: {
        padding: 10,
    },
    editInput: {
        height: 40,
        width: '80%',
        borderWidth: 1,
        borderColor: 'gray',
        margin: 5,
        padding: 5,
        borderRadius: 5
    }
})

export default TaskCard
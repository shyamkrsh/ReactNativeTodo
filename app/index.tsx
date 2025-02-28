import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView, Image } from "react-native";
import axios from 'axios'
import TaskCard from '../components/TaskCard.jsx'

export default function Index() {

  const [formData, setFormData] = useState({ title: '', description: '' })

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`https://api.freeapi.app/api/v1/todos`).then((res) => {
      setTasks(res?.data?.data);
      console.log(res?.data?.data)
    }).catch((err) => {
      console.log(err);
    })
  }, [])


  let handleSubmit = () => {
    axios.post(`https://api.freeapi.app/api/v1/todos`, formData).then((res) => {
      setFormData({ title: '', description: '' });
      console.log(res?.data?.data)
    }).catch((err) => {
      console.log(err);
    })
    setFormData({ title: '', description: '' });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Enter task title" style={styles.input} value={formData.title} onChangeText={value => setFormData(prev => ({ ...prev, title: value }))} />
        <TextInput placeholder="Write your task" style={styles.input} value={formData.description} onChangeText={value => setFormData(prev => ({ ...prev, description: value }))} />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {
          tasks?.length == 0 ? <View>
            <Image source={{uri: 'https://i.ibb.co/nMWRh0V8/empty.png'}} style={{
              width: '100%',
              height: 150,
              marginTop: 30
            }}/>
            <Text style={styles.emptyContent}>
              No Such Task available
            </Text>
          </View>
            : ""
        }
        {tasks?.map((task) => (
          <TaskCard key={task?._id} task_id={task?._id} isComplete={task?.isComplete} title={task?.title} description={task?.description} />
        ))}

      </ScrollView>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputContainer: {
    padding: 10,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 50,
    width: '80%',
    padding: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10

  },
  button: {
    backgroundColor: 'blue',
    width: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 600
  },
  emptyContent: {
    fontSize: 25,
    fontWeight: 600,
    textAlign: 'center',
    marginTop: 30
  }
})
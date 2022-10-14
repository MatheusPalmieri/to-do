import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TouchableOpacity, Modal, TextInput, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable';

const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity)

export default function App() {

  const [task, setTask] = useState([])
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')

  // Buscando tarefa ao iniciar o app
  useEffect(() => {
    async function loadTasks() {
      const taskStorage = await AsyncStorage.getItem('@task')

      if(taskStorage) {
        setTask(JSON.parse(taskStorage))
      }
    }

    loadTasks()
  }, [])

  // Salvando tarefa
  useEffect(() => {
    async function saveTasks() {
      await AsyncStorage.setItem('@task', JSON.stringify(task))
    }

    saveTasks()
  }, [task])

  function HandleAdd() {
    if(input === '') return

    const data = {
      key: input,
      task: input
    }

    setTask([...task, data])
    setOpen(false)
    setInput('')
  }

  const handleDelete = useCallback((data) => {
    const find = task.filter(response => response.key !== data.key)
    setTask(find)
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={'#171d31'}
        barStyle="light-content"
      />

      <View style={styles.content}>
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={(item) => String(item.key)}
        renderItem={({item}) => <TaskList data={item} handleDelete={handleDelete}/>}
      />

      <Modal
        animationType='slide'
        transparent={false}
        visible={open}
      >
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalNav}>
            <TouchableOpacity
              onPress={() => setOpen(false)}
            >
              <Ionicons
                style={{marginLeft: 5, marginRight: 5}}
                name='md-arrow-back'
                size={40}
                color='#fff'
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nova Tarefa</Text>
          </View>

          <Animatable.View 
            style={styles.modalContent}
            animation="fadeInUp"
            useNativeDriver
          >
            <TextInput 
              placeholder='Digite sua nova tarefa. '
              style={styles.modalInput}
              multiline={true}
              value={input}
              onChangeText={(text) => setInput(text)}
            />

            <TouchableOpacity style={styles.modalAdd} onPress={HandleAdd}>
              <Text style={styles.modalAddText}>Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>
        </SafeAreaView>
      </Modal>

      <AnimatedButton
        style={styles.button}
        useNativeDriver
        animation="bounceInUp"
        duration={1500}
        onPress={() => setOpen(true)}
      >
        <Ionicons 
          name='ios-add' 
          size={25} 
          color="#fff"
        />
      </AnimatedButton>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171d31',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: "#0094FF",
    borderRadius: 50,
    bottom: 30,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    zIndex: 10,
    shadowColor: '#000',
    shadowOpacity: .3,
    shadowOffset: {
      width: 1,
      height: 3
    }
  },
  modal: {
    flex: 1,
    backgroundColor: '#171d31',
  },
  modalNav: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalTitle: {
    marginLeft: 10,
    fontSize: 23,
    color: '#fff'
  },
  modalContent: {
    marginTop: 15,
  },
  modalInput: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 9,
    height: 85,
    textAlignVertical: "top",
    color: '#000',
    borderRadius: 5,
  },
  modalAdd: {
    backgroundColor: "#fff",
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5
  },
  modalAddText: {
    fontSize: 18
  }
});

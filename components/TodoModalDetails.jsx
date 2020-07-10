import React, { useState } from "react";
import {
  Keyboard,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { colors } from "../configs/Colors";

export default function TodoModalDetails({
  updateList,
  list,
  closeModal = () => {},
}) {
  const [newTodoItem, setNewTodoItem] = useState("");
  const taskCount = list.todos.length;
  const completedCount = list.todos.filter((todo) => todo.completed).length;

  const toggleTodoCompleted = (index) => {
    list.todos[index].completed = !list.todos[index].completed;
    updateList(list);
  };

  const addTodo = () => {
    list.todos.push({ title: newTodoItem, completed: false });
    updateList(list);
    setNewTodoItem("");
    Keyboard.dismiss();
  };

  const renderTodoItems = (item, index) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity
          onPress={() => {
            toggleTodoCompleted(index);
          }}
        >
          <Ionicons
            name={item.completed ? "ios-square" : "ios-square-outline"}
            size={24}
            color={colors.gray}
            style={{ width: 32 }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.todoItem,
            {
              textDecorationLine: item.completed ? "line-through" : "none",
              color: item.completed ? colors.gray : colors.black,
            },
          ]}
        >
          {item.title}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.section,
          styles.header,
          { borderBottomColor: list.color },
        ]}
      >
        <TouchableOpacity
          style={{ position: "absolute", top: 30, right: 20 }}
          onPress={closeModal}
        >
          <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>{list.name}</Text>
          <Text style={styles.taskCount}>
            {completedCount} of {taskCount} tasks
          </Text>
        </View>
      </View>
      <View style={([styles.section], { flex: 3 })}>
        <FlatList
          data={list.todos}
          renderItem={({ item, index }) => renderTodoItems(item, index)}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            marginRight: 100,
            paddingHorizontal: 34,
            paddingVertical: 64,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <KeyboardAvoidingView
        style={[styles.section, styles.footer]}
        behavior="padding"
      >
        <TextInput
          style={[styles.input, { borderColor: list.color }]}
          onChangeText={(text) => setNewTodoItem(text)}
          value={newTodoItem}
        />
        <TouchableOpacity
          style={[styles.addTodoIcon, { backgroundColor: list.color }]}
          onPress={() => addTodo()}
        >
          <AntDesign name="plus" size={14} color={colors.white} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodoIcon: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  todoItem: {
    color: colors.black,
    fontWeight: "700",
    fontSize: 16,
  },
});

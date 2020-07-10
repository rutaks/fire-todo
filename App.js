import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "./configs/Colors";
import { tempData } from "./tempData";
import TodoList from "./components/TodoList.jsx";
import AddListModal from "./components/AddListModal.jsx";
import Firebase from "./configs/Firebase";

export default function App() {
  const [isAddTodoVisible, setIsAddModalVisible] = useState(false);
  const [lists, setLists] = useState(tempData);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ uid: "" });

  // useEffect(() => {
  //   return () => {
  //     firebase.detach();
  //   };
  // }, [firebase]);

  // useEffect(() => {
  //   firebase = new Firebase((error, user) => {
  //     if (error) {
  //       return alert("Something went wrong");
  //     }
  //     setLoading(true);
  //     firebase.getLists((lists) => {
  //       setLists(lists);
  //     });
  //     setUser(user);
  //   });
  // }, []);

  const toggleAddTodoModal = () => {
    setIsAddModalVisible(!isAddTodoVisible);
  };

  const addList = (item) => {
    setLists([...lists, { ...item, id: lists.length + 1 }]);
  };

  const renderList = (item) => <TodoList updateList={updateList} list={item} />;

  const updateList = (list) => {
    setLists(
      lists.map((item) => {
        return item.id === list.id ? list : item;
      })
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={isAddTodoVisible}
        onRequestClose={() => toggleAddTodoModal()}
      >
        <AddListModal closeModal={toggleAddTodoModal} addList={addList} />
      </Modal>
      <View>
        <Text>User: {user.uid}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Fire{" "}
          <Text style={{ fontWeight: "300", color: colors.black }}>Todo</Text>{" "}
        </Text>
        <View style={styles.divider} />
      </View>
      <View style={{ marginVertical: 48 }}>
        <TouchableOpacity
          style={styles.addList}
          onPress={() => toggleAddTodoModal()}
        >
          <AntDesign name="plus" size={16} color={colors.orange}></AntDesign>
        </TouchableOpacity>
        <Text style={styles.add}>Add new list</Text>
      </View>
      <View style={{ height: 275, paddingLeft: 32 }}>
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderList(item)}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.orange,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.orange,
    paddingHorizontal: 24,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.orange,
    borderRadius: 4,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.orange,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
});

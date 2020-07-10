import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../configs/Colors";
import { tempData } from "../tempData";

export default function AddListModal({
  closeModal = () => {},
  addList = () => {},
}) {
  const colorOptions = [
    colors.orange,
    "#5CD859",
    "#24A6D9",
    "#595BD9",
    "#8022D9",
    "#D159D8",
    "#D85963",
  ];
  const [name, setName] = useState("");
  const [selectedColorOption, setSelectedColorOption] = useState(
    colorOptions[0]
  );

  const createToDo = () => {
    const list = { name, color: selectedColorOption, todos: [] };
    addList(list);
    // tempData.push({ name, color: selectedColorOption, todos: [] });
    setName("");
    setSelectedColorOption(colorOptions[0]);
    closeModal();
  };

  const renderColorOptions = () => {
    return colorOptions.map((colorOption) => {
      return (
        <TouchableOpacity
          key={colorOption}
          style={[styles.colorOption, { backgroundColor: colorOption }]}
          onPress={() => setSelectedColorOption(colorOption)}
        />
      );
    });
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity
        style={{ position: "absolute", top: 30, right: 20 }}
        onPress={() => closeModal()}
      >
        <AntDesign name="close" size={24} color={colors.black} />
      </TouchableOpacity>
      <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
        <Text style={styles.title}>Create a new fire</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the fire name"
          onChangeText={(text) => setName(text)}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 24,
          }}
        >
          {renderColorOptions()}
        </View>
        <TouchableOpacity
          style={[styles.createBtn, { backgroundColor: selectedColorOption }]}
          onPress={createToDo}
        >
          <Text style={{ color: colors.white, fontWeight: "600" }}>
            Create!
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.black,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.orange,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  createBtn: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});

import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";

function SearchInput(props) {
  const [inputText, setInputText] = useState("");

  const handleTextChange = (text) => {
    setInputText(text);
  };

  const handleSubmitEditing = () => {
    if (!inputText) return;
    props.onSubmitEditing(inputText);
    setInputText("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={inputText}
        autoCorrect={false}
        onChangeText={handleTextChange}
        onSubmitEditing={handleSubmitEditing}
        placeholder={props.placeholder}
        placeholderTextColor="white"
        style={styles.textInput}
        clearButtonMode="always"
        underlineColorAndroid={"#666"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: "#666",
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: "white",
  },
});

export default SearchInput;

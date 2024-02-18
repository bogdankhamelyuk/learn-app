import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TouchButton({ onPress, style, text, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled ? styles.buttonDisabled : null]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#B48231",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: "#D4B37F",
  },
});

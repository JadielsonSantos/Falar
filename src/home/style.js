import { StyleSheet } from "react-native";

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4b0182',
  },
  view: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15
  },
  body: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: "5%",
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#fff"
  }
});
export {estilo};
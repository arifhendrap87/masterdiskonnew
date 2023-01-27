import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  navbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    backgroundColor: BaseColor.whiteColor
  },
  scrollView: {
    height: '20%',
    width: '80%',
    margin: 20,
    alignSelf: 'center',
    padding: 20,
    borderWidth: 5,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: 'lightblue'
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingBottom: 50
  }
});

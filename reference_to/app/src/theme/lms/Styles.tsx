import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;


const Styles: any = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: '#eeeeee'
  },
  homeContainer: {
    backgroundColor: '#eeeeee'
  },
  loginBtn: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor:'#ff5c33' ,
    marginTop:20,
    width: 100,
  }
}
);

export default Styles;
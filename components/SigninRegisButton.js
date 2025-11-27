import { StyleSheet } from "react-native";

const SigninRegisButtons = StyleSheet.create({
  btn: {
    marginVertical: 15,
    backgroundColor: '#357045',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  btnActive: {
    backgroundColor: "#357045", // green when active
  },
  btnInactive: {
    backgroundColor: "#ccc", // gray when inactive
  },
  btnText: {
    letterSpacing: 1.5,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  textActive: {
    color: "#fff", // white text when active
  },
  textInactive: {
    color: "#000", // black text when inactive
  },
  formFooter: {
    marginVertical: 10,
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  reg: {
    textDecorationLine: 'underline',
    marginVertical: -5.8,
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

export default SigninRegisButtons;
import { StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import colors from '../../utils/colors';
const styles = StyleSheet.create({
  inputContainer: {
    width: width(90),
    height: height(6.5),
    marginTop:height(1),
    borderRadius: width(5),
    borderWidth: 0.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderColor: colors.slateGray,
  },
  inputText: {
    width: width(85),
    height: height(6),
    color:colors.black,
  },
  // multiLine Input
  multlineInputContainer:{
    width: width(90),
    height: height(15),
    borderRadius: width(5),
    marginTop:height(3),
    borderWidth: 0.5,
    padding:0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderColor: colors.slateGray,
  },
  multlineInputText: {
    width: width(85),
    height: height(12),
    color:colors.black,
  },
});

export default styles;

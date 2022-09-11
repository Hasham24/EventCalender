import { StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import colors from '../../utils/colors';
const styles = StyleSheet.create({
  container: {
    width:width(90),
    borderRadius: width(2),
    height: height(6),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue
  },
  text: {
    color: colors.white,
    fontSize: width(3.5),
  },

  // dataTime button styling
  dateButton: {
    width: width(90),
    height: height(6),
    marginTop: height(2),
    paddingHorizontal: width(2.5),
    borderRadius: width(1),
    borderWidth: 0.5,
    alignSelf:'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderColor: colors.slateGray
},
dateButtonText: {
  color: colors.black,
  fontSize: width(3.5),
},
unSelectedDateButtonText: {
  color: colors.slateGray,
  fontSize: width(3.5),
},
});

export default styles;

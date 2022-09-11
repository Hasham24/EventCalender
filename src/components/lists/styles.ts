import { StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import colors from '../../utils/colors';
const styles = StyleSheet.create({
  listContainer:{
    width: width(90),
    paddingVertical: height(2),
    borderRadius: width(2),
    paddingHorizontal: width(2.5),
    marginBottom: height(3),
    borderWidth: 0.7,
    alignSelf: 'center',
    borderColor: colors.iron,
},
eventTitleContainer:{
    width: width(85),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
},
editDeleteContainer:{
    flexDirection:'row',
    alignItems:'center',
},
deleteButton:{
    marginHorizontal:width(3)
},
lable:{
    fontSize: width(4),
    color: colors.slateGray,
    marginTop: height(2)
},
valueText:{
    color: colors.black,  
},
});

export default styles;

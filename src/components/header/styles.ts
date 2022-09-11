import {StyleSheet} from 'react-native';
import {width,height} from 'react-native-dimension'
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
   width:width(100),
   backgroundColor:colors.white,
   paddingHorizontal:width(5),
   flexDirection:'row',
   alignItems:'center',
   justifyContent:'space-between',
   paddingVertical:height(2),
   borderBottomWidth:0.5,
   borderBottomColor:colors.iron
  },
  text:{
    color:colors.black,
    fontWeight:'bold',
    fontSize:width(5)
  },
  emptyContainer:{
    width:width(10)
  }
});

export default styles;

import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { width, height } from 'react-native-dimension';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    contentContainer:{
        paddingVertical:height(2)
    },
    dropDown:{
        marginBottom:height(2)
    },
    emptyComponent:{
        marginTop:height(30),
        alignSelf:'center',
        fontWeight:'bold', 
        color: colors.black, 
    },
    addButton:{
        position:'absolute',
        bottom:height(5),
        right:width(5),
        alignItems:'center',
        justifyContent:'center',
        height:width(15),
        width:width(15),
        borderRadius:width(7.5),
        backgroundColor:colors.blue
    },
});

export default styles;
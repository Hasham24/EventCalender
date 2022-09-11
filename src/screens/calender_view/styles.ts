import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { width, height } from 'react-native-dimension';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    contentContainerStyle:{
        paddingVertical:height(3)
    },
    calendarContainer:{
        width: width(90),
        alignSelf: 'center',
        backgroundColor: colors.whiteSmoke,
        borderRadius: width(5),
        paddingBottom: height(2),
        marginBottom:height(2)
    },
    headerWrapperStyle: {
        backgroundColor: colors.blue,
        height: height(6),
        borderTopLeftRadius: width(5),
        borderTopRightRadius: width(5),
        marginBottom: height(0)
    },
    dayLabelsWrapper: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
        width: width(90),
        alignItems: 'center',
        paddingHorizontal: 0,
        backgroundColor: colors.blue,
        paddingBottom: 0,
        paddingTop: 0,
        height: height(6),
    },
    headerText: {
        color: colors.black,
        fontSize: width(3.85),
        marginHorizontal: width(0.5),
    },
    weekText: {
        color: colors.black,
    },
    dateContainerStyles: {
        marginTop: height(1)
    },
    markedDateText: {
        marginHorizontal: width(5),
        marginVertical: height(2),
        color: colors.mineShaft,
        fontSize: width(4)
    },
    contentContainer:{
        paddingVertical:height(2)
    },
    emptyComponent:{
        marginTop:height(5),
        alignSelf:'center',
        fontWeight:'bold', 
        color: colors.black, 
    },
});

export default styles;
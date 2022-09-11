import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { height, width, totalSize } from 'react-native-dimension';
const styles = StyleSheet.create({
    dropDown: {
        height: height(18),
        width: width(90),
        marginHorizontal:width(5)
    },
    dropDownItemContainer: {
        paddingVertical: height(2),
        paddingHorizontal: width(3)
    },
    dropDownItemText: {
        fontSize: totalSize(1.6),
        color: colors.black
    },
    genderText: {
        fontSize: width(3.25),
        marginBottom: height(0.5),
        color: colors.slateGray
    },
    container: {
        width: width(90),
        height: height(6.5),
        borderRadius: width(2),
        paddingHorizontal: width(2.5),
        borderWidth: 0.5,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: colors.iron,
        backgroundColor: colors.white,
        marginTop:height(2)
    },
    selectedValueText: {
        fontSize: width(3.5),
        color: colors.black,
    },
    placeHoladerText: {
        fontSize: width(3.75),
        color: colors.slateGray,
    }
});
export default styles;

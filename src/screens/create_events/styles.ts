import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { width, height } from 'react-native-dimension';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    contentContainer: {
        paddingVertical: height(3)
    },
    timeContainer: {
        width: width(90),
        marginTop: height(2),
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    timeButton:{
        width: width(40),
        paddingHorizontal: width(2.5),
        borderRadius: width(1),
        borderWidth: 0.5,
        alignItems: 'flex-start',
        backgroundColor: colors.white,
        borderColor: colors.slateGray
    },
    attachmentButton: {
        width: width(90),
        marginTop: height(2),
        paddingHorizontal: width(2.5),
        borderRadius: width(1),
        borderWidth: 0.5,
        alignItems: 'flex-start',
        backgroundColor: colors.white,
        borderColor: colors.slateGray
    },
    unSelectattachmentText: {
        color: colors.slateGray,
    },
    attachmentText: {
        color: colors.black,
    },

    addEventButton:{
        position:'absolute',
        bottom:height(5)
    }
});

export default styles;
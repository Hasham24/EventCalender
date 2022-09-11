import { useEffect, useState } from 'react';
import { Platform, Keyboard } from 'react-native';
export const keyBoardOpen = () => {
    const [keyboardStatus, setKeyboardStatus] = useState(false);

    useEffect(() => {
        if (Platform.OS == 'android') {
            const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
                setKeyboardStatus(true);
            });
            const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
                setKeyboardStatus(false);
            });

            return () => {
                showSubscription.remove();
                hideSubscription.remove();
            };
        }
    }, []);
    return { keyboardStatus }
}
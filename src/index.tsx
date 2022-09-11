import React,{useEffect} from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import FlashMessage from 'react-native-flash-message';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist';
import Routes from './routes';
// let persistor = persistStore(store);
const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
    ]);
  }, [])
  
  return (
     <Provider store={store}>
    {/* //   <PersistGate loading={null} persistor={persistor}> */}
    <Routes />
        <FlashMessage position="bottom" icon="auto" />
    {/* //   </PersistGate> */}
     </Provider>
  );
};

export default App;

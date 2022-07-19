/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { Button, Linking } from 'react-native';
// import {checkMultiple, PERMISSIONS} from 'react-native-permissions';
import { openSettings } from 'react-native-permissions';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Platform,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { requestNotifications, checkNotifications } from 'react-native-permissions';
import RNPermissions, { check, request, Permission, PERMISSIONS } from 'react-native-permissions';
const PLATFORM_PERMISSIONS = Platform.select <
  typeof PERMISSIONS.ANDROID | typeof PERMISSIONS.IOS | typeof PERMISSIONS.WINDOWS | {}
  > ({
    android: PERMISSIONS.ANDROID,
    ios: PERMISSIONS.IOS,
    windows: PERMISSIONS.WINDOWS,
    default: {},
  });

const PERMISSIONS_VALUES = Object.values(PLATFORM_PERMISSIONS);

const Section = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  // Linking.openSettings();

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const grantBluetoothPermission = () => {
    console.log(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
    request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT).then(result => {
      console.warn(result)
    })

  }



  // function check(permission): Promise<PermssionStatus>;

  const grantLocationPermission = () => {

  }

  useEffect(() => {


  }, [])



  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        // contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />


        <Section title="Step One">
          Edit <Text style={styles.highlight}>App.js</Text> to change this
          screen and then come back to see your edits.
        </Section>
        <Section title="See Your Changes">
          <ReloadInstructions />
        </Section>
        <Section title="Debug">
          <DebugInstructions />
        </Section>
        <Section title="Learn More">
          Read the docs to discover what to do next:
        </Section>
        <LearnMoreLinks />

      </ScrollView>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

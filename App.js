import React, { Fragment } from 'react';
import { SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView, View } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import Clock from './Clock';

const App = () => {
  return (
    <Fragment>
      <StatusBar animated barStyle="light-content" />
      <SafeAreaView style={{ backgroundColor: '#0B1521' }}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.body}>
            <Clock />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height,
    backgroundColor: '#0B1521'
  },
  body: {
    height: Dimensions.get('window').height,
    backgroundColor: '#0B1521',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark
  },
  highlight: {
    fontWeight: '700'
  }
});

export default App;

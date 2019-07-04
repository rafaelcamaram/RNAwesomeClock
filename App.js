import React, { Fragment } from 'react';
import { SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView, View } from 'react-native';

/* Config - imports */
import COLORS from './src/config/colors';

/* Presentational - components - imports */
import Clock from './src/components/presentational/Clock';

const App = () => {
  return (
    <Fragment>
      <StatusBar animated barStyle="light-content" />
      <SafeAreaView style={{ backgroundColor: COLORS.primary }}>
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
    backgroundColor: COLORS.primary
  },
  body: {
    height: Dimensions.get('window').height,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;

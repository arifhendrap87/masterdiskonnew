import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default function InternetCheck() {
  const [isConnected, setIsConnected] = useState(true);

  if (isConnected) {
    return (
      <View style={[styles.container, {backgroundColor: 'green'}]}>
        <Text style={styles.text}> Connected</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}> No Internet Connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});
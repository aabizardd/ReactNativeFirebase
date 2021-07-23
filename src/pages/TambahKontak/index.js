import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {InputData} from '../../components';

export default class TambahKontak extends Component {
  render() {
    return (
      <View style={styles.pages}>
        <InputData label="Nama" placeholder="Masukkan Nama" />
        <InputData
          label="Nomor HP"
          placeholder="Masukkan Nomor HP"
          keyboardType="number-pad"
        />
        <InputData
          label="Alamat"
          placeholder="Masukkan Alamat"
          isTextArea={true}
        />
        <TouchableOpacity style={styles.tombolSubmit}>
          <Text style={styles.textSubmit}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    padding: 30,
  },
  tombolSubmit: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textSubmit: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Alert} from 'react-native';
import {InputData} from '../../components';
import FIREBASE from '../../config/FIREBASE';

export default class TambahKontak extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: '',
      nomorHp: '',
      alamat: '',
    };
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  onSubmit = () => {
    if (this.state.nama && this.state.nomorHp && this.state.alamat) {
      const kontakReferensi = FIREBASE.database().ref('Kontak');
      const kontak = {
        nama: this.state.nama,
        nomorHp: this.state.nomorHp,
        alamat: this.state.alamat,
      };

      kontakReferensi
        .push(kontak)
        .then(data => {
          Alert.alert('Success', 'Berhasil menambah data kontak');
          this.props.navigation.replace('Home');
        })
        .catch(error => console.log(error));
    } else {
      Alert.alert('Error', 'Silahkan lengkapi semua field');
    }
  };

  render() {
    return (
      <View style={styles.pages}>
        <InputData
          label="Nama"
          placeholder="Masukkan Nama"
          onChangeText={this.onChangeText}
          value={this.state.nama}
          namaState="nama"
        />
        <InputData
          label="Nomor HP"
          placeholder="Masukkan Nomor HP"
          keyboardType="number-pad"
          onChangeText={this.onChangeText}
          value={this.state.nomorHp}
          namaState="nomorHp"
        />
        <InputData
          label="Alamat"
          placeholder="Masukkan Alamat"
          isTextArea={true}
          onChangeText={this.onChangeText}
          value={this.state.alamat}
          namaState="alamat"
        />

        <TouchableOpacity
          style={styles.tombolSubmit}
          onPress={() => this.onSubmit()}>
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

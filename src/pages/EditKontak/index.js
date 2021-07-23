import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Alert} from 'react-native';
import {InputData, Modal} from '../../components/';
import FIREBASE from '../../config/FIREBASE';

export default class EditKontak extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: '',
      nomorHp: '',
      alamat: '',
      content: false,
    };
  }

  componentDidMount() {
    FIREBASE.database()
      .ref('Kontak/' + this.props.route.params.id)
      .once('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let kontakItem = {...data};

        this.setState({
          nama: kontakItem.nama,
          nomorHp: kontakItem.nomorHp,
          alamat: kontakItem.alamat,
        });
      });
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  onSubmit = () => {
    var is_success = true;
    if (this.state.nama && this.state.nomorHp && this.state.alamat) {
      const kontakReferensi = FIREBASE.database().ref(
        'Kontak/' + this.props.route.params.id,
      );
      const kontak = {
        nama: this.state.nama,
        nomorHp: this.state.nomorHp,
        alamat: this.state.alamat,
      };

      kontakReferensi
        .update(kontak)
        .then(data => {
          this.setState(previousState => ({content: !previousState.content}));
          setTimeout(() => {
            this.props.navigation.replace('Home');
          }, 2000);

          is_success = true;
        })
        .catch(error => console.log(error));
    } else {
      Alert.alert('Error', 'Silahkan lengkapi semua field');
      is_success = false;
    }
    return is_success;
  };

  componentHideAndShow = () => {};

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

        <TouchableOpacity style={styles.tombolSubmit} onPress={this.onSubmit}>
          <Text style={styles.textSubmit}>SUBMIT</Text>
        </TouchableOpacity>

        {
          // Display the modal in screen when state object "modal" is true.
          // Hide the modal in screen when state object "modal" is false.
          this.state.content ? (
            <Modal visibility={true} message="Data berhasil diupdate" />
          ) : null
        }
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

import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {Component} from 'react';

import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
  LogBox,
  Alert,
  RefreshControl,
  FlatList,
} from 'react-native';
import {CardKontak, Modal} from '../../components';
import FIREBASE from '../../config/FIREBASE';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kontaks: {},
      kontaksKey: [],
      refresh: false,
    };
  }

  componentDidMount() {
    this.ambilData();
  }

  ambilData = () => {
    FIREBASE.database()
      .ref('Kontak')
      .once('value', querySnapShot => {
        var li = [];
        querySnapShot.forEach(child => {
          li.push({
            key: child.key,
            nama: child.val().nama,
            nomorHp: child.val().nomorHp,
            alamat: child.val().alamat,
          });
        });
        this.setState({kontaksKey: li});
      });
  };

  removeData = id => {
    Alert.alert(
      'Info',
      'Anda yakin akan menghapus data kontak?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            FIREBASE.database()
              .ref('Kontak/' + id)
              .remove();

            Alert.alert('Hapus', 'Suskses hapus data');

            this.ambilData();
          },
        },
      ],
      {cancleable: false},
    );
  };

  render() {
    const {kontaks, kontaksKey} = this.state;

    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Daftar Kontak</Text>
          <View style={styles.garis} />
        </View>

        {/* <View style={styles.listKontak}>
          {kontaksKey.length > 0 ? (
            kontaksKey.map(key => (
              <CardKontak
                key={key}
                kontakItem={kontaks[key]}
                id={key}
                {...this.props}
                removeData={this.removeData}
              />
            ))
          ) : (
            <Text>Daftar Kosong</Text>
          )}
        </View> */}

        <FlatList
          style={{flex: 1, marginTop: 10}}
          data={this.state.kontaksKey}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => {
                console.log('refreshing');
                this.ambilData();
                this.setState({refresh: false});
              }}
            />
          }
          renderItem={({item, index}) => (
            // <TouchableOpacity
            //   style={styles.listItem}
            //   onPress={() =>
            //     ToastAndroid.show(
            //       item.namaBarang + ' ditekan',
            //       ToastAndroid.LONG,
            //     )
            //   }>
            //   <Text style={{color: '#ffffff', fontSize: 18}}>
            //     {item.namaBarang}
            //   </Text>
            //   <Text style={{color: '#ffffff'}}>{item.harga}</Text>
            // </TouchableOpacity>

            <View style={styles.listKontak}>
              {kontaksKey.length > 0 ? (
                <CardKontak
                  key={item.key}
                  kontakItem={item}
                  id={item.key}
                  {...this.props}
                  removeData={this.removeData}
                />
              ) : (
                <Text>Daftar Kosong</Text>
              )}
            </View>
          )}
          keyExtractor={item => item.key}
        />

        <View style={styles.wrapperButton}>
          <TouchableOpacity
            style={styles.btnTambah}
            onPress={() => this.props.navigation.navigate('TambahKontak')}>
            <FontAwesomeIcon icon={faPlus} size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  garis: {
    borderWidth: 1,
    marginTop: 10,
  },
  wrapperButton: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 30,
  },
  btnTambah: {
    padding: 20,
    backgroundColor: 'skyblue',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  listKontak: {
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
});

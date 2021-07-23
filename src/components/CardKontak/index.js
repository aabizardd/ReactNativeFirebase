import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CardKontak = ({id, kontakItem, navigation, removeData}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('DetailKontak', {id: id})}>
      <View>
        <Text style={styles.nama}>{kontakItem.nama}</Text>
        <Text style={styles.noHP}>Nomor HP : {kontakItem.nomorHp}</Text>
      </View>

      <View style={styles.icon}>
        <FontAwesomeIcon
          icon={faEdit}
          color={'orange'}
          size={20}
          style={styles.font_icon}
          onPress={() => navigation.navigate('EditKontak', {id: id})}
        />
        <FontAwesomeIcon
          icon={faTrash}
          color={'red'}
          size={20}
          style={styles.font_icon}
          onPress={() => removeData(id)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CardKontak;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  nama: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  noHP: {
    fontSize: 12,
    color: 'grey',
  },
  icon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  font_icon: {
    marginLeft: 5,
  },
});

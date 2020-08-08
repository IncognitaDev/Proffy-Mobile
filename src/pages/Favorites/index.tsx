import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import PageHeader from '../../components/PageHeader';
import AssyncStorage from '@react-native-community/async-storage'
import {useFocusEffect} from '@react-navigation/native'

import styles from './styles';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

const favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([])

  function loadFavorites() {
    AssyncStorage.getItem('favorites').then(response => {
      if(response){
        const favoritedTeachers = JSON.parse(response)

        setFavorites(favoritedTeachers)
      }
    })
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  )

  return( 
    <View style={styles.container}>
      <PageHeader title='Meus Proffys favoritos'/>
      <ScrollView 
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
      {favorites.map((teacher: Teacher) => {
        return (
          <TeacherItem 
            key={teacher.id} 
            teacher={teacher} favorited/>
          )
      })}
      </ScrollView>
    </View>
  );
}

export default favorites;
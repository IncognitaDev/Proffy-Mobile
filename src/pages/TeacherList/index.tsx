import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import AssyncStorage from '@react-native-community/async-storage'

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api'
import { useFocusEffect } from '@react-navigation/native';

const TeacherList: React.FC = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)
  const [teachers, setTeachers] = useState([])
  const [favorites, setFavorites] = useState<number[]>([])

  const [subject, setSubject] = useState('')
  const [week_day, setWeek_day] = useState('')
  const [time, setTime] = useState('')

  function loadFavorites() {
    AssyncStorage.getItem('favorites').then(response => {
      if(response){
        const favoritedTeachers = JSON.parse(response)
        const favoritedTeachersIds = favoritedTeachers.map( (teacher : Teacher) => {
          return teacher.id
        })

        setFavorites(favoritedTeachersIds)
      }
    })
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  )

  function handleToggleFilterVisible(){
    setIsFiltersVisible(!isFiltersVisible)
  }

  function handleSubmit(){
    loadFavorites()
    api.get('classes', {
      params:{
        subject,
        week_day,
        time,
      }
    }).then(response => {
      setTeachers(response.data)
      handleToggleFilterVisible()
    })
  }

  return( 
    <View style={styles.container}>
      <PageHeader title='Proffys Disponíveis' headerRight={(
        <BorderlessButton onPress={handleToggleFilterVisible}>
          <Feather name='filter' size={20} color='#fff'/>
        </BorderlessButton>
      )}>
        {isFiltersVisible && (
           <View style={styles.searchForm}>
            <Text style={styles.label}>Materia</Text>
            <TextInput 
              style={styles.input} 
              placeholderTextColor='#c1bccc'
              onChangeText={text => setSubject(text)}
              value={subject}
              placeholder='Qual a Materia'
            />

            <View style={styles.inputGroup} >
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput 
                  style={styles.input} 
                  placeholderTextColor='#c1bccc'
                  onChangeText={text => setWeek_day(text)}
                  value={week_day}
                  placeholder='Qual o dia'
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horario</Text>
                <TextInput 
                  style={styles.input} 
                  placeholderTextColor='#c1bccc'
                  onChangeText={text => setTime(text)}
                  value={time}
                  placeholder='Qual o Horario'
                />
              </View>
            </View>
            <RectButton onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText} >Filter</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

    <ScrollView 
      style={styles.teacherList}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 16,
      }}
    >
      {teachers.map((teacher: Teacher) => {
        return (
        <TeacherItem 
          key={teacher.id} 
          teacher={teacher} favorited={favorites.includes(teacher.user_id)}/>
        )
      })}
    </ScrollView>

    </View>
  );
}

export default TeacherList;
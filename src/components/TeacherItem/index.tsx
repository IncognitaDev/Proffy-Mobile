import React, { useState } from 'react';
import { View , Image, Text, Linking} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import hearOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'
import api from '../../services/api'

import styles from './styles';


export interface Teacher {
  id: number,
  avatar: string,
  bio: string,
  cost: number,
  name: string,
  subject: string,
  whatsapp: string, 
  user_id: number
}

interface TeacherItemProps {
  teacher: Teacher,
  favorited: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher , favorited}) => {
  const [isfavorited , setIsFavorited] = useState(favorited)

  function handleSendMessage() {

    api.post('connections', {
      user_id: teacher.user_id
    })

    Linking.openURL(`whatsapp://send?&phone=55${teacher.whatsapp}`)
  }

  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem('favotites')

    let favoritesArray =[]

    if (favorites) {
      favoritesArray = JSON.parse(favorites)
    }

    if (isfavorited) {
      const favoritedIndex = favoritesArray.findIndex((teacherItem : Teacher) => {
        return teacherItem.id === teacher.id
      })

      favoritesArray.splice(favoritedIndex, 1)
      setIsFavorited(false)
    }else {

      favoritesArray.push(teacher)
      setIsFavorited(true)
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
          style={styles.avatar}
          source={{uri: teacher.avatar}}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Proço/Hora {'  '} 
        <Text style={styles.priceValue} >{teacher.cost}</Text>
        </Text>

        <View style={styles.buttonContainer}>
          <RectButton  
            onPress={handleToggleFavorite} 
            style={[
              styles.favoriteButton,
              isfavorited ? styles.favorited : {},
            ]}
          >
            {isfavorited 
              ? <Image source={unfavoriteIcon}/> 
              : <Image source={hearOutlineIcon}/>
            }
            
          </RectButton>
          <RectButton style={styles.contactButton}>
           <Image source={whatsappIcon}/>
           <Text onPress={handleSendMessage} style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>

    </View>
  );
}

export default TeacherItem;
import React from 'react';
import { View , ImageBackground, Text} from 'react-native';

import giveClassesBgImage from '../../assets/images/give-classes-background.png'

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const GiveClasses: React.FC = () => {
  const { goBack } = useNavigation()

  function handleNavigateBack() {
    goBack()
  }

  return (
    <View style={styles.container}>
      <ImageBackground 
        resizeMode='contain' 
        source={giveClassesBgImage} 
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um proffy?</Text>
        <Text style={styles.description}>Para começar, você precisa se cadastrar como professor na nossa plataforma web.</Text>

      </ImageBackground>

      <RectButton onPress={handleNavigateBack} style={styles.okButton}>
        <Text style={styles.okButtonText}>Vamos lá</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;
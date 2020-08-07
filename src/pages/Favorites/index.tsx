import React from 'react';
import { View } from 'react-native';
import PageHeader from '../../components/PageHeader';

import styles from './styles';

const favorites: React.FC = () => {
  return( 
    <View style={styles.container}>
      <PageHeader title='Meus Proffys favoritos'/>
    </View>
  );
}

export default favorites;
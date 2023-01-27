import React from 'react'
import { View, Text,TouchableOpacity} from 'react-native'
import { styles } from './styles'

export const Stat = (props: any) => {

  const { label, value,onPress } = props;

  return (
    <TouchableOpacity style={styles.stat} 
    onPress={onPress}>
      <Text style={{ ...styles.statText }}>
        {value}
      </Text>
      <View style={styles.statHold}>
        <Text style={{ ...styles.statLabel }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default Stat;
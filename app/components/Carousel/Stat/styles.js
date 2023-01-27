import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  stat: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
    flexBasis: '7%',
    flex: 1,
    maxWidth: '7%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    //width:'10%'
  },
  statText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
  },
  statHold: {
    width: '100%',
    marginBottom: 8,
  },
  statLabel: {
    width: '100%',
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
    paddingTop: 5,
  },
});

export default styles;
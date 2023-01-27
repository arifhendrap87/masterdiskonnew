// React Native Example to Take Screenshot Programmatically
// https://aboutreact.com/take-screenshot-programmatically/

// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

// import CaptureScreen
import {captureScreen} from 'react-native-view-shot';

const ScreenShotFile = (props) => {
  const [imageURI, setImageURI] = useState(
    props.file,
  );
  const [savedImagePath, setSavedImagePath] = useState('');

  const takeScreenShot = () => {
    // To capture Screenshot
    captureScreen({
      // Either png or jpg (or webm Android Only), Defaults: png
      format: 'jpg',
      // Quality 0.0 - 1.0 (only available for jpg)
      quality: 0.8, 
    }).then(
      //callback function to get the result URL of the screnshot
      (uri) => {
        setSavedImagePath(uri);
        setImageURI(uri);
      },
      (error) => console.error('Oops, Something Went Wrong', error),
    );
  };

  return (
    <View style={[styles.container]}>
      
      <TouchableOpacity
        style={styles.button}
        onPress={takeScreenShot}>
        <Text style={styles.text}>
          Download Files
        </Text>
      </TouchableOpacity>
      <Text style={styles.textStyle}>
          {
             savedImagePath ?
             `Saved Image Path\n ${savedImagePath}` : ''
           }
         </Text>
    </View>

    // <SafeAreaView style={{flex: 1}}>
    //   <View style={styles.container}>
        
    //     <TouchableOpacity
    //       style={styles.buttonStyle}
    //       onPress={takeScreenShot}>
    //       <Text style={styles.buttonTextStyle}>
    //         Take Screenshot
    //       </Text>
    //     </TouchableOpacity>
    //     {/* <Text style={styles.textStyle}>
    //       {
    //         savedImagePath ?
    //         `Saved Image Path\n ${savedImagePath}` : ''
    //       }
    //     </Text> */}
    //   </View>
    // </SafeAreaView>
  );
};

export default ScreenShotFile;

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal:20
    
  },
  button: {
    width: '100%',
    padding: 10,
    backgroundColor: 'orange',
    //margin: 10,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
  },
});
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { DataMasterDiskon } from "@data";
import { mapDarkStyle, mapStandardStyle } from "../../data/dataMap";
//import FormSearch from "../../components/FormSearch";
// import StarRating from '../components/StarRating';

import { useTheme } from '@react-navigation/native';
import GetLocation from 'react-native-get-location'
import Geocoder from 'react-native-geocoding';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const TravelBuddy = () => {
  const theme = useTheme();


  const [categories, setCategories] = useState([
    {
      name: 'Fastfood Center',
      icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
    },
    {
      name: 'Restaurant',
      icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
    },
    {
      name: 'Dineouts',
      icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />,
    },
    {
      name: 'Snacks Corner',
      icon: <MaterialCommunityIcons name="food" style={styles.chipsIcon} size={18} />,
    },
    {
      name: 'Hotel',
      icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
    },
  ])
  const [region, setRegion] = useState({
    "latitude": -6.2909691,
    "latitudeDelta": 0,
    "longitude": 106.8024214,
    "longitudeDelta": 0
  });
  const [keyApiGoogle] = useState(DataMasterDiskon[0].keyApiGoogle);
  const [defType, setDefType] = useState('restaurant');
  const [defRadius, setDefRadius] = useState(100);


  const [markers, setMarkers] = useState([
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": -6.290943,
          "lng": 106.802543
        },
        "viewport": {
          "northeast": {
            "lat": -6.289662419708497,
            "lng": 106.8039980802915
          },
          "southwest": {
            "lat": -6.292360380291502,
            "lng": 106.8013001197085
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      "icon_background_color": "#7B9EB0",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      "name": "Lembaga Amil Zakat Mizan Amanah",
      "opening_hours": {
        "open_now": true
      },
      "place_id": "ChIJw9PzZqfxaS4Rtrsuuo9m_Hs",
      "plus_code": {
        "compound_code": "PR53+J2 West Cilandak, South Jakarta City, Jakarta, Indonesia",
        "global_code": "6P58PR53+J2"
      },
      "reference": "ChIJw9PzZqfxaS4Rtrsuuo9m_Hs",
      "scope": "GOOGLE",
      "types": [
        "point_of_interest",
        "establishment"
      ],
      "vicinity": "Jalan Cilandak Tengah No.15, RT.3/RW.1, Cilandak Barat"
    },
  ]);
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {





    mapAnimation.addListener(({ value }) => {

      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(location => {
          // console.log('locationcurrent', JSON.stringify(location));
          locationNameF(location);
          setRegion(regionFrom(location.latitude, location.longitude, defRadius));
          getNearBy(location.latitude, location.longitude);

        })
        .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
        })



      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            },
            350
          );
        }
      }, 10);



    });


    return () => {
    }

  }, []);


  function regionFrom(lat, lon, distance) {
    distance = distance / 2
    const circumference = 40075
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000
    const angularDistance = distance / circumference

    const latitudeDelta = distance / oneDegreeOfLatitudeInMeters
    const longitudeDelta = Math.abs(Math.atan2(
      Math.sin(angularDistance) * Math.cos(lat),
      Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))

    return result = {
      latitude: lat,
      longitude: lon,
      latitudeDelta,
      longitudeDelta,
    }
  }

  function getNearBy(lat, lang) {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lang + "&radius=" + defRadius + "&type=" + defType + "&key=" + keyApiGoogle;
    console.log('urlnearby', url);
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('getNearBy', JSON.stringify(result));
        setMarkers(result.results);

      })
      .catch(error => console.log('error', error));
  }


  function locationNameF(location) {
    console.log('locationName', JSON.stringify(location));
    Geocoder.init("AIzaSyC_O0-LKyAboQn0O5_clZnePHSpQQ5slQU");
    Geocoder.from(location.latitude, location.longitude)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        console.log('locationlat', JSON.stringify(json));
        console.log('addressComponent', JSON.stringify(addressComponent));
        //this.setState({ locationName: addressComponent });
        setLocationName(addressComponent);
      })
      .catch(error => {
        console.log('errorlocationName', JSON.stringify(error))
      });
  }


  const interpolations = markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20);
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  }

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
      >
        {markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                {/* <Animated.Image
                  source={require('../assets/map_marker.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                /> */}
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
        />
        <Ionicons name="ios-search" size={20} />
      </View>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{ // iOS only
          top: 0,
          left: 0,
          bottom: 0,
          right: 20
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0
        }}
      >
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.chipsItem}>
            {category.icon}
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            {/* <Image
              source={marker.image}
              style={styles.cardImage}
              resizeMode="cover"
            /> */}
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>{marker.name}</Text>
              {/* <StarRating ratings={marker.rating} reviews={marker.reviews} /> */}
              <Text numberOfLines={1} style={styles.cardDescription}>{marker.vicinity}</Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => { }}
                  style={[styles.signIn, {
                    borderColor: '#FF6347',
                    borderWidth: 1
                  }]}
                >
                  <Text style={[styles.textSign, {
                    color: '#FF6347'
                  }]}>Order Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default TravelBuddy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: "row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});
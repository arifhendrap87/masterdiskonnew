import React, { Component } from "react";
import { View, ScrollView,Text,TouchableOpacity,AsyncStorage,StyleSheet,FlatList } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    BookingTime,
    Tag,
    FlightPlan,
    FormOption,
    QuantityPicker,
    Button
} from "@components";
// import styles from "./styles";
import { Image,EventCard} from "@components";
import { PromotionData, TourData, HotelData,FeaturedDestination,DataMasterDiskon, DataLoading } from "@data";
import {PostDataProduct} from '../../services/PostDataProduct';
//import { cos } from "react-native-reanimated";
const styles = StyleSheet.create({
    contain: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingTop: 20,
        marginBottom: 10,
        width: "100%"
    },
    flightType: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        alignItems: "center",textAlignVertical: "center",textAlign: "center"
    },
    contentRow: { flexDirection: "row", marginTop: 20 },
    centerView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    colCenter: { flex: 1, alignItems: "center" },

    contentPickDate: {
        // flexDirection: "row",
        // justifyContent: "space-between",
        borderRadius: 8,
        borderWidth: 3,
        borderColor: BaseColor.fieldColor,
        // backgroundColor: BaseColor.fieldColor,
        flex: 6,
        padding: 10,
    },
    itemPick: {
        flex: 4,
        justifyContent: "center"
    },
    linePick: {
        width: 1,
        backgroundColor: BaseColor.dividerColor,
        marginRight: 10
    },
    contentModal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    contentCalendar: {
        borderRadius: 8,
        width: "100%",
        backgroundColor: "white"
    },
    contentActionCalendar: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15
    },
      contentActionBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25
    },
    
    contentHiking: {
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 10
    },
});
  
export default class HotelSearch extends Component {
    constructor(props) {
        super(props);

        const id_dari = '';
        const id_tujuan = '';
        var tglAwal=this.getDate(2);
        var tglAkhir=this.getDate(3);

        this.state = {
            login:true,
            round: true,
            dewasa:'2',
            anak:'1',
            bayi:'0',
            qty:'1',
            tglAwal:tglAwal,
            tglAkhir:tglAkhir,
        
            listdata_destination:DataLoading,
            listdata_rekomendation:DataLoading,
            listdata_package:DataLoading,
            
            loading_destination:true,
            
            DataMasterDiskon:DataMasterDiskon[0],
            
            cityId:'5171',
            cityText:'Denpasar',
            cityProvince:'Bali'
         
        };

        this.setJumlahDewasa = this.setJumlahDewasa.bind(this);
        this.setJumlahAnak = this.setJumlahAnak.bind(this);
        this.setJumlahBayi = this.setJumlahBayi.bind(this);
        this.setBookingTime = this.setBookingTime.bind(this);
        this.setCity = this.setCity.bind(this);
        this.setqty=this.setqty.bind(this);

    }

    setCity(id,city,province) {
            this.setState({cityId:id});
            this.setState({cityText:city});
            this.setState({cityProvince:province});
    }

    setBookingTime(tglAwal, tglAkhir) {
        if (this.state.round ==true) {
            this.setState({tglAwal:tglAwal});
            this.setState({tglAkhir:tglAkhir});
          
        } else {
            this.setState({tglAwal:tglAwal});
            this.setState({tglAkhir:null});
        }
    }
  
    getDate(num){
        var MyDate = new Date();
        var MyDateString = '';
        MyDate.setDate(MyDate.getDate());
        var tempoMonth = (MyDate.getMonth()+1);
        var tempoDate = (MyDate.getDate()+num);
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;

        return MyDate.getFullYear()  + '-' +  tempoMonth  + '-' +  tempoDate;

    }
    onSetFlightType(round) {
        this.setState({
            round: round
        });
    }

    convertDate(date){
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        return days[d.getDay()]+", "+d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
    }
    
    
    setDate(date) {
    
        var date = new Date(date);
        var tempoMonth = (date.getMonth()+1);
        var tempoDate = (date.getDate());
        var finaldate="";
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;
    
        return finaldate = date.getFullYear()  + '-' +  tempoMonth  + '-' +  tempoDate;
    };
    
    onSubmit() {
      

        var cityId=this.state.cityId;
        var checkin=this.state.tglAwal;
        var checkout=this.state.tglAkhir;
        var adults=this.state.dewasa;
        var children=this.state.anak;
        var qty=this.state.qty;
        
        var tgl_akhir='';
        if(this.state.round==true){
            tgl_akhir=this.state.tglAkhir;
        }
        
        var param = {
            "Origin":'',
            "Destination":'',
            "DepartureDate":this.setDate(this.state.tglAwal),
            "Adults":this.state.dewasa,
            "Children":this.state.anak,
            "Infants":this.state.bayi,
            "ReturnDate":tgl_akhir,
            "IsReturn":true,
            "CabinClass":[],
            "CorporateCode":"",
            "Subclasses":false,
            "Airlines": [],
            "Qty":this.state.qty
            }
            //console.log('param',JSON.stringify(param));
    
            var paramOther={
            "bandaraAsalLabel":'',
            "bandaraTujuanLabel":'',
            "type":'hotel'
            }
            
            //console.log('paramOther',JSON.stringify(paramOther));
    
    
    
        
        var paramUrl='checkin='+checkin+'&checkout='+checkout+'&adults='+adults+'&children='+children+'&room='+qty;
        //console.log('paramHotale',param);
        this.props.navigation.navigate('Hotel',
        {
            city:cityId,
            paramUrl:paramUrl,
            param:param,
            paramOther:paramOther
        });


    }
    
    
    // getSearchHotel(){
    //     this.setState({ loading_hotels: true }, () => {
    //         PostDataProduct('hotel/search?city=5171&checkin=2020-06-15&checkout=2020-06-16&adults=1&children=0&room=1')
    //              .then((result) => {
    //                 this.setState({loading_hotels: false });
    //                  //this.setState({listdata_trip_dunia: result});
    //                  //console.log('loading_hotels',JSON.stringify(result));
    //                  var destination=result.destination;
    //                  var top=result.top;
    //                  //var package=result.package;
                     
                     
    //                 this.setState({loading_destination:false});
    //                 this.setState({loading_top:false});
    //                 //this.setState({loading_package:false});
                    
    //                 this.setState({listdata_destination:destination});
    //                 this.setState({listdata_top:top});
    //                 //this.setState({})
                     
    //              },
    //              (error) => {
    //                  this.setState({ error });
    //              }
    //          ); 
    //     });

    //  }
    
    getHotels(){
        this.setState({ loading_hotels: true }, () => {
            PostDataProduct('hotel/index_app')
                 .then((result) => {
                    this.setState({loading_hotels: false });
                     //this.setState({listdata_trip_dunia: result});
                     //console.log('loading_hotels',JSON.stringify(result));
                     var destination=result.destination;
                     var top=result.top;
                     //var package=result.package;
                     
                     
                    this.setState({loading_destination:false});
                    this.setState({loading_top:false});
                    //this.setState({loading_package:false});
                    
                    this.setState({listdata_destination:destination});
                    this.setState({listdata_top:top});
                    //this.setState({})
                     
                 },
                 (error) => {
                     this.setState({ error });
                 }
             ); 
        });

     }

    
    
    componentDidMount() {
        //this.getHotels();
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                this.setState({login:true});
             }else{
                this.setState({login:false});

             }
        });

    }
    


    setJumlahDewasa(jml){
        //console.log(jml);
          this.setState({dewasa:jml});
    }

    setJumlahAnak(jml){
        //console.log(jml);
        this.setState({anak:jml});
    }

    setJumlahBayi(jml){
        //console.log(jml);
        this.setState({bayi:jml});
    }
    
    setqty(jml){
        //console.log(jml);
        this.setState({qty:jml});
    }
    
    render() {
        const { round, from, to, loading,login  } = this.state;
        const { navigation } = this.props;
    
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Cari Hotel"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />
                {
                    login ?
                <ScrollView style={styles.contain}>
                    
                   
                                <View  style={{ flexDirection: "row",paddingBottom:20}}>
                                    <View style={styles.contentPickDate}>
                                        <TouchableOpacity
                                            
                                            onPress={() => this.props.navigation.navigate('SelectCity',{setCity:this.setCity,selected:this.state.cityId})}
                                        >
                                            <Text caption2 light style={{ marginBottom: 5 }}>
                                                Destination
                                            </Text>
                                            <Text caption1 semibold>
                                                {this.state.cityText} - {this.state.cityProvince} 
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                
                                <View  style={{ flexDirection: "row" }}>
                                    <View style={styles.contentPickDate}>
                                        <TouchableOpacity
                                            
                                            onPress={() => this.props.navigation.navigate('DatePickerRange',{setBookingTime:this.setBookingTime,round:this.state.round})}
                                        >
                                            <Text caption2 light style={{ marginBottom: 5 }}>
                                                Check In
                                            </Text>
                                            <Text caption1 semibold>
                                                {this.convertDate(this.state.tglAwal)}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contentPickDate}>   
                                        <TouchableOpacity
                                           
                                            onPress={() => this.props.navigation.navigate('DatePickerRange',{setBookingTime:this.setBookingTime,round:this.state.round})}
                                        >
                                            <Text caption2 light style={{ marginBottom: 5 }}>
                                                Check Out
                                            </Text>
                                            <Text caption1 semibold>
                                            {this.convertDate(this.state.tglAkhir)}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                
                                
                          
                    <View style={{ marginTop: 20, flexDirection: "row" }}>
                        <QuantityPicker
                            label="Adults"
                            detail=">= 12 years"
                            value={this.state.dewasa}
                            setJumlahDewasa={this.setJumlahDewasa}
                            typeOld="1"
                        />


                        <QuantityPicker
                            label="Children"
                            detail="2 - 12 years"
                            value={this.state.anak}
                            style={{ marginHorizontal: 15 }}
                            setJumlahAnak={this.setJumlahAnak}
                            typeOld="2"
                        />
                        <QuantityPicker
                            label="Rooms"
                            detail=""
                            value={this.state.qty}
                            setJumlahBayi={this.setqty}
                            typeOld="3"
                        />
                    </View>

                    <Button
                        full
                        loading={loading}
                        style={{
                                borderRadius: 18,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                                marginTop:20
                            }}
                        onPress={() => {  
                            this.onSubmit();
                           
                        }}
                    >
                        Search
                    </Button>
                    
                            <View style={styles.contentHiking}>
                                    <Text caption2 semibold>
                                        Destination
                                    </Text>
                            </View>
                            <View>
                                <FlatList
                                    contentContainerStyle={{
                                        paddingRight: 20
                                    }}
                                    horizontal={true}
                                    data={this.state.listdata_destination}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({ item, index }) => (
                                       
                                        <EventCard
                                            image={item.city_image}
                                            url={this.state.DataMasterDiskon.site+'assets/upload/destination/city/'}
                                            title={item.city_name}
                                            time={item.listing+' listing'}
                                            location={item.city_slug}
                                            onPress={() =>
                                                navigation.navigate("PostDetail",{item:item})
                                            }
                                            style={{ marginLeft: 20 }}
                                            loading={this.state.loading_destination}
                                        />
                                    )}
                                />
                            </View>
                            
                            
                            <View style={styles.contentHiking}>
                                    <Text caption2 semibold>
                                    Recomendation
                                    </Text>
                            </View>
                            <View>
                                <FlatList
                                    contentContainerStyle={{
                                        paddingRight: 20
                                    }}
                                    horizontal={true}
                                    data={this.state.listdata_top}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({ item, index }) => (
                                       
                                        <EventCard
                                            image={item.img_featured}
                                            url={this.state.DataMasterDiskon.site+'assets/upload/product/hotel/img/featured/'}
                                            title={item.name_hotel}
                                            time={item.city_name}
                                            location={item.city_slug}
                                            onPress={() =>
                                                navigation.navigate("PostDetail",{item:item})
                                            }
                                            style={{ marginLeft: 20 }}
                                            loading={this.state.loading_destination}
                                        />
                                    )}
                                />
                            </View>
                </ScrollView>

                :

                <View
                style={{flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',padding: 20}}
                >       
                <Image
                    source={Images.login}
                    style={{ width: "60%", height: "60%" }}
                    resizeMode="cover"
                />
                <View><Text>Anda Belum Login</Text></View>
                <Button
                            full
                            
                            loading={this.state.loading}
                            onPress={() => navigation.navigate("SignIn",{redirect:'HotelSearch'})}
                        >
                            Sign In
                        </Button>
                <View style={styles.contentActionBottom}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("SignUp")}
                            >
                                <Text caption1 grayColor>
                                    Haven’t registered yet?
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("SignUp")}
                            >
                                <Text caption1 primaryColor>
                                    Join Now
                                </Text>
                            </TouchableOpacity>
                        </View>
            </View>
    }

                {/* <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                    <Button
                        full
                        loading={loading}
                        style={{
                                borderRadius: 18,
                                // backgroundColor: BaseColor.fieldColor,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5}}
                        onPress={() => {  
                            this.onSubmit();
                            // this.setState({ loading: true }, () => {
                            //     setTimeout(() => {
                            //         this.onSubmit();
                            //         //navigation.navigate("FlightResult");
                            //         this.setState({ loading: false });
                            //     }, 50);
                            // });
                        }}
                    >
                        Search
                    </Button>
                </View> */}
            </SafeAreaView>
        );
    }
}

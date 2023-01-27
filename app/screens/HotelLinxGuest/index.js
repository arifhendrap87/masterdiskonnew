import React, { Component } from "react";
import {
    View,
    FlatList,
    TextInput,
    TouchableOpacity
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Image, Button } from "@components";
import SetPenumpang from "../../components/SetPenumpang";
import QuantityPickerHorizontal from "../../components/QuantityPickerHorizontal";
import QuantityPickerHorizontalUmur from "../../components/QuantityPickerHorizontalUmur";

import NumericInput from 'react-native-numeric-input'
export default class HotelLinxGuest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomMultiParam: props.navigation.state.params.roomMultiParam,
            roomMultiCountRoom: props.navigation.state.params.roomMultiCountRoom,
            roomMultiGuest: props.navigation.state.params.roomMultiGuest,
            roomUrut: props.navigation.state.params.roomMultiParam.length
        };
        console.log('roomMultiParam', JSON.stringify(props.navigation.state.params.roomMultiParam));
        this.setJumlahDewasa = this.setJumlahDewasa.bind(this);
        this.setJumlahAnak = this.setJumlahAnak.bind(this);
        this.setUmur1 = this.setUmur1.bind(this);
        this.setUmur2 = this.setUmur2.bind(this);
    }

    addRoom(roomUrut) {

        var urutBaru = parseInt(roomUrut) + 1;
        this.setState({ roomUrut: urutBaru });
        roomMultiParam = this.state.roomMultiParam;
        if (this.state.roomMultiParam.length < 3) {
            var data = {
                id: urutBaru,
                dewasa: 2,
                anak: 0,
                bayi: 0,
                umurAnakKe1: 0,
                umurAnakKe2: 0,
                umurAnak: ""
            };
            roomMultiParam.push(data);
            this.setState({ roomMultiParam: roomMultiParam });
        }

    }
    delete(id) {
        someArray = this.state.roomMultiParam;
        if (this.state.roomMultiParam.length != 1) {
            newArray = [];
            someArray.map(function (obj, index) {
                if (obj.id !== id) {
                    newArray.push(obj);
                }
            });
            someArray = newArray;
            this.setState({ roomMultiParam: someArray });
        }
    }


    setJumlahDewasa(jml, id) {
        const newProjects = this.state.roomMultiParam.map(p =>
            p.id === id
                ? {
                    ...p,
                    dewasa: jml,
                }
                : p
        );
        this.setState({ roomMultiParam: newProjects });
    }

    setJumlahAnak(jml, id, type) {

        var newProjects = this.state.roomMultiParam.map(p =>
            p.id === id
                ? {
                    ...p,
                    anak: jml,
                }
                : p
        );
        var jmlAnak = newProjects[parseInt(id) - 1]['anak'];

        for (a = 0; a <= jmlAnak; a++) {

        }
        //console.log(jmlAnak);

        var angkasesudah = jmlAnak;
        if (type == "up") {
            var angkasebelum = jmlAnak - 1;
        } else {
            var angkasebelum = jmlAnak + 1;
        }
        console.log('angkasebelum', angkasebelum);
        console.log('angkasesudah', angkasesudah);
        if (angkasebelum == 0 && angkasesudah == 1) {
            newProjects = newProjects.map(p =>
                p.id === id
                    ? {
                        ...p,
                        umurAnakKe1: 1,
                    }
                    : p
            );


        } else if (angkasebelum == 1 && angkasesudah == 2) {
            if (jmlAnak == 1) {
                newProjects = newProjects.map(p =>
                    p.id === id
                        ? {
                            ...p,
                            umurAnakKe2: 0,
                        }
                        : p
                );
            } else if (jmlAnak == 2) {
                newProjects = newProjects.map(p =>
                    p.id === id
                        ? {
                            ...p,
                            umurAnakKe2: 1,
                        }
                        : p
                );

            }
        } else if (angkasebelum == 2 && angkasesudah == 1) {
            newProjects = newProjects.map(p =>
                p.id === id
                    ? {
                        ...p,
                        umurAnakKe2: 0,
                    }
                    : p
            );

        } else if (angkasebelum == 1 && angkasesudah == 0) {
            newProjects = newProjects.map(p =>
                p.id === id
                    ? {
                        ...p,
                        umurAnakKe1: 0,
                    }
                    : p
            );
        }


        if (jmlAnak <= 2) {
            console.log('newProjects', JSON.stringify(newProjects));
            this.setState({ roomMultiParam: newProjects });
        }


        // setTimeout(() => {
        //     if(jmlAnak <= 2){
        //         console.log('newProjects',JSON.stringify(newProjects));
        //         this.setState({roomMultiParam:newProjects});
        //     }
        // }, 50);





    }

    setUmur1(jml, id, idUmur) {
        console.log(jml + ',' + id + ',' + idUmur);
        var newProjects = this.state.roomMultiParam.map(p =>
            p.id === id
                ? {
                    ...p,
                    umurAnakKe1: jml,
                }
                : p
        );

        this.setState({ roomMultiParam: newProjects });

        setTimeout(() => {
            console.log('roomMultiParam', JSON.stringify(this.state.roomMultiParam));
        }, 50);

        // var jmlAnak=newProjects[parseInt(id)-1]['anak'];
        // if(jmlAnak <= 2){
        //     console.log('newProjects',JSON.stringify(newProjects));
        //     this.setState({roomMultiParam:newProjects});
        // }
    }
    setUmur2(jml, id, idUmur) {
        console.log(jml + ',' + id + ',' + idUmur);
        var newProjects = this.state.roomMultiParam.map(p =>
            p.id === id
                ? {
                    ...p,
                    umurAnakKe2: jml,
                }
                : p
        );

        this.setState({ roomMultiParam: newProjects });
        setTimeout(() => {
            console.log('roomMultiParam', JSON.stringify(this.state.roomMultiParam));
        }, 50);
    }

    setJumlahBayi(jml, id) {
        const newProjects = this.state.roomMultiParam.map(p =>
            p.id === id
                ? {
                    ...p,
                    bayi: jml,
                }
                : p
        );
        this.setState({ roomMultiParam: newProjects });
    }


    updateRoomGuest(id) {
        const newProjects = this.state.roomMultiParam.map(p =>
            p.id === id
                ? {
                    ...p,
                    dewasa: dewasa,
                    anak: anak,
                    bayi: bayi

                }
                : p
        );
        this.setState({ roomMultiParam: newProjects });
    }

    formUmurAnak(numrows, id, umurAnakKe1, umurAnakKe2) {
        let rows = [];
        for (let i = 1; i <= numrows; i++) {

            if (i == 1) {
                rows.push(<QuantityPickerHorizontalUmur
                    style={{}}
                    label={"Umur anak ke " + i}
                    detail=""
                    value={umurAnakKe1}
                    valueMax={false}
                    minPerson={1}
                    setUmur1={this.setUmur1}
                    setUmur2={this.setUmur2}
                    // setJumlahDewasa={this.setJumlahDewasa}
                    // setJumlahAnak={this.setJumlahAnak}
                    // setJumlahBayi={this.setJumlahBayi}
                    id={id}
                    idUmur={i}
                    typeOld={'2'}

                />);
            } else {
                rows.push(<QuantityPickerHorizontalUmur
                    style={{}}
                    label={"Umur anak ke " + i}
                    detail=""
                    value={umurAnakKe2}
                    valueMax={false}
                    minPerson={1}
                    setUmur1={this.setUmur1}
                    setUmur2={this.setUmur2}
                    // setJumlahDewasa={this.setJumlahDewasa}
                    // setJumlahAnak={this.setJumlahAnak}
                    // setJumlahBayi={this.setJumlahBayi}
                    id={id}
                    idUmur={i}
                    typeOld={'2'}

                />);

            }

        }
        return (
            <View>{rows}</View>
        );
    }


    render() {
        const { navigation } = this.props;
        var setRoomMulti = this.props.navigation.state.params.setRoomMulti;

        let { } = this.state;

        let Arr = this.state.roomMultiParam.map((person, i) => {
            return <View style={{
                flexDirection: 'row',
                borderBottomColor: BaseColor.textSecondaryColor,
                borderBottomWidth: 1,
                marginBottom: 10,
            }}>
                <View style={{ flex: 10 }}>
                    <Text style={{ color: BaseColor.primaryColor }}>Data Person</Text>
                    <QuantityPickerHorizontal
                        style={{}}
                        label="Dewasa"
                        detail=">= 12 years"
                        value={person.dewasa}
                        valueMin={1}
                        minPerson={1}
                        setJumlahDewasa={this.setJumlahDewasa}
                        setJumlahAnak={this.setJumlahAnak}
                        setJumlahBayi={this.setJumlahBayi}
                        id={person.id}
                        typeOld={'1'}

                    />

                    <QuantityPickerHorizontal
                        style={{}}
                        label="Anak"
                        detail=">= 12 years"
                        value={person.anak}
                        valueMin={0}
                        valueMax={person.anak <= 1 ? false : true}
                        minPerson={1}
                        setJumlahDewasa={this.setJumlahDewasa}
                        setJumlahAnak={this.setJumlahAnak}
                        setJumlahBayi={this.setJumlahBayi}
                        id={person.id}
                        typeOld={'2'}

                    />


                    {this.formUmurAnak(person.anak, person.id, person.umurAnakKe1, person.umurAnakKe2)}

                </View>
                <View style={{
                    flex: 2, width: 100,
                    flexDirection: "row",
                    justifyContent: 'flex-end',
                    alignItems: "center",
                    right: 0,

                }}>
                    <TouchableOpacity
                        onPress={() => this.delete(person.id)}
                    >
                        <Icon
                            name="trash"
                            size={24}
                            color={BaseColor.grayColor}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        })



        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Tamu Hotel"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.whiteColor}
                            />
                        );
                    }}
                    // renderRight={() => {
                    //     if (loading) {
                    //         return (
                    //             <ActivityIndicator
                    //                 size="small"
                    //                 color={BaseColor.primaryColor}
                    //             />
                    //         );
                    //     } else {
                    //         return (
                    //             <Text caption1 primaryColor>
                    //                 Save
                    //             </Text>
                    //         );
                    //     }
                    // }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                //onPressRight={() => this.onSave()}
                />
                <View style={{ marginHorizontal: 20, marginVertical: 10 }}>

                    {Arr}




                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            style={{ height: 40, width: '50%', borderRadius: 0 }}
                            onPress={() => {
                                this.addRoom(this.state.roomUrut);
                            }}
                        >
                            Tambah Kamar
                                </Button>

                        <Button
                            style={{ height: 40, backgroundColor: BaseColor.primaryColor, width: '50%', borderRadius: 0 }}
                            onPress={() => {
                                //this.addRoom(this.state.roomUrut);
                                setTimeout(() => {
                                    setRoomMulti(this.state.roomMultiParam);
                                    navigation.goBack();
                                }, 50);

                                // console.log(JSON.stringify(this.state.roomMultiParam));
                            }}
                        >
                            <Text style={{ color: BaseColor.whiteColor }}>Simpan</Text>

                        </Button>
                    </View>

                </View>




            </SafeAreaView>
        );
    }
}

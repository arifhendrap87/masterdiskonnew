/**
 * Copyright (c) 2017-present, Wonday (@wonday.org)
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { BaseStyle, BaseColor, Images } from "@config";

import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    Button
} from "@components";

export default class PDFExample extends Component {
    constructor(props) {
        super(props);
        //var bookingDoc = this.props.navigation.state.params.bookingDoc;
        //console.log('bookingDoc', JSON.stringify(bookingDoc));
        this.state = {
            bookingDoc: this.props.navigation.state.params.bookingDoc
        }
    }
    render() {
        const source = { uri: this.state.bookingDoc.eticket, cache: true };
        //const source = require('./test.pdf');  // ios only
        //const source = {uri:'bundle-assets://test.pdf' };
        //const source = {uri:'file:///sdcard/test.pdf'};
        //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
        //const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
        //const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};
        console.log('source', source);
        return (
            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.primaryColor }]}
                forceInset={{ top: "always" }}
            >
                <View style={{ position: 'absolute', backgroundColor: BaseColor.bgColor, flex: 1, height: 45, left: 0, right: 0, bottom: 0 }}></View>

                <Header
                    title="Evoucher"
                    subTitle={''}
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.whiteColor}
                            />
                        );
                    }}


                    onPressLeft={() => {
                        this.props.navigation.goBack();
                    }}




                />
                <View style={{ backgroundColor: BaseColor.bgColor, flex: 1 }}>
                    <View style={styles.container}>
                        <Pdf
                            source={source}
                            // onLoadComplete={(numberOfPages, filePath) => {
                            //   console.log(`Number of pages: ${numberOfPages}`);
                            // }}
                            // onPageChanged={(page, numberOfPages) => {
                            //   console.log(`Current page: ${page}`);
                            // }}
                            // onError={(error) => {
                            //   console.log(error);
                            // }}
                            // onPressLink={(uri) => {
                            //   console.log(`Link pressed: ${uri}`);
                            // }}
                            //onLoadProgress={1}
                            onLoadComplete={(numberOfPages, filePath) => {
                                console.log(`Number of pages: ${numberOfPages}`);
                            }}
                            onPageChanged={(page, numberOfPages) => {
                                console.log(`Current page: ${page}`);
                            }}
                            onError={(error) => {
                                console.log(error);
                            }}
                            onPressLink={(uri) => {
                                console.log(`Link pressed: ${uri}`);
                            }}

                            style={styles.pdf} />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        //alignItems: 'center',
        //marginTop: 25,

    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        top: 0
    }
});
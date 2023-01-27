import React, { Component } from "react";
import { View, TouchableOpacity,StyleSheet,FlatList } from "react-native";
import { Text } from "@components";
import PropTypes from "prop-types";
// import styles from "./styles";
import CardCustom from "../CardCustom";


const styles = StyleSheet.create({
    
});


export default class ListData extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
      }
      
    render() {
        const {
            rowTitle,
            rowSubtitle,
            navigation,
            data,
            style,
            loading,
            widthContent,
            heightImage,
            innerText,
            styleText,
        } = this.props;

        return (
                        <View>
                            <View style={styles.contentHiking}>
                                    <Text title3 semibold>
                                        {rowTitle}
                                    </Text>
                                    <Text caption2 grayColor>
                                        {rowSubtitle}
                                    </Text>
                            </View>
                            <View>
                                <FlatList
                                    contentContainerStyle={{
                                        paddingRight: 20
                                    }}
                                    horizontal={true}
                                    data={data}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({ item, index }) => (
                                        <CardCustom
                                            image={item.featured_image}
                                            url={url}
                                            title={item.title}
                                            subtitle={item.name_blog_category}
                                            onPress={() =>
                                                navigation.navigate("PostDetail",{item:item})
                                            }
                                            style={{ marginLeft: 20 }}
                                            loading={this.state.loading_blog}
                                            widthContent={200}
                                            heightImage={150}
                                            innerText={false}
                                            styleText={{padding: 10,flexDirection: "row"}}
                                        />
                                    )}
                                />
                            </View>
                        </View>

        );
    }
}



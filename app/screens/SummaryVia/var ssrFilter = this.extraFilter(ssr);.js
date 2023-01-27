var ssrFilter = this.extraFilter(ssr);
console.log('ssr', JSON.stringify(ssr));
console.log('ssrFilter', JSON.stringify(ssrFilter));
this.setState({ ssr: ssrFilter });

this.extraFilter(ssrNew);




// {this.contentTambahanBagasi(index + 1)}
// <Text>{index + 1}</Text>

contentTambahanBagasi(index) {
    var num = index;
    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
    var contentTambahanBagasi = <View />
    if (this.state.extra.baggage.length != 0 || this.state.extraBaggage.length != 0) {
        contentTambahanBagasi = <View style={styles.contentProfile}>
            <ProfileDetail
                textFirst={'bagasi' + index}
                textSecond={this.filterValue(this.state.ssr, "num", index.toString() + "-baggage").desc}
                icon={'create-outline'}
                onPress={() => {
                    console.log('contentTambahanBagasi', index);
                    this.setState({ modalTambahanBagasi: true });
                }
                }
                viewImage={false}
                style={{ flex: 10, marginRight: 10 }}
            />
            <Modal
                isVisible={this.state.modalTambahanBagasi}
                onBackdropPress={() => {
                    this.setState({ modalTambahanBagasi: false });
                }}
                onSwipeComplete={() => {
                    this.setState({ modalTambahanBagasi: false });
                }}
                swipeDirection={["down"]}
                style={styles.bottomModal}
            >
                <View style={styles.contentFilterBottom}>

                    <View style={styles.contentSwipeDown}>
                        <View style={styles.lineSwipeDown} />
                    </View>
                    {this.state.extraBaggage.map((item) => (
                        <TouchableOpacity
                            style={styles.contentActionModalBottom}
                            //key={index2}
                            onPress={() => {
                                console.log('itemTambahanBagasi' + num, JSON.stringify(item));
                                // var ssrNew = this.extraUpdate(index.toString() + "-baggage", item);

                                // console.log('ssrNew', JSON.stringify(ssrNew));

                                // this.setState({ ssr: ssrNew });
                                // this.setState({ tambahanBagasi: item });
                                this.setState({ modalTambahanBagasi: false });

                                // setTimeout(() => {
                                //     this.count();
                                // }, 20);

                            }}
                        >

                            <Text>{item.desc}</Text>
                            <Text> {'IDR ' + priceSplitter(item.amount)}</Text>
                        </TouchableOpacity>
                    ))}

                </View>
            </Modal>

        </View>

    }
    return contentTambahanBagasi;
}

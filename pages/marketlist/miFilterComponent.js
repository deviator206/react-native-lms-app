import { Col, Grid, Row, Text } from 'native-base';
import React from 'react';
import { Alert, Modal, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { default as commonStyle } from '../common/commonStyling';
import i18nMessages from '../common/i18n';

export default class miFilterComponent extends React.Component {

    render() {
        const { showModal = false, toggleHandler, applyFilterHandler, resetFilterHandler } = this.props;
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={showModal}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{ width: '100%', height: "100%" }}>
                    <View style={commonStyle.modalHeaderDiv}>
                        <View><Text note style={commonStyle.modalHeader}> Filter View Leads </Text></View>
                        <View>
                            <TouchableHighlight
                                onPress={() => {
                                    if (toggleHandler) {
                                        toggleHandler()
                                    }
                                }}>
                                <Icon name="close" style={commonStyle.modalCloseBtn} />
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{ flex: 1, padding: 20 }}>
                        <Grid style={commonStyle.formGrid}>
                            <Row style={commonStyle.formGridLabel}>
                                <Col>
                                    <Text note style={commonStyle.labelStyling}>{i18nMessages.status}</Text>
                                </Col>
                                <Col>
                                    <Text note style={commonStyle.labelStyling}>{i18nMessages.tenure_lbl}</Text>
                                </Col>
                            </Row>
                            <Row style={commonStyle.formGridValue}>
                                <Col>
                                    <Text>Status dropdown</Text>
                                </Col>
                                <Col>
                                    <Text>Tenure dropdown</Text>
                                </Col>
                            </Row>

                            <Row style={commonStyle.formGridLabel}>
                                <Col>
                                    <Text note style={commonStyle.labelStyling}>{i18nMessages.location}</Text>
                                </Col>
                            </Row>
                            <Row style={commonStyle.formGridValue}>
                                <Col><Text>Country AND State dropdown</Text></Col>
                            </Row>


                            <Row style={commonStyle.formGridLabel}>
                                <Col>
                                    <Text note style={commonStyle.labelStyling}>{i18nMessages.bu_selection}</Text>
                                </Col>
                            </Row>
                            <Row style={commonStyle.formGridValue}>
                                <Col><Text>BU and Rep dropdown</Text></Col>
                            </Row>
                            <Row style={commonStyle.formGridLabel}>
                                <Col>
                                    <Text note style={commonStyle.labelStyling}>{i18nMessages.industry}</Text>
                                </Col>
                            </Row>
                            <Row style={commonStyle.formGridValue}>
                                <Col><Text>Industry dropdown</Text></Col>
                            </Row>


                            <Row style={commonStyle.formGridLabel}>
                                <Col>
                                    <Text note style={commonStyle.labelStyling}>{i18nMessages.source_type}</Text>
                                </Col>
                            </Row>
                            <Row style={commonStyle.formGridValue}>
                                <Col><Text>source dropdown</Text></Col>
                            </Row>
                        </Grid>
                    </View>

                    <View style={commonStyle.modalFooter}>
                        <View style={commonStyle.modalButtonContent}>
                            <View style={{ width: "40%" }}>
                                <TouchableHighlight
                                    onPress={() => {
                                        if (resetFilterHandler) {
                                            resetFilterHandler();
                                        }
                                    }}>
                                    <Text style={[commonStyle.modalTwoButtons, commonStyle.secondaryButton]}>Reset</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={{ width: "40%" }}>
                                <TouchableHighlight
                                    onPress={() => {
                                        if (applyFilterHandler) {
                                            applyFilterHandler();
                                        }
                                    }}>
                                    <Text style={[commonStyle.modalTwoButtons, commonStyle.primaryButton]}>Apply</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </View>

            </Modal>
        )

    }
}




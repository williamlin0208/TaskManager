import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';

import { Detail, Accept, HandIn } from './buttons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const TaskItem = (props) => {
    onAcceptTaskPress = () => {
        props.onAcceptTaskPress(props.task);
    };

    onHandInPress = () => {};

    const form = props.form == 'block' ? styles.c3 : styles.c1;
    const flexstyle = props.form == 'block' ? styles.flexleft : styles.flexcenter;

    const buttons = () => {
        buttonRight = () => {
            switch (props.state) {
                case 'Unaccepted':
                    return <Accept task={props.task} onAcceptTaskPress={onAcceptTaskPress} />;
                case 'done':
                    return (
                        <View style={styles.fakebutton}>
                            <Text>未審查</Text>
                        </View>
                    );
                case 'pass':
                    return (
                        <View style={styles.fakebutton}>
                            <Text>通過</Text>
                        </View>
                    );
                case 'fail':
                    return (
                        <View style={styles.fakebutton}>
                            <Text>未通過</Text>
                        </View>
                    );
                case 'claimed':
                    return <HandIn task={props.task} onHandInPress={onHandInPress} />;
                case 'TBD':
                    return (
                        <View style={styles.fakebutton}>
                            <Text>待確認</Text>
                        </View>
                    );
                case 'due':
                    return (
                        <View style={styles.fakebutton}>
                            <Text>已過期</Text>
                        </View>
                    );
                case 'leave':
                    return (
                        <View style={styles.fakebutton}>
                            <Text>已請假</Text>
                        </View>
                    );
                default:
                    return (
                        <View style={styles.fakebutton}>
                            <Text>已過期</Text>
                        </View>
                    );
                    break;
            }
        };
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={styles.button}>
                    <Detail task={props.task} from={props.page} />
                </View>
                <View style={styles.button}>{buttonRight()}</View>
            </View>
        );
    };

    const day = () => {
        switch (props.dayMode) {
            case 'date':
                return (
                    <View style={flexstyle}>
                        <Text style={styles.bold}>Date:</Text>
                        <View style={styles.dscp}>
                            <Text>{props.task.startTime.format('MM-DD')}</Text>
                        </View>
                    </View>
                );
            case 'none':
                return <View></View>;
            default:
                return <View></View>;
                break;
        }
    };

    return (
        <View style={form}>
            <View style={styles.content}>
                <View style={styles.title}>
                    <Text>{props.task.job}</Text>
                </View>
                <View style={styles.body}>
                    <View style={flexstyle}>
                        {day()}

                        <View style={flexstyle}>
                            <Text style={styles.bold}>Time:</Text>
                            <View style={styles.dscp}>
                                <Text>
                                    {props.task.startTime.format('HH:mm')}~{props.task.endTime.format('HH:mm')}
                                </Text>
                            </View>
                        </View>

                        <View style={flexstyle}>
                            <Text style={styles.bold}>Reward:</Text>
                            <View style={styles.dscp}>
                                <Text>{props.task.reward}NTD</Text>
                            </View>
                        </View>

                        {buttons()}
                    </View>
                </View>
            </View>
        </View>
    );
};

export default TaskItem;

const styles = StyleSheet.create({
    content: {
        padding: 8,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: '#BADBFF',
    },
    c3: {
        marginVertical: 5,
        width: SCREEN_WIDTH / 3,
    },
    c1: {
        marginVertical: 5,
    },
    title: {
        flex: 1,
        paddingBottom: 5,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center',
    },
    body: {
        flex: 4,
        marginTop: 5,
    },
    flexcenter: {
        marginBottom: 3,
        alignItems: 'center',
    },
    flexleft: {
        marginBottom: 3,
        alignItems: 'flex-start',
    },
    button: {
        paddingTop: 5,
        marginLeft: 5,
        marginRight: 5,
        flex: 1,
    },
    bold: {
        fontWeight: 500,
    },
    dscp: {
        paddingLeft: SCREEN_WIDTH / 60,
    },
    fakebutton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#ffffff',
    },
});

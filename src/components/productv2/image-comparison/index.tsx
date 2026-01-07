import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, PanResponder, Dimensions, Image } from 'react-native';
import SvgRenderer from 'react-native-svg-renderer';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const Before = (props) => (
    <View style={{ flex: 1 }}>
        <View style={{ position: 'absolute', left: 0, top: 0, overflow: 'hidden', width: props.state.width }}>
            {props.children}
        </View>
    </View>
);

const After = (props) => (
    <View style={{ flex: 1, position: 'absolute', top: 0, right: 0, bottom: 0, zIndex: 9, overflow: 'hidden', left: props.state.left }}>
        <View style={{ position: 'absolute', right: 0, top: 0, width: props.state.width, height: props.state.height }}>
            {props.children}
        </View>
    </View>
);

const DefaultDragger = (props) => (
    <View {...props.parent._panResponder.panHandlers} style={{ height: props.state.height, width: props.state.draggerWidth, backgroundColor: 'transparent', position: 'absolute', top: 0, zIndex: 10, marginLeft: -props.state.draggerWidth / 2, left: props.state.left }}>
        <View style={{ position: 'absolute', top: 0, right: 24, bottom: 0, left: 24, backgroundColor: '#fff', opacity: .6 }}></View>
        <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/slider.svg?v=1732285970' }} style={{ width: 40, height: 40, marginVertical: 'auto', marginLeft: -5 }} />
    </View>
);

const Dragger = (props) => (
    <View {...props.parent._panResponder.panHandlers} style={{ height: props.state.height, width: props.state.draggerWidth, position: 'absolute', top: 0, zIndex: 10, marginLeft: -props.state.draggerWidth / 2, left: props.state.left }}>
        {props.children}
    </View>
);

export default function Compare(props) {



    const initial = props.initial ? props.initial : 0;
    const width = props.width ? props.width : deviceWidth;
    const height = props.height ? props.height : width / 2;
    const draggerWidth = props.draggerWidth || props.draggerWidth == 0 ? props.draggerWidth : 50;
    const onMove = props.onMove ? props.onMove : () => { };
    const onMoveStart = props.onMoveStart ? props.onMoveStart : () => { };
    const onMoveEnd = props.onMoveEnd ? props.onMoveEnd : () => { };

    const [state, setState] = useState({
        width,
        height,
        draggerWidth,
        currentLeft: initial,
        left: initial,
        leftExtra: 0,
        dx: 0,
        onMove,
        onMoveStart,
        onMoveEnd
    });
    const [exa, setExa] = useState(1);
    const [parent, setParent] = useState<any>({ _panResponder: () => { } });
    let tempLeft;

    useEffect(() => {
        setParent({
            _panResponder: PanResponder.create({
                onMoveShouldSetPanResponderCapture: () => true,

                onPanResponderGrant: (e, gestureState) => {
                    setState({ ...state, dx: 0 });
                    state.onMoveStart();
                },
                onPanResponderMove: (event, gestureState) => {

                    let dx = gestureState.dx;

                    let left = state.currentLeft + dx;

                    let { width, draggerWidth } = state;

                    if (left < 0) left = 0;
                    else if (left >= width) left = width;

                    tempLeft = left;

                    setState({ ...state, left: left });
                    setExa(exa + 1);
                    state.onMove();

                },
                onPanResponderRelease: (e, { vx, vy }) => {
                    state.onMoveEnd();
                    setState({ ...state, currentLeft: tempLeft, left: tempLeft });
                }
            })
        })
    }, [props])

    const renderChildren = (props, state) => {
        return React.Children.map(props.children, child => {
            return React.cloneElement(child, {
                state,
                parent: parent
            })
        })
    }

    const { children } = props;


    return (
        <View style={{ width, height, backgroundColor: '#f2f2f2' }}>
            {renderChildren(props, state)}
        </View>
    );


}

export {
    Before,
    After,
    DefaultDragger,
    Dragger
};
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Composer } from './Composer';
import { Send } from './Send';
import Color from './Color';
export function InputToolbar(props) {
    const { renderComposer, renderSend, renderAccessory, containerStyle, } = props;
    const composerFragment = useMemo(() => {
        return (renderComposer?.(props) || (<Composer {...props}/>));
    }, [renderComposer, props]);
    return (<View style={[styles.container, containerStyle]}>
      <View style={[styles.primary, props.primaryStyle]}>
        {composerFragment}
        {renderSend?.(props) || <Send {...props}/>}
      </View>
      {renderAccessory && (<View style={[styles.accessory, props.accessoryStyle]}>
          {renderAccessory(props)}
        </View>)}
    </View>);
}
const styles = StyleSheet.create({
    container: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: Color.defaultColor,
        backgroundColor: Color.white,
    },
    primary: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    accessory: {
        height: 44,
    },
});
//# sourceMappingURL=InputToolbar.js.map
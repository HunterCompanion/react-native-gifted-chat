import React from 'react'
import {
  Linking,
  StyleSheet,
  View,
  TextProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native'

import ParsedText from 'react-native-parsed-text'
import { LeftRightStyle, IMessage } from './types'
import { error } from './logging'

const WWW_URL_PATTERN = /^www\./i

const { textStyle } = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    lineHeight: 20,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
})

const styles = {
  left: StyleSheet.create({
    container: {},
    text: {
      color: 'black',
      ...textStyle,
    },
    link: {
      color: 'black',
      textDecorationLine: 'underline',
    },
  }),
  right: StyleSheet.create({
    container: {},
    text: {
      color: 'white',
      ...textStyle,
    },
    link: {
      color: 'white',
      textDecorationLine: 'underline',
    },
  }),
}

export interface MessageTextProps<TMessage extends IMessage> {
  position?: 'left' | 'right'
  optionTitles?: string[]
  currentMessage: TMessage
  containerStyle?: LeftRightStyle<ViewStyle>
  textStyle?: LeftRightStyle<TextStyle>
  linkStyle?: LeftRightStyle<TextStyle>
  textProps?: TextProps
  customTextStyle?: StyleProp<TextStyle>
  parsePatterns?: (linkStyle: TextStyle) => []
}

export function MessageText<TMessage extends IMessage = IMessage> ({
  currentMessage = {} as TMessage,
  position = 'left',
  containerStyle,
  textStyle,
  linkStyle: linkStyleProp,
  customTextStyle,
  parsePatterns,
  textProps,
}: MessageTextProps<TMessage>) {
  // TODO: React.memo
  // const shouldComponentUpdate = (nextProps: MessageTextProps<TMessage>) => {
  //   return (
  //     !!currentMessage &&
  //     !!nextProps.currentMessage &&
  //     currentMessage.text !== nextProps.currentMessage.text
  //   )
  // }

  const onUrlPress = (url: string) => {
    // When someone sends a message that includes a website address beginning with "www." (omitting the scheme),
    // react-native-parsed-text recognizes it as a valid url, but Linking fails to open due to the missing scheme.
    if (WWW_URL_PATTERN.test(url))
      onUrlPress(`https://${url}`)
    else
      Linking.openURL(url).catch(e => {
        error(e, 'No handler for URL:', url)
      })
  }

  const onEmailPress = (email: string) =>
    Linking.openURL(`mailto:${email}`).catch(e =>
      error(e, 'No handler for mailto')
    )

  const linkStyle = [
    styles[position].link,
    linkStyleProp?.[position],
  ]
  return (
    <View
      style={[
        styles[position].container,
        containerStyle?.[position],
      ]}
    >
      <ParsedText
        style={[
          styles[position].text,
          textStyle?.[position],
          customTextStyle,
        ]}
        parse={[
          ...(parsePatterns ? parsePatterns(linkStyle as unknown as TextStyle) : []),
          { type: 'url', style: linkStyle, onPress: onUrlPress },
          { type: 'email', style: linkStyle, onPress: onEmailPress },
        ]}
        childrenProps={{ ...textProps }}
      >
        {currentMessage!.text}
      </ParsedText>
    </View>
  )
}

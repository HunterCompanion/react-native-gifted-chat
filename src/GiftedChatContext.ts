import { createContext, useContext } from 'react'

export interface IGiftedChatContext {
  getLocale(): string
}

export const GiftedChatContext = createContext<IGiftedChatContext>({
  getLocale: () => 'en',

})

export const useChatContext = () => useContext(GiftedChatContext)

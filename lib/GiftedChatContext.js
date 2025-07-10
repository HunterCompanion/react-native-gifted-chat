import { createContext, useContext } from 'react';
export const GiftedChatContext = createContext({
    getLocale: () => 'en',
});
export const useChatContext = () => useContext(GiftedChatContext);
//# sourceMappingURL=GiftedChatContext.js.map
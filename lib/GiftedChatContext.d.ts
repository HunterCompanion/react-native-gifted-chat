export interface IGiftedChatContext {
    getLocale(): string;
}
export declare const GiftedChatContext: import("react").Context<IGiftedChatContext>;
export declare const useChatContext: () => IGiftedChatContext;

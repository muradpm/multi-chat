"use client";

import { VisibilityType } from "@/hooks/use-chat-visibility";

import { MultiModalInput } from "@/components/multi-modal-input";
import { ChatHeader } from "@/components/chat-header";

import { Id } from "@/convex/_generated/dataModel";

export const Chat = ({
  chatId,
  selectedModelId,
  selectedVisibilityType,
}: {
  chatId: Id<"chats">;
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
}) => {
  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <ChatHeader
        chatId={chatId}
        selectedModelId={selectedModelId}
        selectedVisibilityType={selectedVisibilityType}
      />
      <div className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
        <MultiModalInput />
      </div>
    </div>
  );
};

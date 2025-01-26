import { cookies } from "next/headers";

import { Chat } from "@/components/chat";
import { models, DEFAULT_MODEL_NAME } from "@/lib/ai/models";

import { Id } from "@/convex/_generated/dataModel";

export default async function ChatPage({ chatId }: { chatId: Id<"chats"> }) {
  const cookieStore = await cookies();

  const modelIdFromCookie = cookieStore.get("model-id")?.value;

  const selectedModelId =
    models.find((model) => model.id === modelIdFromCookie)?.id || DEFAULT_MODEL_NAME;

  return (
    <>
      <Chat
        key={chatId}
        chatId={chatId}
        initialMessages={[]}
        selectedModelId={selectedModelId}
        selectedVisibilityType="private"
        isReadonly={false}
      />
    </>
  );
}

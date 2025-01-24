import { cookies } from "next/headers";

import { Chat } from "@/components/chat";
import { DEFAULT_MODEL_NAME, models } from "@/lib/models";

import { Id } from "@/convex/_generated/dataModel";

export default async function ChatPage({ chatId }: { chatId: Id<"chats"> }) {
  const cookieStore = await cookies();

  const modelIdFromCookie = cookieStore.get("model-id")?.value;

  const selectedModelId =
    models.find((model) => model.id === modelIdFromCookie)?.id || DEFAULT_MODEL_NAME;

  return (
    <>
      <Chat
        chatId={chatId}
        selectedModelId={selectedModelId}
        selectedVisibilityType="private"
      />
    </>
  );
}

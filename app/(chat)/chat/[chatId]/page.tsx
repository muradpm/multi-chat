import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { DEFAULT_MODEL_NAME, models } from "@/lib/ai/models";

import { Chat } from "@/components/chat";

import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";

export default async function Page(props: { params: Promise<{ id: Id<"chats"> }> }) {
  const params = await props.params;
  const { id } = params;
  const token = await convexAuthNextjsToken();

  const chat = await fetchQuery(
    api.chats.getChatById,
    {
      id: id,
    },
    { token: token }
  );

  if (!chat) {
    notFound();
  }

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("model-id")?.value;
  const selectedModelId =
    models.find((model) => model.id === modelIdFromCookie)?.id || DEFAULT_MODEL_NAME;

  return (
    <>
      <Chat
        chatId={chat._id}
        selectedModelId={selectedModelId}
        selectedVisibilityType={chat.visibility}
      />
    </>
  );
}

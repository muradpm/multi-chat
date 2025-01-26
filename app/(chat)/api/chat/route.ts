import { streamText } from "ai";
import { models } from "@/lib/ai/models";
import { customModel } from "@/lib/ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, model: modelId } = await req.json();

  const model = models.find((model) => model.id === modelId);

  if (!model) {
    return new Response("Model not found", { status: 404 });
  }

  const result = streamText({
    model: customModel(model.apiIdentifier),
    messages,
  });

  return result.toDataStreamResponse();
}

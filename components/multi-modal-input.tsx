"use client";

import { useChat } from "ai/react";
import { useRef, useState } from "react";

import Image from "next/image";

import { Paperclip } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PreviewAttachment } from "@/components/preview-attachment";

export const MultiModalInput = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submitForm = (event: React.FormEvent) => {
    handleSubmit(event, {
      experimental_attachments: files,
    });

    setFiles(undefined);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
          <div>
            {message?.experimental_attachments
              ?.filter((attachment) => attachment?.contentType?.startsWith("image/"))
              .map((attachment, index) => (
                <Image
                  key={`${message.id}-${index}`}
                  src={attachment.url}
                  width={500}
                  height={500}
                  alt={attachment.name ?? `attachment-${index}`}
                />
              ))}
          </div>
        </div>
      ))}

      <form className="fixed bottom-0 w-full max-w-md mb-8" onSubmit={submitForm}>
        <Textarea
          className="min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base bg-muted pb-10 dark:border-zinc-700"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          rows={2}
          autoFocus
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submitForm(event);
            }
          }}
        />

        <div className="absolute bottom-0 p-2 w-fit flex flex-row justify-start">
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple
            ref={fileInputRef}
          />

          <Button size="icon" onClick={() => fileInputRef.current?.click()}>
            <Paperclip />
          </Button>
        </div>
      </form>
    </div>
  );
};

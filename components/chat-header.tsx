"use client";

import { memo } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { useWindowSize } from "usehooks-ts";
import { useSidebar } from "@/components/ui/sidebar";

import { ModelSelector } from "@/components/model-selector";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { VisibilityType, VisibilitySelector } from "@/components/visibility-selector";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { Unauthenticated } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

function PureChatHeader({
  chatId,
  selectedModelId,
  selectedVisibilityType,
}: {
  chatId: Id<"chats">;
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
}) {
  const router = useRouter();
  const { open } = useSidebar();

  const { width: windowWidth } = useWindowSize();

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <SidebarToggle />

      {(!open || windowWidth < 768) && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0"
              onClick={() => {
                router.push("/chat");
                router.refresh();
              }}
            >
              <Plus />
              <span className="md:sr-only">New chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New chat</TooltipContent>
        </Tooltip>
      )}

      <ModelSelector selectedModelId={selectedModelId} className="order-1 md:order-2" />

      <VisibilitySelector
        chatId={chatId}
        selectedVisibilityType={selectedVisibilityType}
        className="order-1 md:order-3"
      />

      <Unauthenticated>
        <Button
          className="hidden md:flex py-1.5 px-2 h-fit md:h-[34px] order-4 md:ml-auto"
          asChild
        >
          <Link href="/register">Sign up</Link>
        </Button>
      </Unauthenticated>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, () => true);

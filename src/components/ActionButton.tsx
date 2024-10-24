import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface ActionButtonProps {
  children: React.ReactNode;
  content: string;
  side: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
}

export default function ActionButton({
  children,
  content,
  side,
  sideOffset,
}: ActionButtonProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side={side} sideOffset={sideOffset}>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

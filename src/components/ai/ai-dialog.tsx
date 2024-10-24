"use client";

import {
  AlertCircle,
  Bot,
  Brain,
  FileText,
  Loader2,
  MessageSquare,
  Wand2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import robot from "@/assets/robot2.0.png";
import Image from "next/image";

const modes = [
  { id: "write", icon: MessageSquare, label: "Write & Complete" },
  { id: "analyze", icon: Brain, label: "Analyze Content" },
  { id: "improve", icon: Wand2, label: "Improve Writing" },
];

export default function AiDialog({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState("write"); // write, analyze, improve
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function generateResponse() {
    if (!userInput) return;
    setLoading(true);
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userInput,
          mode: mode,
        }),
      });
      const data = await response.json();
      setResponse(data.response);
      setUserInput("");
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(val: boolean) => {
        if (!loading) {
          setOpen(val);
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex cursor-pointer items-center gap-2">
            <Image
              src={robot}
              alt="robo"
              width={40}
              height={40}
              className="object-cover hover:rotate-6"
            />
            <p className="font-mono text-sm">Yo!</p>
          </DialogTitle>
        </DialogHeader>

        <div className="mb-4 flex flex-wrap gap-2">
          {modes.map(({ id, icon: Icon, label }) => (
            <Button
              key={id}
              variant={mode === id ? "default" : "outline"}
              className="flex-1"
              onClick={() => setMode(id)}
            >
              <Icon className="mr-2 size-5" />
              {label}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          <Textarea
            placeholder={
              mode === "write"
                ? "What would you like me to write about?"
                : mode === "analyze"
                  ? "Paste your text for analysis..."
                  : "Paste your text for improvements..."
            }
            value={response || userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className=""
          />
          <div className="flex w-full items-end justify-end">
            <Button
              onClick={generateResponse}
              className="bg-gradient-to-t from-blue-700 to-blue-500"
              disabled={loading || !userInput.trim() || !!response.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  <Brain className="mr-1 h-4 w-4" />
                  {mode === "write"
                    ? "Generate"
                    : mode === "analyze"
                      ? "Analyze"
                      : "Improve"}
                </>
              )}
            </Button>
          </div>
        </div>

        {response && (
          <div className="mt-4 space-y-4">
            {/* <div className="rounded-lg border bg-gray-50 p-4">
              <div className="prose max-w-none">{response}</div>
            </div> */}
            <div className="flex items-center gap-1">
              <AlertCircle className="size-4" />
              <p className="text-xs">Copy result to ask again 👇</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={async () => {
                  // Implement copy to clipboard
                  await navigator.clipboard.writeText(response);
                  setResponse("");
                  toast.success("Copied to clipboard");
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                Copy to Clipboard
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

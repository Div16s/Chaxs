import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { getSocket } from "@/lib/socket.config";
import { Input } from "../ui/input";
import { v4 as uuidv4 } from "uuid";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";

export default function Chats({
  group,
  oldMessages,
  chatUser,
}: {
  group: GroupChatType;
  oldMessages: Array<MessageType> | [];
  chatUser?: GroupChatUserType;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<MessageType>>(oldMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = {
      room: group.id,
      userId: chatUser?.id ?? "",
    };
    return socket.connect();
  }, [chatUser]);
  useEffect(() => {
    socket.on("message", (data: MessageType) => {
      console.log("The message is", data);
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollToBottom();
    });

    return () => {
      socket.close();
    };
  }, []);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload: MessageType = {
      id: uuidv4(),
      message: message,
      name: chatUser?.name ?? "Unknown",
      created_at: new Date().toISOString(),
      group_id: group.id,
    };
    socket.emit("message", payload);
    setMessage("");
    setMessages([...messages, payload]);
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-[90vh] md:h-[94vh] p-4">
      
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg) => {
          const isSender = msg.name === chatUser?.name;
          return (
            <div
              key={msg.id}
              className={cn(
                "max-w-md px-4 py-2 rounded-xl shadow-sm",
                isSender
                  ? "bg-sky-100 text-sky-700 self-end ml-auto"
                  : "bg-gray-100 text-gray-800 self-start mr-auto"
              )}
            >
              {!isSender && (
                <p className="text-xs font-semibold text-gray-500 mb-1">
                  {msg.name}
                  {/* <Separator className="my-1" /> */}
                </p>
              )}
            
              <div className="flex justify-between items-start">
                <p className="break-words font-normal">{msg.message}</p>
                <p className="text-xs text-right mt-1 opacity-50">
                  {formatTime(msg.created_at)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center gap-2 border-t pt-3"
      >
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition flex items-center justify-center"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
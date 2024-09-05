"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatTime } from "@/utils/formattime";
import Script from "next/script";
import { PlainMessage } from "@/app/embed/[spaceId]/page";

interface EmbedCarouselProps {
  messages: PlainMessage[];
}

const EmbedCarousel: React.FC<EmbedCarouselProps> = ({ messages }) => {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const [expandedMessages, setExpandedMessages] = useState<{ [key: string]: boolean }>({});
  const MAX_LENGTH = 100;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSearchParams(new URLSearchParams(window.location.search));
    }
  }, []);

  const bgColor = searchParams?.get("bgColor") || "ffffff";
  const cardBgColor = searchParams?.get("cardBgColor") || "f1f1f1";
  const textColor = searchParams?.get("textColor") || "000000";
  const type = searchParams?.get("type") || "all";
  const hideDate = searchParams?.get("hideDate") || "false";
  const sameHeight = searchParams?.get("sameHeight") || "true";
  const enableShadow = searchParams?.get("enableShadow") || "true";

  console.log(bgColor, cardBgColor, textColor, type, hideDate, sameHeight, enableShadow);

  const filteredMessages = type === "liked" 
    ? messages.filter((message) => message.isLiked) 
    : messages;

  const toggleExpand = (messageId: string) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  };

  return (
    <div
      className="w-full flex items-center justify-center relative"
      style={{
        backgroundColor: `#${bgColor}`,
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js" />

      <Carousel className="w-[90vw]">
        <CarouselContent className="flex gap-4 px-8 justify-center">
          {filteredMessages.length === 0 ? (
            <div>No feedbacks available</div>
          ) : (
            filteredMessages.map((message) => {
              const isExpanded = expandedMessages[message._id] || false;
              const isTruncated = message.feedback.length > MAX_LENGTH;

              const cardStyle = {
                backgroundColor: `#${cardBgColor}`,
                color: `#${textColor}`,
                boxShadow: enableShadow === "true" ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
                transition: "box-shadow 0.3s ease-in-out",
              };

              return (
                <CarouselItem
                  key={message._id}
                  className={`flex-none ${sameHeight === "true" ? "h-56" : ""} w-full sm:w-[calc(100%/2)] md:w-[calc(100%/3)] lg:w-[calc(100%/4)]`}
                  style={cardStyle}
                >
                  <div className="p-4 flex flex-col gap-4 h-full">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={message?.image} alt={message?.name} />
                        <AvatarFallback>{message?.name[0]}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-lg">{message?.name}</h3>
                    </div>
                    <div className="w-[90%]">
                      <p>
                        {isExpanded ? message.feedback : message.feedback.slice(0, MAX_LENGTH)}
                        {isTruncated && (
                          <>
                            <div
                              onClick={() => toggleExpand(message._id)}
                              className="text-muted-foreground cursor-pointer text-sm"
                            >
                              {isExpanded && sameHeight ? " Show less" : " Show more"}
                            </div>
                          </>
                        )}
                      </p>
                    </div>
                    {hideDate === "false" && (
                      <div>
                        <p className="text-sm">{formatTime(message?.createdAt)}</p>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              );
            })
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default EmbedCarousel;

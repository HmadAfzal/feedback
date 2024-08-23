"use client";

import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatTime } from "@/utils/formattime";
import Script from 'next/script';
import { PlainMessage } from '@/app/embed/[spaceId]/page';



interface EmbedCarouselProps {
  messages: PlainMessage[];
}

const EmbedCarousel: React.FC<EmbedCarouselProps> = ({ messages }) => {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSearchParams(new URLSearchParams(window.location.search));
    }
  }, []);

  const bgColor = searchParams?.get('bgColor') || 'ffffff';
  const cardBgColor = searchParams?.get('cardBgColor') || 'f1f1f1';
  const textColor = searchParams?.get('textColor') || '000000';
  const type = searchParams?.get('type') || 'all';

  const filteredMessages = type === 'liked'
    ? messages.filter(message => message.isLiked)
    : messages;

  return (
    <div
      className="w-full flex items-center justify-center"
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
            filteredMessages.map((message) => (
                <CarouselItem
                key={message._id}
                className="w-[calc(100%/3)] flex-none"
                style={{ backgroundColor: `#${cardBgColor}`, color: `#${textColor}` }}
              >
                <div className="p-4 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={message?.image} alt={message?.name} />
                      <AvatarFallback>{message?.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">{message?.name}</h3>
                  </div>
                  <div className="w-[90%]">
                    <p>{message?.feedback}</p>
                  </div>
                  <div>
                    <p className="text-sm">
                      {formatTime(message?.createdAt)}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default EmbedCarousel;

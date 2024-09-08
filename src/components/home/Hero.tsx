import React from 'react';
import Wrapper from './Wrapper';
import Container from './Container';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import MagicButton from './MagicButton';

const Hero = () => {
  return (
    <Wrapper>
      <Container>
        <div className="flex flex-col items-center justify-center py-20 h-full w-full">


          <div className="flex flex-col items-center mt-8 w-full">
            <h1 className="text-2xl md:text-5xl md:!leading-tight font-bold text-center">
            Collect Feedback Effortlessly, Display It Instantly
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground mt-6 text-center">
            The easiest way to gather feedbacks, testimonials and reviews and embed it on your site.
            </p>

            <Link href={'/sign-up'}><MagicButton title="Get started for free" icon={<ChevronRight className='size-5 ' />} position="right" /></Link>

          </div>

          <div className="relative flex items-center py-10 md:py-20 w-full">
            <div className="absolute top-1/2 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 h-3/4 -translate-y-1/2 inset-0 blur-[10rem]"></div>

            <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
              <Image
                src="/assets/dashboard.png"
                alt="banner image"
                width={1200}
                height={1200}
                quality={100}
                className="rounded-md lg:rounded-xl bg-foreground/10 shadow-2xl ring-1 ring-border"
              />
            </div>


          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Hero;



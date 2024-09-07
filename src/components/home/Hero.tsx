import React from 'react';
import Wrapper from './Wrapper';
import Container from './Container';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import MagicButton from './MagicButton';

const Hero = () => {
  return (
    <Wrapper>
      <Container>
        <div className="flex flex-col items-center justify-center py-20 h-full">


          <div className="flex flex-col items-center mt-8 max-w-4xl w-11/12 md:w-full">
            <h1 className="text-4xl md:text-6xl md:!leading-tight font-bold text-center">
            Collect Feedback Effortlessly, Display It Instantly
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mt-6 text-center">
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







// <button className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
// <span>
//   <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
// </span>
// <span className="backdrop absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900" />
// <span className="h-full w-full blur-md absolute bottom-0 inset-x-0 bg-gradient-to-tr from-primary/40"></span>
// <span className="z-10 py-0.5 text-sm text-neutral-100 flex items-center justify-center gap-1.5">
//   <Image
//     src="/icons/sparkles-dark.svg"
//     alt="✨"
//     width={24}
//     height={24}
//     className="w-4 h-4"
//   />
//   Introducing Astra AI
//   <ChevronRight className="w-4 h-4" />
// </span>
// </button>


{/* <div className="hidden md:flex relative items-center justify-center mt-8 md:mt-12 w-full">
<Link
  href="#"
  className="flex items-center justify-center w-max rounded-full border-t border-foreground/30 bg-white/20 backdrop-blur-lg px-2 py-1 md:py-2 gap-2 md:gap-8 shadow-3xl shadow-background/40 cursor-pointer select-none"
>
  <p className="text-foreground text-sm text-center md:text-base font-medium pl-4 pr-4 lg:pr-0">
    ✨ {"  "} Start building your dream website now!
  </p>
  <Button
    size="sm"
    className="rounded-full hidden lg:flex border border-foreground/20"
  >
    Get Started
    <ArrowRight className="w-4 h-4 ml-1" />
  </Button>
</Link>
</div> */}





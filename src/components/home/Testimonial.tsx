import React from 'react'
import Wrapper from './Wrapper'
import Container from './Container'
import { reviews } from '@/constants'
import { InfiniteMovingCards } from '../ui/infinite-moving-cards'

const Testimonial = () => {
  return (
    <Wrapper className="flex flex-col items-center justify-center py-12 relative">
    <div className="hidden md:block absolute -top-1/4 -left-1/3 w-72 h-72 bg-primary rounded-full blur-[10rem] -z-10"></div>
    <Container>
        <div className=" w-2xl mx-auto text-start md:text-center">
            <h2 className="text-3xl lg:text-6xl font-bold mt-6">
                What people are saying
            </h2>
            <p className="text-muted-foreground mt-6">
                See how Feedback empowers businesses of all sizes. Here&apos;s what people are saying about us.
            </p>
        </div>
    </Container>
    <Container>
        <div className="py-10 md:py-20 w-full">
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden py-10">
            <InfiniteMovingCards className='w-full bg-transparent ' items={reviews} direction="right" speed="slow"/>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
            </div>
        </div>
    </Container>
</Wrapper>
  )
}

export default Testimonial







// "use client";

// import React from "react";
// import { reviews } from '@/constants'
// import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
 
// const testimonials = [
//     {
//       quote:
//         "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
//       name: "Charles Dickens",
//       title: "A Tale of Two Cities",
//     },
//     {
//       quote:
//         "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
//       name: "William Shakespeare",
//       title: "Hamlet",
//     },
//     {
//       quote: "All that we see or seem is but a dream within a dream.",
//       name: "Edgar Allan Poe",
//       title: "A Dream Within a Dream",
//     },
//     {
//       quote:
//         "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
//       name: "Jane Austen",
//       title: "Pride and Prejudice",
//     },
//     {
//       quote:
//         "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
//       name: "Herman Melville",
//       title: "Moby-Dick",
//     },
//   ];
  
// const Testimonial = () => {
//   return (
//     <section id="testimonials" className="py-20">
//       <h1 className="heading">
//         Kind words from
//         <span className="text-purple"> satisfied clients</span>
//       </h1>

//       <div className="flex flex-col items-center max-lg:mt-10">
//         <div
//           className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden"
//         >
         
//          <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
//       <InfiniteMovingCards
//         items={testimonials}
//         direction="right"
//         speed="slow"
//       />
//     </div>


//         </div>

//         <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
//           {reviews.map((review) => (
//             <React.Fragment key={review.name}>
//             </React.Fragment>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonial;




   

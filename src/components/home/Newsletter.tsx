import React from 'react'
import Wrapper from './Wrapper'
import Container from './Container'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { LampContainer } from './lamp'
import { Input } from '../ui/input'

const Newsletter = () => {
  return (
    <Wrapper className="flex flex-col items-center justify-center py-12 relative">
    <Container>
        <LampContainer>
            <div className="flex flex-col items-center justify-center relative w-full text-center">
                <h2 className="text-4xl lg:text-6xl xl:text-6xl lg:!leading-snug font-bold mt-8">
                The best feedbacks <br /> all in one place
                </h2>
                <p className="text-muted-foreground mt-6 max-w-md mx-auto">
                    Build a stunning Feedback section with no efforts and zero code
                </p>
                <Button  className="mt-6" asChild>
                    <Link href="/sign-in">
                        Get started for free
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </Button>
            </div>
        </LampContainer>
    </Container>
    <Container className="relative z-10">
        <div className="flex items-center justify-center w-full -mt-40">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between w-full px-4 md:px-8 rounded-lg lg:rounded-2xl border border-border/80 py-4 md:py-8">
                <div className="flex flex-col items-start gap-4 w-full">
                    <h4 className="text-xl md:text-2xl font-semibold">
                        Join our newsletter
                    </h4>
                    <p className="text-base text-muted-foreground">
                        Be up to date with everything about Feedback
                    </p>
                </div>
                <div className="flex flex-col items-start gap-2 md:min-w-80 mt-5 md:mt-0 w-full md:w-max">
                    <form action="#" className="flex flex-col md:flex-row items-center gap-2 w-full md:max-w-xs">
                        <Input
                            required
                            type="email"
                            placeholder="Enter your email"
                            className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-primary duration-300 w-full"
                        />
                        <Button type="submit" size="sm" variant="secondary" className="w-full md:w-max">
                            Subscribe
                        </Button>
                    </form>
                    <p className="text-xs text-muted-foreground">
                        By subscribing you agree with our{" "}
                        <Link href="#">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </Container>
</Wrapper>
  )
}

export default Newsletter

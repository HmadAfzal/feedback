import Link from "next/link";
import Container from "./Container";
import Icons from "./Icons";
import { Button } from "../ui/button";

const Navbar = async () => {


    return (
        <header className=" py-4 md:px-16 px-8 md:py-8 h-14 sticky top-0 inset-x-0 w-full bg-background/40 backdrop-blur-lg border-b border-border z-50">
            <Container reverse>
                <div className="flex  items-center justify-between h-full mx-auto md:max-w-screen-xl">
                    <div className="flex items-start">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="md:text-3xl text-2xl font-bold">
                               Feedback
                            </span>
                        </Link>
                    </div>
                    <div className="flex gap-4">
                   <Button variant={'outline'}><Link href={'/sign-in'}>Login</Link></Button>
                   </div>
                </div>
            </Container>
        </header>
    )
};

export default Navbar

import Container from "@/components/ui/container";
import MainNav from "@/components/main-nav";
import Link from "next/link";

const Navbar = () => {
    return ( 
        <div className="border-b">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16">
                    <Link href="/" className="ml-4 lg:ml-0 gap-x-2 items-center">
                        <p className="font-bold text-xl">
                            Store
                        </p>
                    </Link>
                    <MainNav data={[]} />
                </div>
            </Container>
        </div>
     );
}
 
export default Navbar;
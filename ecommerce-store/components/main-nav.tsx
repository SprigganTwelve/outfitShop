"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavProps{
    data: any
} 

const MainNav: React.FC<MainNavProps> = ({
    data
}) => {
    const pathname = usePathname()

    const routes = daat.map((route) => ({
        href: `category/${route.id}`,
        label: route.name,
        active: pathname === `category/${route.id}`
    }))

    return ( 
        <nav
            className="mx-6 items-center space-x-4 lg:space-x-6"
        >
            {routes.map((item)=> (
                <Link
                    key={routes.href}
                    href={routes.href}
                    className={}
                >
                
                </Link>
            ))}
        </nav>
     );
}
 
export default MainNav;
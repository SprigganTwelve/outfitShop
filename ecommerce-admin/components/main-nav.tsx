"use client"

import { cn } from "@/lib/utils";
import  Link  from "next/link";
import { useParams, usePathname } from "next/navigation";

export  function MainNav({  
    className,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ...props
} : React.HTMLAttributes<HTMLElement>) {
    const pathName = usePathname()
    const params = useParams()
    
    const route = [
        {
            href: `/${params.storeId}/settings`,
            label: 'Setting',
            active: pathName === `/${params.storeId}/settings`
        }
    ]

    return ( 
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
        {
          route.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-black dark:text-white" : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link> 
          ))
        }
      </nav>
     );
}
 
 ;
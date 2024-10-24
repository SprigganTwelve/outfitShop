"use client"

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

export default function SetupPage() {
    const router = useRouter()
    const handleClick = () => {
        router.push('/sign-in/[[...index]].tsx'); 
      };
    return (
      <div  className="p-4" >
            <UserButton />
            <Button onClick={handleClick}>Click Me</Button>
      </div>
    );
  }
  
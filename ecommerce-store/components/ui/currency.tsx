"use client"

import { useEffect, useState } from "react"

export const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  })


interface CurrencyPropos{
    value?: string | number
}

const Currency: React.FC<CurrencyPropos> = (
    {
        value
    }
) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null;
    }

    return ( 
        <div className="font-semibold">
            {
                formatter.format(Number(value))
            }
        </div>
     );
}
 
export default Currency;
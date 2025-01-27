import React from 'react'
import Link from 'next/link'
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
    return (
        <div style={{ borderBottom: "1px solid black", position: "fixed", top: "0" }} className='w-[100vw] h-[9vh] px-[10px] mb-[10px] bg-white z-[999] flex items-center justify-between'>
            <Link href="/"><div style={{color:"green"}} className='font-bold text-lg p-[5px]'>Goa Plan</div></Link>
            <div className='flex gap-[20px] items-center'>
                <Link href="/add">
                    <div style={{cursor:"pointer", borderRadius:"5px", border:"1px solid black"}} className='px-[8px] py-[4px] text-black font-regular text-xs'>Add Business</div>
                </Link>
                <UserButton />
            </div>
        </div>
    )
}

export default Navbar
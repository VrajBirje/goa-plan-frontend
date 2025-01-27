import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = () => {
    return (
        <div className='w-full '>
            <div style={{ borderBottom: "1px solid black", position: "fixed", top: "0" }} className='w-[100vw] h-[9vh] px-[10px] mb-[10px] bg-white z-[999] flex items-center justify-between'>
            <div style={{color:"green"}} className='font-bold text-lg p-[5px]'>Goa Plan</div>
            <div className='flex gap-[20px] items-center'>
                <Link href="/business">
                    <div style={{cursor:"pointer", borderRadius:"5px", border:"1px solid black"}} className='px-[8px] py-[4px] text-black font-regular text-xs'>Dashboard</div>
                </Link>
            </div>
        </div>
            <div className='mt-[10vh] h-[90vh] w-[100vw] flex flex-col items-center justify-center gap-[30px]'>
                <h1 style={{textAlign:"center", fontSize:"26px", fontWeight:"bold", color:"green"}}>Explore and Manage Goa's Businesses Seamlessly</h1>
                <div className='relative w-[400px] h-[300px] goa-img'>
                    <Image alt='goa' src="/image.png" fill={true} className='absolute '/>
                </div>
            </div>
        </div>
    )
}

export default Page
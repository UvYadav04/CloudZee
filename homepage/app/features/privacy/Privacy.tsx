'use client'

import React from 'react'
import Feedback from '../Feedback';
function Privacy({ setfeedback, setprivacy }: any) {

    return (
        <div className='w-56 h-auto bg-white absolute top-10 right-0' style={{ boxShadow: "2px 2px 2px black" }}>
            <ul className='min-w-full px-2 py-1 flex flex-col gap-1'>
                <li className='cursor-pointer' onClick={() => {
                    setprivacy(false)

                    window.open('Help/Cloudzee_help.pdf', '_blank');
                }}>Help</li>
                <hr className='border-0 bg-black h-[1px]' />
                <li className='cursor-pointer' onClick={() => {
                    setprivacy(false)

                    window.open('Terms_policy/policy.pdf', '_blank');
                }}>Terms and Policies</li>
                <hr className='border-0 bg-black h-[1px]' />
                <li className='cursor-pointer' onClick={() => {
                    setprivacy(false)
                    setfeedback(true)
                }}>Send feedback to CloudZee</li>
            </ul>
        </div>
    )
}

export default Privacy

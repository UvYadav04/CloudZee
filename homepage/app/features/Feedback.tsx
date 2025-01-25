'use client'

import React, { useState } from 'react'
// const feedbackcontext = 
import { RxCross2 } from "react-icons/rx";

function Feedback({ setfeedback }: any) {

    return (
        <div className='w-96 min-h-fit h-[91vh] bg-blue-200 absolute right-0  top-16 px-5 pt-2  flex flex-col justify-between '>

            <div>

                <RxCross2 className=' cursor-pointer float-right text-3xl bg-blue-400 rounded-full text-blue-300 right-0 top-1 ' onClick={() => {
                    setfeedback(false)
                }} />

                <select className='w-full h-12 px-2 border-2 border-black mt-3' name="issue" id="issue">
                    <option className='mx-2' selected>Select an issue</option>
                    <option value="Upload files">Upload files</option>
                    <option value="Open file">Open file</option>
                    <option value="Delete file">Delete file</option>
                    <option value="Can't see uploads">Can't see uploads</option>
                    <option value="Others">Others</option>
                </select>

                <textarea name="issuebox" id="" className='w-full mt-4 px-1 border-2 border-black' placeholder='describe your issue' rows={7} >
                </textarea>

                <p className='text-red-700'>
                    *Do not add any sensitive information.
                </p>
            </div>

            <div >

                <p className='text-sm'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi ipsa dolorum velit quod quidem quae sed voluptatem, commodi odio! Blanditiis repudiandae expedita quam atque ea deleniti eaque ullam veritatis
                </p>
                <button className='w-fit bg-blue-400 rounded-sm px-3 py-2 float-right mt-6 mb-2'>Send feedback</button>

            </div>

        </div>
    )
}

export default Feedback
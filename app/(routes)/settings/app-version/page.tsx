'use client'

import React from 'react'
import UpdateVersionForm from './updateAppVersion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'


const page = () => {
  return (
    <div className='mt-10'>
         <Link
                href="/settings"
                className="flex items-center gap-3 mb-6 text-primary font-semibold"
              >
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                  <ArrowLeft className="text-primary" size={20} />
                </div>
                Go back
              </Link>
      <UpdateVersionForm/>
    </div>
  )
}

export default page

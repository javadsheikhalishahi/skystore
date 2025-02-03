import Header from '@/components/Header'
import MobileNavigation from '@/components/MobileNavigation'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <main className='flex min-h-screen flex-col md:flex-row'>
      <Sidebar />

      <section className='flex h-full flex-1 flex-col'>
         <MobileNavigation />
        <Header />
         <div className='main-content'>{children}</div>
      </section>
    </main>
  )
}

export default layout

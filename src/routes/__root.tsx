import { Outlet, createRootRoute } from '@tanstack/react-router'


import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Outlet />
      <Footer/>
    </>
  )
}

const footerLinks = [
  {title: 'support', links: [{text: 'Docs', link: ''}, {text: 'Support', link: ''}]},
  
]

const Footer = ()=>{
  return <div className='text-white flex flex-col sm:flex-row gap-4 md:gap-6 p-4 md:p-8 bg-slate-950 mt-10 md:mt-20'>
    <section className='flex flex-col gap-4'>
      <h1 className='text-3xl'>Gate</h1>
      <p className='text-xl'>The membership management platform.</p>
      <p className='text-lg'>Built for moderators serious about scaling the membership process.</p>
    </section>

    <section>
      {footerLinks.map(fl=>(
        <div key={fl.title} className='flex flex-col gap-4 md:gap-6'>
          <p className='capitalize font-medium'>{fl.title.toUpperCase()}</p>
          <div className='flex flex-col gap-2 md:gap-4'>
            {fl.links.map(lnk=>(
              <p key={lnk.text}>{lnk.text}</p>
            ))}
          </div>
        </div>
      ))}
    </section>
  </div>
}
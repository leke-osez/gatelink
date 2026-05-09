import LandingPage from '#/pages/landing-page/landing-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="">
     <LandingPage />
    </div>
  )
}

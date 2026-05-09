import { useDisclosure } from '#/hooks/useDisclosure'
import { useHideOnScroll } from '#/hooks/useHideOnScroll'
import SwitchingText from '#/ui/animations/switchingTexts'
import { Button } from '#/ui/components/button'
import { FlowCard } from '#/ui/components/flow-chart'
import { Modal } from '#/ui/components/modal'
import { cn } from '#/utils/style'
import { useState, type ReactNode } from 'react'
import OnboardingForm from './onboarding-form'
import { supabase } from '#/utils/supabase-client'

const LandingPage = () => {
  const visible = useHideOnScroll({ showAfter: 80 });
  const { close: closeOnboard, open: openOnboard, isOpen: isOnboardOpen } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (values: { fullName: string; email: string; description: string; inquiry: string; phoneNumber: string }) => {
    const { fullName, email, description, inquiry, phoneNumber } = values;

    console.log(values)
    setIsSubmitting(true);
    const { error, status } = await supabase
      .from("waitlist")
      .insert([
        {
          full_name: fullName,
          email,
          description,
          inquiry,
          phone_number: phoneNumber
        },
      ]);

    if (status === 409) {
      alert("You have already joined the waitlist!");
      setIsSubmitting(false);
      closeOnboard();
      return;
    }

  
    if (error) {
      console.log(error);
      setIsSubmitting(false);
      return;
    }
    
    setIsSubmitting(false);
    alert("Joined waitlist!");
    closeOnboard();
  }

  return (
    <div className='w-full flex flex-col gap-8 items-center'>
        <OnboardingModal closeOnboard={closeOnboard} isOpenOnboard={isOnboardOpen} handleFormSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        <NavBar visible= {visible} openOnboard={openOnboard}/>
        <Banner openOnboard={openOnboard}/>
        <SweetSpot/>
        <PaymentFlowComparison/>
        <Features />
        <CustomerProfile/>
        
    </div>
  )
}

const OnboardingModal = ({closeOnboard, isOpenOnboard, handleFormSubmit, isSubmitting }: { isOpenOnboard: boolean, closeOnboard: () => void, handleFormSubmit: (values: { fullName: string; email: string; description: string; inquiry: string; phoneNumber: string }) => Promise<void>, isSubmitting: boolean }) => {


  return (
    <Modal close={closeOnboard} isOpen={isOpenOnboard} showCloseButton dialogClassName='p-4 bg-blue/5 ' contentClass='max-w-xl'>

      <OnboardingForm handleFormSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
    </Modal>
  );
};

const NavBar =  ({visible, openOnboard}:{visible:boolean, openOnboard: () => void})=>{
  return(
    <nav className={cn('p-2 sm:p-4 m-4  w-full max-w-250 rounded-xl flex justify-between items-center bg-white sticky top-0  z-10', visible
      ? "translate-y-0 transition-transform duration-300"
      : "-translate-y-full transition-transform duration-300",)}>
      <Button variant={'plain'} className='font-semibold text-lg md:text-xl'>Gate</Button>
      <section className=' gap-4 md:gap-6 items-center hidden sm:flex sm:text-lg'>
        <Button variant={'plain'} className='md:text-lg'>
          Features
        </Button>
        <Button variant={'plain'} className='md:text-lg'>
          Pricing
        </Button>
        <Button variant={'plain'} className='md:text-lg'>
          Why Us?
        </Button>  
      </section>
      <Button variant={'plain'} onClick={() => openOnboard()} className='bg-slate-900 text-white font-medium p-2 px-3 md:p-4 md:text-lg'>Join Waitlist</Button>
    </nav>
  )
}

const Banner = ({ openOnboard}:{  openOnboard: () => void}) =>{
    return  <div className='w-full flex flex-col '>


    <div className="flex flex-col lg:flex-row w-full p-3 sm:p-5 sm:px-10 md:px-16">
        <section className = 'relative flex flex-col gap-4  items-start max-w-150 w-full '>
          <div className='relative w-full min-h-20 h-fit flex items-center mb-2'>
          <SwitchingText texts={["Manage", "Simplify", "Centralize"]} className = 'relative w-full max-w-125 font-bold -rotate-2 -mt-4  h-fit' textClassName='flex justify-center w-full text-2xl bg-foreground/90 border-4 text-3xl sm:text-4xl md:text-7xl p-4 rounded-md border-white p-2 text-white shadow-[10px_10px_0_rgba(0,0,0,0)] shadow-slate-900'/>
           </div>
          <h1 className='text-3xl md:text-6xl font-bold text-slate-800'> Your Premium Group Payments All In One Place</h1>
          <div className="flex flex-col gap-2">
          <p className='md:text-xl text-slate-700 font-medium'>One platform to handle payments and onboarding across all your communities</p>
          </div>

          <div className='flex gap-4 flex-col sm:flex-row md:gap-8 w-full text-xl'>

          <Button className='bg-foreground/20 text-slate-900 ring-2 ring-slate-900 sm:rounded-ss-3xl text-xl font-semibold p-3 md:p-6 flex-1 '>Get In Touch</Button>
          <Button className='bg-foreground  ring-2 ring-slate-900 text-xl font-semibold p-3 md:p-6 flex-1 sm:rounded-se-3xl' onClick={() => openOnboard()}>Join Our Waitlist</Button>

          </div>
        </section>
        <section className='flex-1 mt-9 lg:mt-0'>
            <div className='flex justify-between flex-wrap gap-5'>
              <Tag className='text-sm -rotate-2 shadow-[4px_4px_0_rgba(0,0,0,0)] shadow-slate-900 wrap'>Built for communities ❤️</Tag>
             <Tag className='text-sm rotate-3 shadow-[4px_4px_0_rgba(0,0,0,0)] shadow-slate-900'>Automate your membership payments 🤖</Tag>
            </div>
            
        </section>
      </div>
      <div className='flex justify-center flex-wrap gap-3 mt-10 text-sm md:text-base bg-black/90 text-white px-3 md:px-8 py-2'>
        <p className='font-medium'>members onboarded: <span className='font-normal opacity-70'>120,000+</span></p>
        <p className='font-medium'>communities added: <span className='font-normal opacity-70'>1,000+</span></p>
        <p className='font-medium'>payments processed: <span className='font-normal opacity-70'>$300,000+</span></p>
      </div>
      </div>
}


const SweetSpot = ()=>{
  return <div className='flex flex-col bg-foreground items-center w-full max-w-200 text-center text-xl font-semibold md:font-bold md:mt-10 p-8'>
    <p className='text-xl sm:text-xl md:text-4xl'>We made <span className='text-white'>{" membership payments and subscriptions easier "}</span> so you can focus on the part you love</p>
    <Button className='bg-foreground-500'>
      Become part of our waitlist
    </Button>
  </div>
}

function PaymentFlowComparison() {
  return (
    <section className="w-full px-4 py-12 my-4 md:my-7 md:px-8 bg-blue/5 rounded-xl flex flex-col items-center gap-12">
      <div className="w-full ">
        

        <div className="w-full flex flex-col  gap-4">
          <div className='flex flex-col gap-2'>

          <div className='w-full flex flex-col gap-4 items-center '>

          <p className='text-xl md:text-2xl xl:text-4xl font-semibold opacity-90 border-2 border-slate-950 bg-gray-500 w-fit p-2 px-3 text-white shadow-[10px_10px_0_rgba(0,0,0,0)] shadow-slate-900'> What payment looked like before</p>
          <p className='text-lg md:text-xl font-medium'>Too many steps, manual verification, and onboarding delays.</p>
          </div>
          <FlowCard
            customNodeStyle={{backgroundColor: "rgba(2, 6, 24, 0.1)", borderColor: "rgba(2, 6, 24, 0.4)"}}
            steps={[
              "User joins Telegram group",
              "Admin sends payment account manually",
              "User makes transfer",
              "User sends proof of payment",
              "Admin verifies transaction",
              "Admin manually grants access",
            ]}
            textClassName='text-[#020618]!'
          />
          </div>

            <div className='flex flex-col gap-2'>
              <div className='w-full flex flex-col gap-4 items-center '>
                <p className='text-xl md:text-2xl xl:text-4xl font-semibold opacity-90 border-2 border-slate-950 bg-foreground w-fit p-2 px-3 text-white shadow-[10px_10px_0_rgba(0,0,0,0)] shadow-slate-900'>What payment looks like now</p>
                <p className='text-lg md:text-xl'>A seamless, automated process that gets your members access instantly.</p>
              </div>
            <FlowCard
                customNodeStyle={{backgroundColor: "#ff5b04", borderColor: "rgba(255, 91, 4, 0.5)"}}
              steps={[
                "User clicks payment link",
                "Payment processed and verified automatically",
                "Access granted automatically",
              ]}
              textClassName='text-white! font-bold!'
            />
            </div>
        </div>
      </div>
    </section>
  );
}

const featureColors = [
  '#eef5f040', '#85b99a40', '#ffc89640', '#ff7a0040', '#fffff40', '#ff3d6840', '#ff4f9a40', '#e9405740', '#c445ff40', '#8b5cf640',
]

const features = [
  {
    summary: "Automated Community Monetization",
    description:
      "Turn Telegram and WhatsApp groups into revenue-generating communities with automated payments, onboarding, and access management.",
    status: "available",
    },
  {
    summary: "Instant Group Access",
    description:
      "Give members immediate access to paid communities after successful payment confirmation.",
      status: "development",
  },
    {
    summary: "Flexible Access Control",
    description:
      "Create one-time payments, recurring subscriptions, invite-only groups, or tiered memberships.",
      status: "available",
  },
  {
    summary: "Unified Community Dashboard",
    description:
      "Manage communities, payments, onboarding flows, and members from one centralized dashboard.",
      status: "available",
  },
  {
    summary: "Multi Platform Support",
    description:
      "Manage Telegram and WhatsApp communities together without switching between multiple tools.",
      status: "available",
  },
  {
    summary: "Subscription Billing",
    description:
      "Enable recurring memberships, automated renewals, and subscription expiration management.",
      status: "development",
  },

  {
    summary: "Revenue Analytics",
    description:
      "Track revenue, conversion rates, churn, onboarding performance, and payment trends in real time.",
      status: "development",
  },
  {
    summary: "Referral System",
    description:
      "Grow communities organically using referral links, invite tracking, and reward systems.",
      status: "development",
  },
  {
    summary: "Branded Onboarding",
    description:
      "Customize onboarding pages, payment flows, welcome messages, and user access experiences.",
      status: "development",
  },

];

const Features = () => {
    return <div className="flex flex-col w-full max-w-[1200px] gap-4 p-3 md:p-5">
        <h2 className="text-base font-semibold border border-slate-300 w-fit p-2 px-3">Features</h2>
        <p className='text-lg sm:text-2xl md:text-4xl my-3 font-medium'>WHAT WE OFFER</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-9 space-5">
            {features.map((feature, index) => (
                <FeatureCard key={index} summary={feature.summary} description={feature.description} status={feature.status} style={{backgroundColor: featureColors[index % featureColors.length], }}/>
            ))}
        </div>
    </div>
}

const FeatureCard = ({summary, description, status, style}:{summary: string, description: string, status: string, style?: React.CSSProperties})=>{
  return <div className="flex flex-col justify-between p-2 md:p-4 border-2 border-slate-900 rounded-xl md:rounded-2xl shadow-[10px_10px_0_rgba(0,0,0,0)] shadow-slate-900 hover:-rotate-1 hover:scale-105 hover:transition-transform duration-100" style={style}>
    <section>
      <div className='w-[20%] min-w-6 aspect-square rounded-lg bg-slate-900/10 border-2 border-slat shadow-[6px_6px_0_rgba(0,0,0,0)] shadow-slate-900 mb-4'>

      </div>
    </section>
    <section className='flex flex-col gap-2 '>

      <h3 className="font-semibold text-lg md:text-xl">{summary}</h3>
      <p className="text-sm font-normal">{description}</p>
    </section>

    <section className='mt-7'>
      <p className={cn('text-sm font-medium capitalize w-fit p-2 py-1 border-2', status === 'available' ? 'border-green-500 text-green-500' : 'border-yellow-500 text-yellow-500')}>{status}</p>

    </section>
  </div>}

const Tag = ({children, className, style}:{children: ReactNode, className?: string, style?: React.CSSProperties})=>{
  return <div className={`flex items-center  border-2 border-slate-950 p-1 w-fit gap-2 px-2 rounded-full ${className}`} style={style}>
    <p className=' '>{children}</p>
    </div>
  
}

const targetAudience = [
  "Content creators",
  "Telegram community owners",
  "WhatsApp group admins",
  "Online coaches",
  "Course creators",
  "Crypto communities",
  "Trading communities",
  "Membership communities",
  "Exclusive fan communities",
  "Digital entrepreneurs",
  "Educators",
  "Mentorship programs",
  "Mastermind communities",
  "Startup founders",
  "Fitness communities",
  "Gaming communities",
  "Freelancer communities",
  "Online bootcamps",
  "Subscription-based communities",
  "Community-led businesses",
];

const complementaryColors = [
  "#FF5B04", // vivid orange
  "#FF7A00", // sunset orange
  "#FF8C42", // mango
  "#FF3D68", // vibrant pink
  "#FF4F9A", // hot rose
  "#E94057", // watermelon
  "#C445FF", // electric purple
  "#8B5CF6", // neon violet
  "#6C63FF", // playful indigo
  "#4F46E5", // royal blue
  "#2563EB", // bright blue
  "#00A6FB", // sky pop
  "#06B6D4", // aqua cyan
  "#00C2A8", // mint teal
  "#00B894", // tropical green
  "#22C55E", // fresh green
  "#84CC16", // lime burst
  "#F59E0B", // golden amber
  "#EF4444", // bold coral red
  "#FB7185", // candy pink
];

const CustomerProfile = ()=>{
  return <div className='flex flex-col   w-full p-3 gap-5 md:gap-10 xl:flex-row md:justify-between mt-8 bg-gray-200'>

    <div className='flex flex-col justify-between gap-20 flex-1 w-full xl:w-[40%] min-w-[300px] max-h-fit relative bg-amber-300/60 p-3'>

    <h1 className=' font-semibold text-start tracking-wide leading-relaxed text-xl sm:text-3xl md:text-4xl xl:text-5xl'>{"We are building for anyone serious about their community.".toUpperCase()}</h1>
    <Button className='bg-black self-end w-full max-w-[400px] p-2 py-3 h-auto text-lg md:text-xl'>Join Waitlist</Button>
    </div>
    <div className='flex-1 w-full xl:w-[50%] min-w-[300px] flex flex-col gap-5 md:gap-10'>

      <p className='flex-1 text-justify opacity-90 font-medium leading-relaxed text-lg sm:text-xl md:text-2xl'>
        If you're tired of redundant and repetitive onboarding and payment processes or 
        you need a centralized funnel to collect all membership payments while you get notifications 
        on payments and a dashboard to manage members. This is for you.
      </p>
      <div className='flex flex-wrap gap-3 mt-5'>
        {
          targetAudience.map((ta, index)=>(
            <Tag key={index} className='font-medium text-sm md:text-base' style={{backgroundColor: complementaryColors[index % complementaryColors.length]}}>{ta}</Tag>
          ))
        }
      </div>
    </div>
  </div>
}



export default LandingPage
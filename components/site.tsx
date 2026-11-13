'use client'

import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Heart, Mail, Menu, Phone, ShieldCheck, Sparkles, Users, X } from 'lucide-react'
import { FrequentlyAskedQuestions } from '@/components/frequently-asked-questions'

const logo = '/Nurse%20Ability%20Care%20Logo.png'
const ndisLogo = '/We%20Love%20ndis.png'
const whatsapp = 'https://wa.me/61403612209?text=Hello%20Nurse%20Ability%20Care%2C%20I%20would%20like%20to%20know%20more%20about%20your%20support%20services.'
const appointmentWhatsapp = 'https://wa.me/61403612209?text=hey%20i%20want%20to%20book%20a%2030min%20free%20appointment'
const stanley = 'https://wa.me/917795601255?text=Hey%20Stanley%2C%20i%20saw%20Nurse%20ability%20care%20Website%2C%20i%20also%20want%20to%20design%20a%20Similar%20one'
const navigationLinks = [['Home', '/'], ['About Us', '/about'], ['Services', '/services'], ['Careers', '/careers'], ['Contact Us', '/contact']]

const services = [
  ['Assist Personal Activities High', 'Nurse-led assistance for eligible complex personal care needs.'],
  ['Assist-Personal Activities', 'Respectful help with personal care and everyday routines.'],
  ['Assist-Travel/Transport', 'Support to get to appointments and community activities.'],
  ['Community Nursing Care', 'Registered Nurse assessment and disability-related clinical support.'],
  ['Daily Tasks', 'Practical help and skill-building for everyday life at home.'],
  ['Innov Community Participation', 'Personalised support to build skills and community connections.'],
  ['Household Tasks', 'Help with meal preparation and household routines.'],
  ['Participate Community', 'Support to enjoy activities and connect with your community.'],
  ['Group/Centre Activities', 'Group activities for social connection, learning and belonging.'],
]

const serviceHighlights: Record<string, string[]> = {
  'Assist Personal Activities High': [
    'Support is considered after an individual assessment and review of relevant care plans.',
    'We confirm worker competencies, clinical arrangements and capacity before services commence.',
    'Support is delivered in line with agreed safety procedures and your preferences.',
  ],
  'Assist-Personal Activities': [
    'Help with showering, dressing, grooming, toileting and personal routines.',
    'Support that respects your privacy, dignity, culture and preferred routine.',
    'Encouragement to build independence and do as much as you choose for yourself.',
  ],
  'Assist-Travel/Transport': [
    'Assistance to attend health appointments, errands and essential services.',
    'Support to get to social, recreational and community activities.',
    'Travel arrangements and any applicable charges are discussed in advance.',
  ],
  'Community Nursing Care': [
    'Individual assessment and care planning for eligible disability-related health needs.',
    'Nursing supports may include wound, catheter, stoma, continence, diabetes and medication support.',
    'With your consent, we can coordinate with your treating health professionals.',
  ],
  'Daily Tasks': [
    'Assistance with meal preparation, daily routines and practical tasks.',
    'Support to plan activities and practise skills at a pace that suits you.',
    'A focus on confidence, choice and doing things as independently as possible.',
  ],
  'Innov Community Participation': [
    'Explore hobbies, interests, learning and new experiences.',
    'Build confidence, skills and meaningful connections in your community.',
    'Activities are planned with you around your goals and preferences.',
  ],
  'Household Tasks': [
    'Help with cleaning, laundry, meal preparation and household organisation.',
    'Routines tailored to your needs and what matters to you at home.',
    'Practical support to maintain a comfortable, welcoming living space.',
  ],
  'Participate Community': [
    'Attend social, cultural, recreational and community activities.',
    'Support to pursue interests, maintain relationships and try new experiences.',
    'Plans shaped around your choices, access needs and goals.',
  ],
  'Group/Centre Activities': [
    'Opportunities for social connection, shared interests and learning.',
    'Activities selected to suit your preferences and support needs.',
    'Participation is discussed with you and arranged subject to availability.',
  ],
}

export function Header() {
  return <>
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand"><img src={logo} alt="Nurse Ability Care — Empowering care, enabling life" /></Link>
        <nav className="nav-links desktop-nav" aria-label="Main navigation">
          {navigationLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <Link className="button button-primary nav-cta" href="/contact">Enquire now</Link>
        </nav>
        <details className="mobile-nav-menu">
          <summary className="menu-button" aria-label="Toggle navigation">
            <Menu className="menu-open-icon" aria-hidden="true" />
            <X className="menu-close-icon" aria-hidden="true" />
            <span className="sr-only">Toggle navigation</span>
          </summary>
          <nav className="mobile-navigation-panel" aria-label="Mobile navigation">
            {navigationLinks.map(([label, href]) => <Link key={href} href={href} onClick={event => event.currentTarget.closest('details')?.removeAttribute('open')}>{label}</Link>)}
            <Link className="button button-primary nav-cta" href="/contact" onClick={event => event.currentTarget.closest('details')?.removeAttribute('open')}>Enquire now</Link>
          </nav>
        </details>
      </div>
    </header>
  </>
}

export function Footer() { return <footer className="footer"><div className="container footer-grid">
  <div className="footer-brand-column"><img className="footer-logo" src={logo} alt="Nurse Ability Care" /><div className="footer-brand-row"><p className="footer-copy">Clinical expertise and compassionate, personalised support to help people build independence and live life on their own terms.</p><img className="ndis-logo" src={ndisLogo} alt="We Love NDIS" /></div><div className="footer-socials" aria-label="Social media"><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.6v3.1h2.7v8z" fill="currentColor" /></svg></a><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.8" cy="6.5" r="1.2" fill="currentColor" /></svg></a><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.7H2.3V21h2.9zM3.8 3a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4M21.7 13.9c0-3.7-2-5.4-4.7-5.4a4.1 4.1 0 0 0-3.7 2v-1.8h-2.9V21h2.9v-6.1c0-1.6.3-3.2 2.4-3.2s2.1 1.9 2.1 3.3V21h2.9z" fill="currentColor" /></svg></a><a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8M9.6 15.6V8.4l6.3 3.6z" fill="currentColor" /></svg></a></div></div>
  <div><h3>Explore</h3><div className="footer-links"><Link href="/">Home</Link><Link href="/about">About Us</Link><Link href="/careers">Careers</Link><Link href="/contact">Contact Us</Link></div></div>
  <div><h3>Services</h3><div className="footer-links"><Link href="/services">All services</Link>{services.slice(0, 4).map(([title]) => <Link href="/services" key={title}>{title}</Link>)}</div></div>
  <div><h3>Get in touch</h3><div className="footer-links"><a href="tel:+61403612209"><Phone /> +61 403 612 209</a><a href="tel:+61430829992"><Phone /> +61 430 829 992</a><a href="mailto:admin@nurseabilitycare.com.au"><Mail /> admin@nurseabilitycare.com.au</a><Link href="/contact" className="footer-action">Start a conversation <ArrowRight /></Link></div></div>
</div><div className="copyright">© 2026 Nurse Ability Care. All rights reserved. <span><Link href="/privacy">Privacy Policy</Link> · <Link href="/terms">Terms of Use</Link></span></div><div className="developer">Designed &amp; Developed with <span aria-label="love">💜</span> by <a href={stanley} target="_blank" rel="noopener noreferrer">Stanley Nuthalpati</a></div></footer> }

export function FloatingContact() { return <div className="floating-contact"><a className="float-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Message Nurse Ability Care on WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.5a12.2 12.2 0 0 0-10.4 18.6L4 28l6.1-1.6A12.3 12.3 0 1 0 16 3.5Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M12 10.5c-.3-.7-.6-.7-.9-.7h-.8c-.3 0-.7.1-1 .5s-1.3 1.3-1.3 3.2 1.3 3.7 1.5 4 2.6 4.1 6.4 5.6c3.2 1.3 3.8 1 4.5.9s2.2-.9 2.5-1.8.3-1.7.2-1.8-.3-.3-.7-.5l-2.5-1.2c-.3-.1-.6-.2-.8.2-.2.3-.9 1.2-1.1 1.5s-.4.3-.8.1a10 10 0 0 1-3-1.9 11.3 11.3 0 0 1-2.1-2.6c-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.7.1-.2.1-.5 0-.7Z" fill="currentColor"/></svg></a><a className="float-phone" href="tel:+61403612209" aria-label="Call Nurse Ability Care"><Phone /></a></div> }

export function AppointmentModal({ onClose }: { onClose: () => void }) {
  function closeFromButton(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()
    onClose()
  }

  function closeFromBackdrop(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose()
  }

  return <div className="modal-backdrop" role="presentation" onClick={closeFromBackdrop}><section className="appointment-modal appointment-intro" role="dialog" aria-modal="true" aria-labelledby="appointment-title" onClick={event => event.stopPropagation()}>
    <button className="modal-close" type="button" onPointerDown={closeFromButton} onClick={closeFromButton} aria-label="Close appointment window"><X /></button>
    <div className="appointment-intro-content">
      <img className="appointment-photo" src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85" alt="A healthcare professional offering attentive support" />
      <div className="appointment-intro-copy"><p className="eyebrow">A gentle first step</p><h2 id="appointment-title">Let’s Talk About Your Care Needs 💜</h2><p>Your journey towards personalised support starts here. Connect with our team for a free 30-minute conversation about your needs, goals, and available support options.</p><a className="button button-primary" href={appointmentWhatsapp} target="_blank" rel="noopener noreferrer">Book Your Free Appointment <ArrowRight /></a><span className="appointment-supporting">Free <i>•</i> No obligation <i>•</i> Personalised guidance</span></div>
    </div>
  </section></div>
}

function PageShell({ children }: { children: React.ReactNode }) { const [appointment, setAppointment] = useState(false); return <><Header />{children}<Footer /><FloatingContact />{appointment && <AppointmentModal onClose={() => setAppointment(false)} />}</> }

export function HomePage() {
  const [appointment, setAppointment] = useState(false)
  const appointmentShown = useRef(false)

  useEffect(() => {
    let touchStartY: number | null = null
    let previousScrollY = window.scrollY
    let scrollTriggerReady = false
    const scrollReadyTimer = setTimeout(() => {
      previousScrollY = window.scrollY
      scrollTriggerReady = true
    }, 700)

    function removeTriggerListeners() {
      window.removeEventListener('wheel', openAfterScrollIntent)
      window.removeEventListener('scroll', onWindowScroll)
      document.removeEventListener('touchstart', onTouchStart, true)
      document.removeEventListener('touchmove', onTouchMove, true)
      document.removeEventListener('touchend', onTouchEnd, true)
      document.removeEventListener('scroll', onWindowScroll, true)
    }

    function openAfterScrollIntent() {
      removeTriggerListeners()
      if (appointmentShown.current) return
      appointmentShown.current = true
      setAppointment(true)
    }

    function onWindowScroll() {
      const currentScrollY = window.scrollY
      const moved = Math.abs(currentScrollY - previousScrollY)
      previousScrollY = currentScrollY
      if (scrollTriggerReady && moved > 4) openAfterScrollIntent()
    }

    function onTouchStart(event: TouchEvent) {
      touchStartY = event.touches[0]?.clientY ?? null
    }

    function onTouchMove(event: TouchEvent) {
      const touchY = event.touches[0]?.clientY
      if (touchStartY !== null && touchY !== undefined && Math.abs(touchStartY - touchY) > 12) openAfterScrollIntent()
    }

    function onTouchEnd(event: TouchEvent) {
      const touchY = event.changedTouches[0]?.clientY
      if (touchStartY !== null && touchY !== undefined && Math.abs(touchStartY - touchY) > 12) openAfterScrollIntent()
      touchStartY = null
    }

    window.addEventListener('wheel', openAfterScrollIntent, { passive: true })
    window.addEventListener('scroll', onWindowScroll, { passive: true })
    document.addEventListener('scroll', onWindowScroll, { passive: true, capture: true })
    document.addEventListener('touchstart', onTouchStart, { passive: true, capture: true })
    document.addEventListener('touchmove', onTouchMove, { passive: true, capture: true })
    document.addEventListener('touchend', onTouchEnd, { passive: true, capture: true })
    return () => {
      clearTimeout(scrollReadyTimer)
      removeTriggerListeners()
    }
  }, [])

  function closeAppointment() {
    setAppointment(false)
  }

  return <><Header /><main><section className="hero"><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow">Nurse-led support, centred around you</p><h1>Care that empowers you to <em>live life your way.</em></h1><p className="lead">At Nurse Ability Care, we combine clinical expertise with compassionate, personalised support to help you build independence, pursue your goals and participate more confidently in everyday life.</p><div className="hero-actions"><Link className="button button-primary" href="/contact">Start a conversation <ArrowRight /></Link><Link className="button button-secondary" href="/services">Explore our services</Link></div><div className="trust-row"><span><ShieldCheck /> Respectful &amp; safe</span><span><Heart /> Person-centred</span></div></div><div className="hero-art"><div className="art-card"><Sparkles /><span>Support that sees the whole you</span></div><div className="art-circle"><img className="hero-nurse" src="/Nurse.png" alt="Nurse ready to provide compassionate care" /></div><div className="art-note"><strong>Your goals.</strong><br />Your choices. Your future.</div></div></div></section><section className="values section"><div className="container"><div className="section-heading centered"><p className="eyebrow">Why choose us</p><h2>Care starts with understanding you.</h2></div><div className="value-grid">{[['Person-Centred Care','Your preferences, culture and goals shape the support we provide.'],['Clinically Informed Support','Experienced nursing perspective, delivered with warmth and practical understanding.'],['Choice, Control & Independence','Build skills, confidence and capability at your own pace.'],['Compassionate Service','A respectful partnership where you feel heard, valued and supported.']].map(([title, text], i) => <div className="value-card" key={title}><div className="value-icon">{[<Heart key="h" />,<ShieldCheck key="s" />,<Users key="u" />,<Sparkles key="p" />][i]}</div><h3>{title}</h3><p>{text}</p></div>)}</div></div></section><section className="about-preview section"><div className="container split-grid"><div className="accent-panel"><span>01</span><h3>Clinical knowledge.<br />Human connection.</h3><div className="line"></div><p>We meet people where they are and work alongside them towards what matters most.</p></div><div><p className="eyebrow">About Nurse Ability Care</p><h2>Care that starts with understanding you.</h2><p>Founded and led by two Registered Nurses, Nurse Ability Care combines clinical expertise with personalised disability support. We put your goals, strengths and choices at the centre of care—empowering you to build independence and live life on your terms.</p><Link className="text-link" href="/about">Learn more about us <ArrowRight /></Link></div></div></section><ServicesOverview /><section className="process section"><div className="container"><div className="section-heading centered"><p className="eyebrow">Our approach</p><h2>Your goals. Your choices. Your future.</h2></div><div className="process-grid">{[['01','Understand your needs','We listen to your circumstances, goals, preferences and aspirations.'],['02','Plan personalised support','Together, we explore suitable assistance and agree on an individualised approach.'],['03','Support your independence','We work towards meaningful outcomes, practical skills, confidence and participation.']].map(([num,title,text]) => <div className="process-step" key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section><FrequentlyAskedQuestions /><section className="cta"><div className="container cta-inner"><div><p className="eyebrow">Let’s talk</p><h2>Support that fits your life.</h2><p>Book a complimentary 30-minute conversation to discuss your circumstances and explore the next step.</p></div><button className="button button-light" onClick={() => { appointmentShown.current = true; setAppointment(true) }}>Book your free appointment <ArrowRight /></button></div></section></main><Footer /><FloatingContact />{appointment && <AppointmentModal onClose={closeAppointment} />}</>
}

export function ServicesOverview() { return <section className="services section"><div className="container"><div className="section-heading"><p className="eyebrow">How we can help</p><h2>Support for everyday living.</h2><p>Individualised services designed to help you feel more confident, connected and in control.</p></div><div className="service-grid">{services.slice(0,6).map(([title,text],i) => <Link href="/services" className="service-card" key={title}><span className="service-number">0{i+1}</span><h3>{title}</h3><p>{text}</p><span className="card-arrow"><ArrowRight /></span></Link>)}</div><Link className="button button-secondary centered-button" href="/services">View all services <ArrowRight /></Link></div></section> }

export type ContactSubmissionStatus = 'sent' | 'invalid' | 'failed' | 'not-configured'

export function InnerPage({
  type,
  initialSubmission,
}: {
  type: 'about'|'services'|'careers'|'contact'
  initialSubmission?: ContactSubmissionStatus
}) {
  const [appointment, setAppointment] = useState(false)
  const titles = {
    about: ['Compassionate care. Clinical expertise. Individual choice.', 'Supporting people to build independence, strengthen their capabilities, and live life on their own terms.'],
    services: ['Support designed around your life.', 'Explore practical, respectful support that meets you where you are.'],
    careers: ['Build a career that makes a meaningful difference.', 'Join a team committed to compassionate support, clinical excellence, dignity and participant choice.'],
    contact: ['Let’s start a conversation about your support needs.', 'Contact us for a complimentary conversation about your goals, circumstances and the support that may be right for you.'],
  }[type]

  return <PageShell><main>
    <section className="inner-hero"><div className="container">
      <p className="eyebrow">{type === 'about' ? 'Who we are' : type === 'services' ? 'Our services' : type === 'careers' ? 'Join our team' : 'Get in touch'}</p>
      <h1>{titles[0]}</h1><p className="lead">{titles[1]}</p>
    </div></section>
    {type === 'about' && <AboutContent onAppointment={() => setAppointment(true)} />}
    {type === 'services' && <section className="section"><div className="container">
      <div className="service-grid full-services">{services.map(([title, text], i) => <article className="service-card detailed" key={title}>
        <span className="service-number">{String(i + 1).padStart(2, '0')}</span>
        <h2>{title}</h2><p>{text}</p>
        <details className="service-details">
          <summary><span>View support details</span><span aria-hidden="true">+</span></summary>
          <ul>{serviceHighlights[title].map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
        </details>
        <Link className="text-link" href="/contact">Ask us about this service <ArrowRight /></Link>
      </article>)}</div>
      <div className="services-information">
        <div><h2>Support shaped around you</h2><p>We start by understanding your goals, routines, strengths, cultural preferences and support needs. Together, we discuss what is suitable, how you want support delivered and the outcomes that matter to you.</p></div>
        <div><h2>Clear, coordinated care</h2><p>Before services begin, we discuss your service agreement, rates, payment arrangements and any applicable travel or cancellation charges. With your consent, we can work alongside family, carers, your plan manager, support coordinator and treating health professionals.</p></div>
      </div>
      <div className="scope-note"><ShieldCheck /><p>We currently welcome self-managed and plan-managed NDIS participants for supports within our service scope. Availability depends on assessed needs, worker competencies, clinical arrangements and capacity. We are not currently accepting NDIA-managed funding. Contact us to confirm suitability and availability.</p></div>
    </div></section>}
    {type === 'careers' && <CareersContent />}
    {type === 'contact' && <ContactContent initialSubmission={initialSubmission} />}
    {appointment && <AppointmentModal onClose={() => setAppointment(false)} />}
  </main></PageShell>
}

function AboutContent({ onAppointment }: { onAppointment: () => void }) {
  return <section className="section"><div className="container narrow-content">
    <p>Founded and led by two Registered Nurses, Nurse Ability Care combines clinical expertise with personalised disability support. We put your goals, strengths and choices at the centre of care—empowering you to build independence and live life on your terms.</p>
    <div className="content-grid">
      <div><h2>Our mission</h2><p>Our mission is to help you build a life that reflects what matters to you. We provide thoughtful, reliable support that strengthens confidence, everyday skills, independence and connection with your community.</p></div>
      <div><h2>Our approach to care</h2><p>We begin by listening and learning about your routines, strengths, culture and goals. Together, we agree on the support that suits you, review what is working and adapt as your needs or priorities change.</p></div>
      <div><h2>Clinical expertise, made personal</h2><p>Our Registered Nurse leadership brings assessment and clinical insight to disability support, including eligible nursing needs. We follow agreed care plans, communicate clearly and only provide supports that match our skills, arrangements and capacity.</p></div>
      <div><h2>Our Commitment</h2><p>Your voice. Your choices. Your goals. We are committed to safe, respectful and inclusive support that upholds your rights, dignity and control. Working alongside you, we support meaningful community participation and outcomes that matter to you.</p></div>
    </div>
    <button className="button button-primary" onClick={onAppointment}>Book a free appointment <ArrowRight /></button>
  </div></section>
}
function CareersContent() { return <section className="section"><div className="container careers-invitation"><div className="careers-copy"><p className="eyebrow">Work with purpose</p><h2>Bring your care, communication and curiosity.</h2><p>We value people who are compassionate, reliable, collaborative and committed to participant choice. If you share those values, we would love to hear from you.</p><div className="check-list"><p><Check /> Compassion and integrity</p><p><Check /> Clear communication and teamwork</p><p><Check /> Relevant experience and qualifications</p><p><Check /> A commitment to learning</p></div><a className="button button-primary careers-join" href={whatsapp} target="_blank" rel="noopener noreferrer">Join Now <ArrowRight /></a></div></div></section> }
function ContactContent({ initialSubmission }: { initialSubmission?: ContactSubmissionStatus }) {
  const [isSending, setIsSending] = useState(false)
  const isSendingRef = useRef(false)
  const [feedback, setFeedback] = useState<{ type: 'error'; message: string } | null>(() => {
    if (!initialSubmission || initialSubmission === 'sent') return null
    const messages: Record<Exclude<ContactSubmissionStatus, 'sent'>, string> = {
      invalid: 'Please check the required details and privacy consent.',
      failed: 'We could not send your enquiry just now. Please try again or contact our team directly.',
      'not-configured': 'Email delivery is not configured yet. Please contact our team by phone or email.',
    }
    return { type: 'error', message: messages[initialSubmission] }
  })
  const [confirmationOpen, setConfirmationOpen] = useState(initialSubmission === 'sent')

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSendingRef.current) return
    isSendingRef.current = true
    const form = event.currentTarget
    const formData = new FormData(form)
    setIsSending(true)
    setFeedback(null)
    setConfirmationOpen(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.get('fullName'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          serviceOfInterest: formData.get('serviceOfInterest'),
          message: formData.get('message'),
          website: formData.get('website'),
          privacyConsent: formData.get('privacyConsent') === 'on',
        }),
      })
      const result: unknown = await response.json().catch(() => null)
      const errorMessage =
        typeof result === 'object' && result !== null && 'error' in result && typeof result.error === 'string'
          ? result.error
          : 'We could not send your enquiry just now. Please try again or contact our team directly.'

      if (!response.ok) throw new Error(errorMessage)

      form.reset()
      setConfirmationOpen(true)
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'We could not send your enquiry. Please contact our team directly.',
      })
    } finally {
      isSendingRef.current = false
      setIsSending(false)
    }
  }

  return <><section className="section"><div className="container split-grid contact-grid">
    <div className="contact-copy">
      <p className="eyebrow">We’re here to listen</p><h2>Your goals. Your choices. Your future.</h2>
      <p>Get in touch today to begin your journey with us. We’ll work with you to understand your circumstances and explore personalised support.</p>
      <div className="contact-details">
        <a href="tel:+61403612209"><Phone /> +61 403 612 209</a>
        <a href="tel:+61430829992"><Phone /> +61 430 829 992</a>
        <a href="mailto:admin@nurseabilitycare.com.au"><Mail /> admin@nurseabilitycare.com.au</a>
      </div>
    </div>
    <form className="form-card contact-form" action="/api/contact" method="post" onSubmit={submitEnquiry} aria-busy={isSending}>
      <h2>Send an enquiry</h2>
      <label>Full name<input name="fullName" autoComplete="name" required maxLength={120} /></label>
      <div className="contact-honeypot" aria-hidden="true">
        <label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label>Email address<input name="email" autoComplete="email" required type="email" maxLength={254} /></label>
      <label>Phone number<input name="phone" autoComplete="tel" required type="tel" maxLength={30} /></label>
      <label>Service of interest<select name="serviceOfInterest" defaultValue="Not Sure Yet" required>
        <option>Not Sure Yet</option>{services.map(([service]) => <option key={service}>{service}</option>)}
      </select></label>
      <label>Message<textarea name="message" required rows={5} maxLength={4000} /></label>
      <div className="privacy-consent">
        <label className="check-label"><input name="privacyConsent" type="checkbox" required /> I agree to the Privacy Policy.</label>
        <Link href="/privacy">Read our Privacy Policy</Link>
      </div>
      {feedback && <p className={`form-feedback ${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>{feedback.message}</p>}
      <button className="button button-primary" type="submit" disabled={isSending}>
        {isSending ? 'Sending enquiry…' : 'Send enquiry'} {!isSending && <ArrowRight />}
      </button>
    </form>
  </div></section>
  {confirmationOpen && <div className="modal-backdrop" role="presentation" onClick={event => {
    if (event.target === event.currentTarget) setConfirmationOpen(false)
  }}>
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="contact-confirmation-title">
      <button className="modal-close" type="button" onClick={() => setConfirmationOpen(false)} aria-label="Close confirmation"><X /></button>
      <div className="success-state">
        <div className="success-icon"><Check /></div>
        <h2 id="contact-confirmation-title">Enquiry sent</h2>
        <p>Thank you. Your enquiry has been sent to our team, and we’ll be in touch soon.</p>
        <button className="button button-primary" type="button" onClick={() => setConfirmationOpen(false)}>Close</button>
      </div>
    </section>
  </div>}
  </>
}
import Link from 'next/link'
import { Footer, FloatingContact, Header } from '@/components/site'

export default function PrivacyPage() {
  return <>
    <Header />
    <main>
      <section className="inner-hero">
        <div className="container">
          <p className="eyebrow">Your information</p>
          <h1>Privacy Policy</h1>
          <p className="lead">How we use information you share with Nurse Ability Care.</p>
        </div>
      </section>
      <section className="section">
        <div className="container narrow-content privacy-content">
          <h2>Contact and appointment enquiries</h2>
          <p>When you submit an enquiry, we collect the details you provide, such as your name, email address, phone number, service of interest and message. Appointment requests may also include your preferred contact method, support needs and preferred date. We use these details to respond and discuss suitable supports or an appointment.</p>
          <p>Your details are sent to Nurse Ability Care’s nominated inbox through the mail server configured for the website. The mail server handling delivery may process and temporarily store the message. Please do not include urgent, highly sensitive or detailed clinical information in these forms.</p>
          <p>Submitting a request does not confirm an appointment. For questions about your information or to request access or correction, contact <a href="mailto:admin@nurseabilitycare.com.au">admin@nurseabilitycare.com.au</a>.</p>
          <Link className="text-link" href="/contact">Contact us <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
    <Footer />
    <FloatingContact />
  </>
}

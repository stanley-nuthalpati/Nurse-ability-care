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
          <h2>Appointment enquiries</h2>
          <p>When you submit an appointment request, we collect the details you provide, such as your name, email address, phone number, preferred contact method, optional support needs and preferred date. We use these details to respond to your request and discuss a suitable time for a conversation.</p>
          <p>Appointment requests are delivered to Nurse Ability Care through EmailJS, our email delivery provider. Please do not include urgent, highly sensitive or detailed clinical information in this form.</p>
          <p>Submitting a request does not confirm an appointment. For questions about your information or to request access or correction, contact <a href="mailto:admin@nurseabilitycare.com.au">admin@nurseabilitycare.com.au</a>.</p>
          <Link className="text-link" href="/contact">Contact us <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
    <Footer />
    <FloatingContact />
  </>
}

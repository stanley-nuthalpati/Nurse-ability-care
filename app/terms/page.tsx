import Link from 'next/link'
import { Footer, FloatingContact, Header } from '@/components/site'

export default function TermsPage() {
  return <>
    <Header />
    <main>
      <section className="inner-hero">
        <div className="container">
          <p className="eyebrow">Using our website</p>
          <h1>Terms of Use</h1>
          <p className="lead">Please read these terms when using the Nurse Ability Care website.</p>
        </div>
      </section>
      <section className="section">
        <div className="container narrow-content privacy-content">
          <h2>Website information</h2>
          <p>This website provides general information about Nurse Ability Care and its services. We take care to keep the information useful and current, but it may not describe every service, eligibility requirement or individual circumstance.</p>

          <h2>Support services</h2>
          <p>Information on this website is not medical advice, a clinical assessment or a guarantee that a particular service is suitable or available. Support arrangements are discussed individually and depend on each person’s needs, agreed plans, worker availability and applicable requirements.</p>

          <h2>Enquiries and appointments</h2>
          <p>Submitting a contact or appointment enquiry does not create a service agreement or confirm an appointment. Our team will contact you to discuss your enquiry and any possible next steps.</p>

          <h2>Using this website</h2>
          <p>Please use this website lawfully and do not interfere with its operation or attempt to access it or its systems without permission. Website content is provided for personal, informational use and must not be copied or reused in a misleading way.</p>

          <h2>External websites</h2>
          <p>Links to external websites are provided for convenience. Nurse Ability Care does not control those websites and is not responsible for their content or privacy practices.</p>

          <h2>Changes and contact</h2>
          <p>We may update these terms or website content from time to time. If you have a question about these terms, please contact <a href="mailto:admin@nurseabilitycare.com.au">admin@nurseabilitycare.com.au</a>.</p>
          <Link className="text-link" href="/contact">Contact us <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
    <Footer />
    <FloatingContact />
  </>
}

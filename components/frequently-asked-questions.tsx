import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type FAQQuestion = {
  question: string
  introduction?: string
  points?: [string, string][]
  conclusion?: string
  paragraphs?: string[]
}

const questions: FAQQuestion[] = [
  {
    question: 'What services does Nurse Ability Care provide?',
    introduction:
      'We provide personalised disability supports that help you live with greater independence, comfort and confidence at home and in your community. Led by two Registered Nurses, we bring clinical expertise and a person-centred approach to your everyday support.',
    points: [
      ['Personal care and daily living', 'Support with showering, dressing, grooming, toileting and daily routines, respecting your dignity, privacy and preferences.'],
      ['Community participation', 'Assistance to attend appointments, enjoy social activities, pursue interests and build meaningful connections.'],
      ['Support at home', 'Assistance with meal preparation, household tasks and routines that help maintain a comfortable living environment.'],
      ['Disability-related nursing care', 'Individualised assessment, care planning and nursing supports to help manage eligible disability-related health needs.'],
    ],
    conclusion:
      'We work with you to tailor supports around your goals, abilities, cultural preferences and NDIS plan.',
  },
  {
    question: 'Can you support people with complex care needs?',
    introduction:
      'Yes. Our Registered Nurses can assess and deliver disability-related nursing supports for people who require more specialised care at home. Depending on your assessed needs, supports may include:',
    points: [
      ['Wound care', 'Wound assessment, dressing changes, monitoring and education.'],
      ['Catheter care', 'Support with urinary catheters, including suprapubic catheter care, monitoring and education.'],
      ['Stoma care', 'Assistance with stoma hygiene, appliance changes and surrounding skin care.'],
      ['Continence care', 'Assessment and practical strategies to support comfort, dignity and daily routines.'],
      ['Diabetes support', 'Blood glucose monitoring and prescribed subcutaneous insulin administration, where appropriate.'],
      ['Medication support', 'Assistance with prescribed medicines, within the agreed care plan and relevant clinical requirements.'],
    ],
    conclusion:
      'Before commencing, we assess your needs and confirm that we have the appropriate skills, clinical arrangements and capacity to support you safely. With your consent, we collaborate with your treating health professionals to promote coordinated care.',
  },
  {
    question: 'Which areas do you service?',
    paragraphs: [
      'We support participants across Redlands, Brisbane, Logan and the Gold Coast, delivering care in your home and community.',
      'Contact us with your suburb and the support you need so we can confirm availability, scheduling and any applicable travel charges.',
    ],
  },
  {
    question: 'Can I use my NDIS funding for your services?',
    paragraphs: [
      'We currently welcome self-managed and plan-managed NDIS participants for supports within our service scope. Your funding must cover the relevant NDIS support, and the service must relate to your disability and align with your plan.',
      'Before services begin, we work with you and, with your consent, your plan manager or support coordinator to clarify the proposed supports and payment arrangements. We are not currently accepting NDIA-managed funding.',
      'Contact us to discuss your circumstances and current service eligibility.',
    ],
  },
  {
    question: 'What makes Nurse Ability Care different?',
    paragraphs: [
      'We combine nursing expertise with support built around your life. Founded and led by two Registered Nurses with extensive clinical experience, Nurse Ability Care brings a strong focus on assessment, personalised care and recognising changes in your support needs.',
      'We take time to understand what matters to you—your routines, relationships, strengths and goals. Our approach promotes choice and control, dignity, independence and meaningful participation, with clear communication and care that respects your individual preferences.',
    ],
  },
  {
    question: 'Can I choose how my supports are delivered and involve people I trust?',
    paragraphs: [
      'Absolutely. Your voice guides your care. We work with you to agree on how, when and where your supports are delivered, within service availability and safe care requirements.',
      'You can tell us your preferences about routines, communication, cultural needs and the people providing your support. With your consent, we can involve family, carers, your nominee, an advocate or other professionals.',
      'You can also raise concerns, request changes or provide feedback at any time. We welcome your input and use it to improve your experience.',
    ],
  },
  {
    question: 'How much do services cost, and will I know the charges upfront?',
    paragraphs: [
      'We explain the costs before you agree to services, so you can make informed decisions about your supports and budget. Your service agreement outlines the agreed services, rates, payment arrangements and any applicable travel or cancellation charges.',
      'Where NDIS price limits apply, our charges must comply with the relevant NDIS Pricing Arrangements and Price Limits. For plan-managed participants, invoices can be sent to your nominated plan manager. For self-managed participants, invoices are provided to you or your authorised nominee.',
      'Contact Nurse Ability Care to arrange your complimentary initial assessment and explore support built around your needs and goals.',
    ],
  },
]

export function FrequentlyAskedQuestions() {
  return (
    <section className="faq section">
      <div className="container">
        <div className="faq-heading">
          <p className="eyebrow">Nurse Ability Care</p>
          <h2>Frequently asked questions</h2>
          <p>Personalised support. Nursing expertise. Your choice.</p>
          <Link className="button button-primary" href="/contact">
            Ask us a question <ArrowRight />
          </Link>
        </div>
        <div className="faq-list">
          {questions.map(({ question, introduction, points, conclusion, paragraphs }, index) => (
            <details className="faq-item" key={question}>
              <summary>
                <strong>{String(index + 1).padStart(2, '0')} {question}</strong>
                <span aria-hidden="true">+</span>
              </summary>
              {introduction && <p>{introduction}</p>}
              {points && (
                <ul>
                  {points.map(([label, detail]) => (
                    <li key={label}><strong>{label}:</strong> {detail}</li>
                  ))}
                </ul>
              )}
              {paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              {conclusion && <p>{conclusion}</p>}
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

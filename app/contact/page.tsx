import { InnerPage, type ContactSubmissionStatus } from '@/components/site'

const submissionStatuses: ContactSubmissionStatus[] = ['sent', 'invalid', 'failed', 'not-configured']

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ submission?: string | string[] }>
}) {
  const { submission } = await searchParams
  const initialSubmission =
    typeof submission === 'string'
      ? submissionStatuses.find(status => status === submission)
      : undefined

  return <InnerPage type="contact" initialSubmission={initialSubmission} />
}

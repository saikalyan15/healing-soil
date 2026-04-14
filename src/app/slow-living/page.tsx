import { permanentRedirect } from 'next/navigation'

export default function SlowLivingPage() {
  permanentRedirect('/blog')
}

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { redirect } from 'next/navigation'

export default async function IndexPage() {
  const id = nanoid()
  const user = await auth()
    if (!user) {
      redirect(`/sign-in`)
    } else {
      return <Chat id={id} />
    }
}

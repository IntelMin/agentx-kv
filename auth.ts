import { jsonResponse, verifyToken } from '@/lib/utils'
import { cookies } from 'next/headers'
import { kv } from '@vercel/kv'
import { type User } from '@/lib/types'

export const auth = async () => {
  const address = cookies().get('address')?.value || ''
  const web3jwt = cookies().get('web3jwt')?.value || ''

  const validToken = await verifyToken(web3jwt, address)
  console.log('web3jwt:', web3jwt )
  console.log('validToken:', validToken )
  if (web3jwt && validToken) {

    const user = await kv.get(address) as User
    if (user) return user
    return null;
  } else {
    if (address) cookies().delete('address')
    if (web3jwt) cookies().delete('web3jwt')
  }

  return null
}

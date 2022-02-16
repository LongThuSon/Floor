// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import users from './users.json'

type IUser = {
  id: number,
  username: string,
  firstname: string,
  lastname: string,
  quantity: number,
  numberTable: number,
  phone: string,
  eventTag: string,
  deposit: string,
  status: number,
  timeOrder: number,
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUser[]>
) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(users)
      break
    case 'PUT':
      //...
      break
    default:
      res.status(405).end() //Method Not Allowed
      break
  }
  
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type ITable = {
  id: number,
  numberTable: number,
  seat: number,
  status: number,
  percent: number,
  timeOrder: number,
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ITable[]>
) {
  res.status(200).json(
    [
      {
        "numberTable": 105,
        "timeOrder": 6,
        "status": 5,
        "seat": 0,
        "percent": 0,
        "id": 1
      },
      {
        "numberTable": 106,
        "timeOrder": 6,
        "status": 5,
        "seat": 0,
        "percent": 0,
        "id": 2
      },
      {
        "numberTable": 107,
        "timeOrder": 6,
        "status": 5,
        "seat": 0,
        "percent": 0,
        "id": 3
      },
      {
        "numberTable": 108,
        "timeOrder": 6,
        "status": 5,
        "seat": 0,
        "percent": 0,
        "id": 4
      },
      {
        "numberTable": 109,
        "timeOrder": 6,
        "status": 5,
        "seat": 0,
        "percent": 0,
        "id": 5
      },
      {
        "numberTable": 110,
        "timeOrder": 6,
        "status": 5,
        "seat": 0,
        "percent": 0,
        "id": 6
      },
      {
        "numberTable": 111,
        "timeOrder": 6,
        "status": 5,
        "seat": 0,
        "percent": 0,
        "id": 7
      },
      {
        "numberTable": 112,
        "timeOrder": 6,
        "status": 5,
        "seat": 0,
        "percent": 0,
        "id": 8
      },
      {
        "numberTable": 113,
        "timeOrder": 6,
        "status": 5,
        "seat": 0,
        "percent": 0,
        "id": 9
      },
      {
        "numberTable": 114,
        "timeOrder": 6,
        "status": 5,
        "seat": 0,
        "percent": 0,
        "id": 10
      },
      {
        "numberTable": 115,
        "timeOrder": 6,
        "status": 5,
        "seat": 0,
        "percent": 0,
        "id": 11
      },
      {
        "numberTable": 116,
        "timeOrder": 6,
        "status": 5,
        "seat": 0,
        "percent": 0,
        "id": 12
      },
      {
        "numberTable": 117,
        "timeOrder": 6,
        "status": 5,
        "seat": 0,
        "percent": 0,
        "id": 13
      },
      {
        "numberTable": 118,
        "timeOrder": 6,
        "status": 5,
        "seat": 0,
        "percent": 0,
        "id": 14
      },
      {
        "numberTable": 119,
        "timeOrder": 6,
        "status": 5,
        "seat": 0,
        "percent": 0,
        "id": 15
      },
      {
        "numberTable": 120,
        "timeOrder": 6,
        "status": 5,
        "seat": 0,
        "percent": 0,
        "id": 16
      },
      {
        "numberTable": 121,
        "timeOrder": 6,
        "status": 5,
        "seat": 0,
        "percent": 0,
        "id": 17
      },
      {
        "numberTable": 122,
        "timeOrder": 6,
        "status": 5,
        "seat": 0,
        "percent": 0,
        "id": 18
      }
    ]
  )
}

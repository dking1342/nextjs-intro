// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { posts } from '../../../data/postsData'
import { Post } from '../../../types/posts'

// type Data = {
//   posts: Post[]
// }



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) {
  res.status(200).json(posts)
}

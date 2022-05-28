// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { posts } from '../../../data/postsData'
import { Post } from '../../../types/posts'

interface Data {
  message: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | Data>
) {
  const id = Number(req.query.id);
  const post = posts.filter(post=> post.id === id);

  if(post.length){
    res.status(200).json(post[0])
  } else {
    res.status(404).json({ message: `Post with id of ${id} was not found` })
  }
}

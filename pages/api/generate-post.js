   // pages/api/generate-post.js
   import { GroqClient } from '@groq/groq-sdk';

   export default async function handler(req, res) {
     if (req.method === 'POST') {
       const { pastPosts, newTopic } = req.body;

       const client = new GroqClient({ apiKey: process.env.GROQ_API_KEY });

       const prompt = `Based on the following three LinkedIn posts:

   ${pastPosts.join('\n\n')}

   Generate a new LinkedIn post about the topic: ${newTopic}. The new post should maintain a similar style and tone to the provided posts.`;

       try {
         const completion = await client.chat.completions.create({
           messages: [{ role: 'user', content: prompt }],
           model: 'mixtral-8x7b-32768',
         });

         const generatedPost = completion.choices[0]?.message?.content;

         res.status(200).json({ generatedPost });
       } catch (error) {
         console.error('Error generating post:', error);
         res.status(500).json({ error: 'Failed to generate post' });
       }
     } else {
       res.setHeader('Allow', ['POST']);
       res.status(405).end(`Method ${req.method} Not Allowed`);
     }
   }

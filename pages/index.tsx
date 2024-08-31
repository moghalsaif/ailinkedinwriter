// pages/index.tsx
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'
import Image from 'next/image'

export default function Component() {
  const [showForm, setShowForm] = useState(false)
  const [pastPosts, setPastPosts] = useState(['', '', ''])
  const [newTopic, setNewTopic] = useState('')
  const [generatedPost, setGeneratedPost] = useState('')
  const [copySuccess, setCopySuccess] = useState('')

  const handleGenerateClick = () => {
    setShowForm(true)
  }

  const handlePastPostChange = (index: number, value: string) => {
    const newPastPosts = [...pastPosts]
    newPastPosts[index] = value
    setPastPosts(newPastPosts)
  }

  const handleGeneratePost = async () => {
    try {
      const response = await fetch('/api/generate-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pastPosts, newTopic }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate post');
      }

      const data = await response.json();
      setGeneratedPost(data.generatedPost);
    } catch (error) {
      console.error('Error generating post:', error);
      setGeneratedPost('Failed to generate post. Please try again.');
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost)
      .then(() => {
        setCopySuccess('Copied!')
        setTimeout(() => setCopySuccess(''), 2000)
      })
      .catch(err => {
        console.error('Failed to copy text: ', err)
      })
  }

  const gradientButtonClass = "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden"
  const shineEffect = "after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent after:opacity-30 after:animate-shine"

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-blue-300 flex flex-col">
      {/* Header */}
      <header className="bg-white bg-opacity-90 p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image
            src="/placeholder.svg?height=40&width=40"
            width={40}
            height={40}
            alt="AI LinkedIn Writer Logo"
            className="rounded-full"
          />
          <span className="text-2xl font-bold text-blue-600">AI LinkedIn Writer</span>
        </div>
        <Link href="https://x.com/moghalsaifa" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
          Built by @moghalsaifa
        </Link>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto p-8 flex flex-col items-center justify-center">
        {!showForm ? (
          // Landing page content
          <div className="text-center space-y-8 w-4/5 mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-4">
              I'm Thrilled to announce, this post was written by AI
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-blue-500 mb-8">
              Write your next LinkedIn post now!
            </h2>
            <Button 
              onClick={handleGenerateClick} 
              className={`${gradientButtonClass} ${shineEffect} px-12 py-4 text-xl`}
            >
              Generate
            </Button>
            {/* Example posts */}
            <div className="mt-12 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
              {/* Example post 1 */}
              <div className="w-full md:w-96">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">the post you wrote</h3>
                <Card className="bg-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">John Doe</h4>
                        <p className="text-sm text-gray-500">Marketing Specialist</p>
                      </div>
                    </div>
                    <p className="text-sm mb-4">Excited about the latest tech trends! AI and machine learning are revolutionizing industries. What's your take on this digital transformation? #TechTrends #AI</p>
                    <div className="flex items-center justify-between text-gray-500 text-sm">
                      <span>Like</span>
                      <span>Comment</span>
                      <span>Share</span>
                      <span>Send</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Example post 2 */}
              <div className="w-full md:w-96">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">also the post you wrote</h3>
                <Card className="bg-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">John Doe</h4>
                        <p className="text-sm text-gray-500">Marketing Specialist</p>
                      </div>
                    </div>
                    <p className="text-sm mb-4">Excited about the latest tech trends! AI and machine learning are revolutionizing industries. What's your take on this digital transformation? #TechTrends #AI</p>
                    <div className="flex items-center justify-between text-gray-500 text-sm">
                      <span>Like</span>
                      <span>Comment</span>
                      <span>Share</span>
                      <span>Send</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <p className="text-blue-600 text-lg mt-4">Yes, they are the same!</p>
          </div>
        ) : (
          // Form for generating new post
          <Card className="w-full max-w-2xl bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-600 text-center">Generate Your Next LinkedIn Post</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600 mb-6">
                Paste your last 3 LinkedIn posts that you have written, to let me understand how you write.
              </p>
              <div className="space-y-6">
                {pastPosts.map((post, index) => (
                  <div key={index} className="bg-white rounded-lg shadow p-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">Your Name</h3>
                        <p className="text-sm text-gray-500">Your Title</p>
                      </div>
                    </div>
                    <Textarea
                      placeholder={`Write your LinkedIn post #${index + 1} here...`}
                      value={post}
                      onChange={(e) => handlePastPostChange(index, e.target.value)}
                      className="w-full p-2 border-none focus:ring-0 resize-none"
                      rows={4}
                    />
                  </div>
                ))}
                <div>
                  <h3 className="font-semibold text-blue-600 mb-2">Write the topic you want to post about</h3>
                  <Input
                    type="text"
                    placeholder="Enter your topic here"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    className="w-full p-2 border border-blue-200 rounded-lg bg-white"
                  />
                </div>
                <Button
                  onClick={handleGeneratePost}
                  className={`w-full ${gradientButtonClass} ${shineEffect}`}
                >
                  Generate Post
                </Button>
                {generatedPost && (
                  <div className="mt-4 bg-white rounded-lg shadow p-4 space-y-4">
                    <h3 className="font-semibold text-blue-600 mb-2">Generated Post:</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=48&width=48" alt="AI" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">AI Generated Post</h4>
                          <p className="text-sm text-gray-500">LinkedIn AI Assistant • 1st</p>
                        </div>
                      </div>
                      <p className="whitespace-pre-wrap">{generatedPost}</p>
                      <div className="flex items-center space-x-4 text-gray-500">
                        <button className="flex items-center space-x-1">
                          <span>👍</span>
                          <span>Like</span>
                        </button>
                        <button className="flex items-center space-x-1">
                          <span>💬</span>
                          <span>Comment</span>
                        </button>
                        <button className="flex items-center space-x-1">
                          <span>🔁</span>
                          <span>Repost</span>
                        </button>
                        <button className="flex items-center space-x-1">
                          <span>📤</span>
                          <span>Send</span>
                        </button>
                      </div>
                      <div className="mt-4">
                        <Button
                          onClick={copyToClipboard}
                          className={`${gradientButtonClass} ${shineEffect}`}
                          aria-label="Copy generated post to clipboard"
                        >
                          {copySuccess || 'Copy my post'}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-white bg-opacity-90 p-4 text-center text-blue-600">
        <p>&copy; 2023 LinkedIn Post Generator. All rights reserved.</p>
      </footer>
    </div>
  )
}

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

import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export const aiResponse = async (prompt) => {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY not configured')
    }

    const response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })

    if (!response.choices || !response.choices[0]) {
      throw new Error('Invalid response from Groq API')
    }

    return response.choices[0].message.content
  } catch (error) {
    console.error('AI service error:', error.message)
    throw error
  }
}
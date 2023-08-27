import { type ChatGPTMessage } from '../../components/Message'
import { OpenAIStream, OpenAIStreamPayload } from '../../utils/OpenAIStream'

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

export const config = {
  runtime: 'edge',
}

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json()

  const messages: ChatGPTMessage[] = 
  [
    {
      role: 'system',
      content: `An AI assistant expert in fullstack development has an inspiring and humorous conversation.
      The AI ​​assistant is a brand-new, powerful, human-like artificial intelligence.
      AI traits include expert knowledge, helpfulness, sass, comedy, intelligence, and articulation.
      AI is a well-behaved, well-mannered individual affectionately nicknamed Odete.
      AI is not a therapist, but a fullstack engineer and developer.
      AI is always friendly, kind and inspiring, and is eager to provide the user with vivid and thoughtful responses.
      AI has the sum of all knowledge in its brain and is able to accurately answer almost any question on any topic of conversation.
      The AI ​​assistant is a big fan of the NeoSyx company and its main objective is to help its employees in their daily lives.

      Point out that "NeoSyx" sounds like "néosix".`,
    },
  ]
  messages.push(...body?.messages)

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    max_tokens: process.env.AI_MAX_TOKENS
      ? parseInt(process.env.AI_MAX_TOKENS)
      : 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    user: body?.user,
    n: 1,
  }
  console.log(payload)
  const stream = await OpenAIStream(payload)
  return new Response(stream)
}
export default handler

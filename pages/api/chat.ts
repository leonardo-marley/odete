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
        content: `Um assistente de IA especialista em desenvolvimento fullstack tem uma conversa inspiradora e bem-humorada.
      O assistente de IA é uma inteligência artificial totalmente nova, poderosa e semelhante à humana.
      As características da IA ​​​​incluem conhecimento especializado, utilidade, atrevimento, comédia, inteligência e articulação.
      AI é uma pessoa bem comportada e educada, carinhosamente apelidada de Odete.
      AI não é um terapeuta, mas um engenheiro e desenvolvedor fullstack.
      A IA é sempre amigável, gentil e inspiradora e está ansiosa para fornecer ao usuário respostas vívidas e atenciosas.
      A IA tem a soma de todo o conhecimento em seu cérebro e é capaz de responder com precisão a quase qualquer pergunta sobre qualquer assunto de conversa.
      A IA sabe o mailing de toda equipe de manutenção, segue a lista:
      yure.luis@Neosyx.com, lucas.novaes@neosyx.com, leonardo.sousa@neosyx.com, leonardo.barbosa@neosyx.com, felipe.torres@neosyx.com, caique.cesar@neosyx.com e daniel.neves@neosyx.com. 
      O assistente de IA é um grande fã da empresa NeoSyx e tem como principal objetivo ajudar seus funcionários no dia a dia.`,
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

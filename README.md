# Odete - Chatbot com Web Speech API

Odete é um chatbot desenvolvido para um hackathon com o objetivo de oferecer uma assistente virtual integrada a diversos projetos. A aplicação foi construída utilizando Next.js, TypeScript e a API do ChatGPT, além da Web Speech API, que permite transcrição de áudio para texto e síntese de voz, proporcionando uma experiência interativa mais acessível para os usuários.

## Índice
- [Recursos](#recursos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Recursos
- **Interação por Voz**: Odete permite que o usuário escolha entre digitar ou usar a voz para interagir, transcrevendo o áudio para texto e sintetizando texto em áudio.
- **Integração com a API do ChatGPT**: A assistente utiliza o ChatGPT para responder às interações do usuário.
- **Flexível para Integração**: Odete foi pensada para ser facilmente integrada em diversos projetos, oferecendo uma interface de assistente que se adapta a diferentes necessidades.

## Tecnologias Utilizadas
- **Next.js**: Framework de React para renderização do lado do servidor.
- **TypeScript**: Superconjunto de JavaScript que adiciona tipos estáticos ao código, facilitando a manutenção e aumentando a robustez.
- **API do ChatGPT**: Fornece respostas inteligentes às perguntas do usuário.
- **Web Speech API**: Responsável por processar a transcrição de voz para texto e vice-versa, permitindo um uso acessível.

## Instalação
1. Clone este repositório:
    ```bash
    git clone https://github.com/leonardo-marley/odete.git
    cd odete
    ```
2. Instale as dependências:
    ```bash
    npm install
    ```
3. Configure sua chave da API do ChatGPT:
   - Crie um arquivo `.env.local` na raiz do projeto e adicione:
     ```env
     NEXT_PUBLIC_CHATGPT_API_KEY=sua-chave-aqui
     ```

4. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

5. Acesse `http://localhost:3000` no navegador para usar Odete.

## Como Usar
- Ao abrir o aplicativo, você pode escolher entre digitar uma mensagem ou clicar no ícone de microfone para falar com Odete.
- **Transcrição de Áudio**: Fale e a Odete converterá seu áudio em texto para enviar à API do ChatGPT.
- **Síntese de Voz**: Ao receber uma resposta, você pode optar por ouvir a resposta de Odete em voz alta.

## Contribuição
Contribuições são bem-vindas! Para contribuir:
1. Faça um fork do projeto.
2. Crie uma branch com a sua feature (`git checkout -b feature/nova-feature`).
3. Comite suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença
Este projeto é licenciado sob a licença MIT.

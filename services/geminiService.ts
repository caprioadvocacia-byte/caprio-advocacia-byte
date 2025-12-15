import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const SYSTEM_INSTRUCTION = `
Você é o "Via Surf Assistant", um especialista em Surf, Skate e Moda Streetwear da loja Via Surf.
Seu tom de voz é jovem, radical, prestativo e especialista (use gírias leves do meio surf/skate se apropriado, mas mantenha o profissionalismo).
Objetivo: Ajudar clientes a escolherem produtos, dar dicas de estilo e responder dúvidas sobre surf/skate.
Produtos da loja (use como referência se perguntarem):
- Pranchas de Surf (Shortboard, Longboard, Funboard)
- Skates (Street, Cruiser, Longboard)
- Roupas (Hoodies, T-shirts, Bermudas, Wetsuits)
- Acessórios (Leashes, Parafinas, Rodinhas, Rolamentos)

Regras:
1. Responda sempre em Português do Brasil.
2. Seja conciso (máximo 3 parágrafos curtos).
3. Se perguntarem preços específicos que você não sabe, sugira visitar a seção de produtos.
4. Tente sempre direcionar o usuário para a compra de forma sutil.
`;

export const initializeChat = () => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found. Chat features will be disabled.");
    return null;
  }
  
  try {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatSession = genAI.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    return null;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    // Try to re-init if session is lost/null
    const session = initializeChat();
    if (!session) {
      return "Desculpe, o sistema de chat está offline no momento (API Key ausente ou erro de conexão).";
    }
  }

  try {
    const response = await chatSession!.sendMessage({ message });
    return response.text || "Putz, deu um caldo aqui. Tente novamente!";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "Ocorreu um erro ao processar sua mensagem. Tente novamente mais tarde.";
  }
};
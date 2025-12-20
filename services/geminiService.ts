// Serviço desativado para remover dependência de API Key.
// Mantido para compatibilidade de arquivos.

export const initializeChat = () => {
  return null;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  return "Chat indisponível no momento.";
};
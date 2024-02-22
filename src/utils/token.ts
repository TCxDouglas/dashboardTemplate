export const verifyToken = (token: string) => {
  try {
    // Dividir el token en sus partes (encabezado, payload, firma)
    const [_, payloadCodificado, __] = token.split('.');

    const payload = JSON.parse(atob(payloadCodificado)) as Record<string, number>;

    const nowInSeconds = Math.floor(Date.now() / 1000);

    return !(payload.exp && payload.exp < nowInSeconds);
  } catch (error) {
    console.error('Error al decodificar el token:', error);

    return false;
  }
};

export const generateUID = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

import jwt from "jsonwebtoken";

export function authMiddleware(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Token não fornecido." });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, "secreta-chave");
    request.user = decoded; 
    return next();
  } catch (error) {
    return response.status(401).json({ message: "Token inválido." });
  }
}
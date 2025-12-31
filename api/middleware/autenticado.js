const { verify, decode } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Verifica se o header foi enviado
    if (!authHeader) {
        return res.status(401).json({
            message: "Access token não informado"
        });
    }

    // Verifica se está no formato Bearer token
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
        return res.status(401).json({
            message: "Token mal formatado"
        });
    }

    try {
        // Valida o token
        verify(token, jsonSecret.secret);

        // Decodifica os dados
        const { id, email } = decode(token);

        // Injeta no request
        req.usuarioId = id;
        req.usuarioEmail = email;

        return next();
    } catch (error) {
        return res.status(401).json({
            message: "Usuário não autenticado"
        });
    }
};

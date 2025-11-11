export default function errorHandler(err, req, res, next) {
  console.error('🔥 ERRO CAPTURADO:', err);

  // Status code e mensagem padrão
  let status = 500;
  let message = 'Erro interno no servidor.';

  // Códigos de erro específicos do Prisma
  if (err.code) {
    switch (err.code) {
      case 'P2002': // Unique constraint(Está querendo incluir algo no banco de dados que é único)
        status = 409;
        message = `O campo '${err.meta?.target?.join(', ')}' já está em uso.`;
        break;

      case 'P2025': // Registro não encontrado
        status = 404;
        message = 'O registro solicitado não foi encontrado.';
        break;

      case 'P2003': // Violação de chave estrangeira
        status = 400;
        message = 'Operação inválida: relacionamento inconsistente.';
        break;

      case 'P2000': // Valor muito longo
        status = 400;
        message = 'Um dos campos excede o tamanho máximo permitido.';
        break;

      case 'P2005': // Tipo de dado inválido
        status = 400;
        message = 'Valor inválido para um dos campos.';
        break;

      case 'P2036': // Timeout
        status = 503;
        message = 'Tempo limite da operação excedido.';
        break;

      default:
        message = `Erro do banco de dados (${err.code}).`;
        break;
    }
  }

  // --- TRATAMENTO DE ERROS CUSTOMIZADOS (lançados no service) ---
  if (err.statusCode) {
    status = err.statusCode;
    message = err.message || message;
  }

  // --- RETORNA RESPOSTA ---
  return res.status(status).json({ error: message });
}
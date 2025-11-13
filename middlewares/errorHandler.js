export default function errorHandler(err, req, res, next) {
  console.error('ERRO CAPTURADO NO SERVIDOR:', err);

  // status code e mensagem padrão
  let status = 500;
  let message = 'Erro interno no servidor.';

  // códigos de erro específicos do Prisma
  if (err.code) {
    switch (err.code) {
      case 'P2002': // unique constraint(está querendo incluir algo no banco de dados que é único)
        status = 409;
        message = `O campo '${err.meta?.target?.join(', ')}' já está em uso no banco de dados.`;
        break;

      case 'P2025': // registro não encontrado
        status = 404;
        message = 'O registro solicitado não foi encontrado.';
        break;

      case 'P2003': // violação de chave estrangeira
        status = 400;
        message = 'Operação inválida: relacionamento inconsistente.';
        break;

      case 'P2000': // valor muito longo
        status = 400;
        message = 'Um dos campos excede o tamanho máximo permitido.';
        break;

      case 'P2005': // tipo de dado inválido
        status = 400;
        message = 'Valor inválido para um dos campos.';
        break;

      case 'P2036': // timeout
        status = 503;
        message = 'Tempo limite da operação excedido.';
        break;

      default:
        message = `Erro do banco de dados (${err.code}).`;
        break;
    }
  }

  // erros customizados (os que são tratados e lançados dentro do service)
  if (err.statusCode) {
    status = err.statusCode;
    message = err.message || message;
  }

  return res.status(status).json({ error: message });
}
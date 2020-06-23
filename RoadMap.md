# Mapeamento de features do sistema

## Recuperação de senha

**RF**
(Requisitos funcionais)

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**
(Requisitos não funcionais)

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (deve ocorrer em background job - em segundo plano/fila);

**RN**
(Regras de negócio)

- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;


## Atualização do perfil

**RF**

- O usuário deve poder atualizar seu perfil;

**RNF**

- / -

**RN**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;









## Painel do prestador

**RF**

- O prestador deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas

**RNF**

- Os agendamentos do prestador devem ser armazenadas em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;


## Agendamento de serviços

**RF**

- O usuário não pode listar os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com dia disponível para entrega;
- O usuário deve poder listar turno disponível para entrega;
- O usuário deve poder realizar um novo agendamento;

**RNF**

- / -

**RN**

- Os agendamentos devem ser separados por turnos (manhã, tarde e noite);
- Os agendamentos devem estar disponíveis entre 7h às 20h (Primeiro às 7h, último às 20h);
- O usuário só pode agendar para 8h após o horário da realiação do pedido (essas 8h constam de acordo com nosso horário de funcionamento descrito acima);
- O usuário não pode agendar em um horário que já passou;

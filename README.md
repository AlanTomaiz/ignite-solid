## 📚 GYMPASS style app
<p align="center">
  <a href="LICENSE"><img  src="https://img.shields.io/static/v1?label=License&message=MIT&color=5965e0&labelColor=202024" alt="License"></a>
  <img alt="lastcommit" src="https://img.shields.io/github/last-commit/alantomaiz/ignite-solid?color=%235761C3" />
  <a href="https://www.linkedin.com/in/alantomaiz/"><img alt="AlanTomaiz" src="https://img.shields.io/badge/-AlanTomaiz-5965e0?style=flat&logo=Linkedin&logoColor=white" /></a>
</p>

## 🚀 Tecnologias
Tecnologias e ferramentas utilizadas no desenvolvimento do projeto:
* [Typescript](https://www.typescriptlang.org/)
* [Fastify](https://fastify.dev/)
* [Vitest](https://vitest.dev/)
* [Prisma](https://www.prisma.io/)
* [Zod](https://zod.dev/)

#### RFs (Requisitos funcionais)
- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter os dados do usuário autenticado;
- [x] Deve ser possível obter o número total de check-ins realizados;
- [x] Deve ser possível obter o histórico de check-in;
- [x] Deve ser possível buscar academias próximas (Max 10km);
- [x] Deve ser possível buscar academias por nome;
- [x] Deve ser possível realizar check-in em uma academia;
- [x] Deve ser possível validar check-in de um usuário;
- [x] Deve ser possível cadastrar academia;

#### RNs (Regras de negócios)
- [x] O usuário não deve poder se cadastrar com e-mail duplicado;
- [x] O usuário não deve realizar dois check-in ao mesmo dia;
- [x] O usuário não deve realizar check-in a mais de 100m da academia;
- [x] O check-in só deve ser validado até 20 minutos após ser criado;
- [ ] O check-in só deve ser validado por administradores;
- [ ] A academia só deve ser cadastrada por administradores;

#### RNFs (Requisitos não-funcionais)
- [x] A do usuário deve ser criptografada;
- [x] Os dados da aplicação deve ser mantigos em PostgreSQL;
- [x] Listas devem ser páginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por JWT;

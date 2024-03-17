# GYMPASS style app

## RFs (Requisitos funcionais)
- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter os dados do usuário autenticado;
- [ ] Deve ser possível obter o número de check-in realizado;
- [ ] Deve ser possível obter o histórico de check-in;
- [ ] Deve ser possível buscar academias próximas;
- [ ] Deve ser possível buscar academias por nome;
- [ ] Deve ser possível realizar check-in em uma academia;
- [ ] Deve ser possível validar check-in de um usuário;
- [ ] Deve ser possível cadastrar academia;

## RNs (Regras de negócios)
- [x] O usuário não deve poder se cadastrar com e-mail duplicado;
- [ ] O usuário não deve realizar dois check-in ao mesmo dia;
- [ ] O usuário não deve realizar check-in a mais de 100m da academia;
- [ ] O check-in só deve ser validado até 20 minutos após ser criado;
- [ ] O check-in só deve ser validado por administradores;
- [ ] A academia só deve ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)
- [x] A do usuário deve ser criptografada;
- [x] Os dados da aplicação deve ser mantigos em PostgreSQL;
- [ ] Listas devem ser páginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por JWT;

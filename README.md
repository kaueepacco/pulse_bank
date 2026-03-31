# Pulse Bank

Aplicacao web que simula um app bancario simples com login mock, dashboard financeiro e transferencias com validacao.

## Stack

- React + Vite
- React Router
- React Query
- Zustand
- Tailwind CSS
- Zod + React Hook Form

## Funcionalidades

- Login mock com protecao basica contra tentativas invalidas
- Dashboard com saldo disponivel e lista de transacoes
- Transferencia com validacao de formulario e senha dedicada
- Sessao com expiracao por inatividade
- Persistencia local via `localStorage`

## Como rodar

```bash
npm install
npm run dev
```

## Credenciais mock

- Email: `cliente@pulsebank.com`
- Senha: `123456`
- Senha de transferencia: `4321`

## Observacoes

- O projeto nao usa backend real neste momento.
- Os dados sao simulados no front-end e persistidos no navegador com `localStorage`.
- Mudancas em `src/lib/mockData.js` so aparecem automaticamente quando ainda nao existe estado salvo no navegador.

## Build de producao

```bash
npm run build
npm run preview
```

# Guardião do Foco (Opus Focus 2)

[![Tecnologia](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Estilo](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Banco de Dados](https://img.shields.io/badge/Supabase-latest-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![UI Component Library](https://img.shields.io/badge/Radix_UI-3-white?style=for-the-badge&logo=radix&logoColor=white)](https://www.radix-ui.com/)

## Visão Geral

Guardião do Foco é um aplicativo gamificado para gerenciamento de foco e produtividade, inspirado na estética e mecânicas do jogo Age of Empires. O projeto utiliza uma abordagem de "gamificação" para transformar o gerenciamento de tarefas e o foco em uma experiência envolvente e motivadora.

O aplicativo permite que os usuários gerenciem suas tarefas diárias, conquistem "territórios" em um mapa hexagonal, ganhem pontos por completar atividades, e defendam-se da "Névoa da Distração" através de um sistema de equilíbrio entre foco e recreação.

## Características Principais

### 🏰 Quartel General (QG)
- Hub central do aplicativo onde os usuários podem acessar todas as funcionalidades
- Visualização de recursos atuais (pontos de foco e recreação)
- Acesso ao Mapa do Dia, Tarefas, Conquistas e Configurações

### 🗺️ Mapa do Dia
- Mapa hexagonal gerado diariamente com diferentes desafios e tarefas
- Sistema de conquista territorial onde cada hexágono representa uma atividade
- Sistema de "Névoa da Distração" que desafia o usuário a manter o foco
- Modo de recreação programada para balancear foco e descanso

### ✅ Gerenciador de Tarefas
- Criação, edição e conclusão de tarefas de diferentes tipos:
  - Leitura
  - Vídeos do YouTube
  - Código
  - NotebookLM
  - Cursos
- Filtragem e pesquisa avançada de tarefas
- Sistema de dificuldade (fácil, médio, difícil) e pontuação
- Diferentes métodos de validação de conclusão

### 📊 Sistema de Recursos
- Pontos de Foco: ganhos ao completar tarefas e hexágonos no mapa
- Pontos de Recreação: acumulados durante períodos de foco, usados para períodos de descanso
- Sistema de humor que afeta a eficiência e a geração de recursos

## Tecnologias Utilizadas

- **Frontend**: Next.js 15.2, React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase (Autenticação, Banco de Dados PostgreSQL, Storage)
- **UI/UX**: Radix UI, Lucide React (ícones), Custom Age of Empires-inspired components
- **State Management**: React Context API, Custom Hooks
- **Outros**: date-fns, react-hook-form, zod

## Tema Visual

O aplicativo segue uma estética inspirada no jogo Age of Empires, com:
- Paleta de cores escura com detalhes dourados (aoe-dark-blue, aoe-gold)
- Fonte Cinzel para títulos e cabeçalhos (estilo medieval/antigo)
- Componentes personalizados inspirados na UI do Age of Empires (botões, painéis, recursos)
- Grade hexagonal para o mapa do dia

## Estrutura do Projeto

```
opus-focus-2/
├── app/                    # Páginas e rotas (Next.js App Router)
│   ├── api/                # Endpoints da API
│   ├── forgot-password/    # Recuperação de senha
│   ├── login/              # Autenticação
│   ├── qg/                 # Quartel General (hub principal)
│   ├── register/           # Registro de usuários
│   ├── tasks/              # Gerenciamento de tarefas
│   └── war-room/           # Mapa do dia (sala de guerra)
├── components/             # Componentes React reutilizáveis
├── contexts/               # Contextos React (AuthContext, etc.)
├── hooks/                  # Custom React hooks
├── lib/                    # Utilitários, serviços e funções auxiliares
├── public/                 # Arquivos estáticos
├── styles/                 # Estilos globais
└── types/                  # Definições de tipos TypeScript
```

## Instalação e Execução Local

### Pré-requisitos
- Node.js 18+ (recomendado: Node.js 20+)
- PNPM 8+ (Gerenciador de pacotes)
- Conta Supabase (para configurar autenticação e banco de dados)

### Configuração

1. Clone o repositório:
   ```bash
   git clone https://seu-repositorio/opus-focus-2.git
   cd opus-focus-2
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   ```

3. Configure as variáveis de ambiente (crie um arquivo `.env.local`):
   ```
   NEXT_PUBLIC_SUPABASE_URL=seu-url-supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-supabase
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

5. Acesse `http://localhost:3000` no seu navegador

## Banco de Dados

O projeto utiliza Supabase como backend com as seguintes tabelas principais:

- **users**: Autenticação e informações básicas de usuário
- **user_profiles**: Informações detalhadas do perfil, recursos, humor
- **tasks**: Tarefas do usuário com tipo, dificuldade, pontos
- **hexagons**: Elementos do mapa hexagonal diário
- **hex_connections**: Conexões entre hexágonos no mapa
- **user_hexagons**: Rastreamento de progresso do usuário no mapa
- **user_events**: Log de eventos do usuário (conclusão de tarefas, ataques de névoa, etc.)

## Roadmap e Futuras Melhorias

- Sistema de conquistas com recompensas
- Estatísticas detalhadas de foco e produtividade
- Modo multijogador para competição e cooperação
- Integração com ferramentas de produtividade externas
- Aplicativo móvel para acompanhamento em tempo real

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

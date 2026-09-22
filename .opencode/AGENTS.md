# AGENTS.md — правила проекта `rchat`

## Команды
- `npm run dev` — запуск frontend + backend
- `npm run dev:front` / `npm run dev:back` — по отдельности
- `npm run lint` — eslint (по всем workspace)
- `npm run build` — сборка

## Структура
- Monorepo (npm workspaces): `apps/client` (React 19 + Vite + TS), `apps/server` (NestJS)
- Вся клиентская логика состояния — в `apps/client/src/models/*`
- Компоненты — в `apps/client/src/components/*`, страницы — в `apps/client/src/pages/*`
- Алиас импорта в клиенте: `@/*` → `src/*`

## Mantine
- Используй компоненты Mantine, а не самописный CSS
- Отступы/размеры — только токены: `xs`, `sm`, `md`, `lg`, `xl` или CSS-переменные `--mantine-*`
- Цвета — пропсами `color` / `c` / `bg`, без hex-констант
- Диалоги с подтверждением — через `@mantine/modals`
- Иконки — из `@tabler/icons-react`

## Reatom
- Состояние — только Reatom: `atom`, `computed`, `action` из `@reatom/core`
- Каждый atom/action/computed именуется вторым аргументом
- Асинхронность — строго через `wrap()`
- В UI — `useAtom`, `useAction`, `reatomComponent` из `@reatom/react`
- Бизнес-логика — в `models/`, не в компонентах
- При любой работе с Reatom (состояние, формы, роуты, async) прочитай полный гайд: `.opencode/reatom-summary.md` — он обязателен к прочтению перед изменениями state-логики
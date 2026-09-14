# Segurança da PetLoja

## Estado atual

O front-end usa apenas `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Essas variáveis são públicas por definição e a segurança deve ser garantida por autenticação, autorização e RLS no Supabase.

## Regra de acesso recomendada

- Visitantes (`anon`) podem ler produtos e imagens públicas.
- Usuários autenticados comuns não podem criar, editar ou excluir produtos.
- Apenas usuários com `app_metadata.role = "admin"` podem escrever em `products` e no bucket `product-images`.
- Nunca usar `service_role` no navegador, em componentes React ou em variáveis `NEXT_PUBLIC_*`.

## RLS

O arquivo `supabase/security/001_petloja_rls.sql` contém a baseline recomendada para:

- `public.products`
- `storage.objects` no bucket `product-images`

A migration não é executada automaticamente. Ela deve ser aplicada no projeto Supabase correto da PetLoja depois de confirmar que a conta administrativa possui `app_metadata.role = "admin"`.

## Administração

O middleware atual valida sessão antes de permitir `/admin`, mas o controle de autorização por papel também precisa existir. A proteção definitiva não pode depender de esconder a página ou os botões do front-end; o Supabase deve negar as operações de escrita por RLS.

Depois de configurar `app_metadata.role = "admin"` no projeto correto, o próximo passo recomendado é adicionar uma verificação server-side de papel à rota `/admin`.

## Uploads

O front-end limita imagens de produto a:

- JPEG
- PNG
- WEBP
- máximo de 5 MB

O Storage também deve ter políticas RLS que impeçam uploads, alterações e exclusões por usuários não administradores.

## Headers HTTP

O projeto configura headers básicos de segurança no `next.config.ts`, incluindo:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`
- `Cross-Origin-Opener-Policy`
- HSTS

## Segredos

`.env`, `.env*.local` e arquivos PEM já estão ignorados pelo Git. Não adicione chaves privadas, `service_role`, senhas ou tokens ao repositório.

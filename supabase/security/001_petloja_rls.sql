-- PetLoja - baseline de segurança Supabase
-- Aplique SOMENTE no projeto Supabase usado pela PetLoja.
-- Antes de aplicar, defina app_metadata.role = 'admin' para a conta administrativa.

begin;

-- Helper seguro: o usuário comum não consegue alterar app_metadata diretamente.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- Produtos: leitura pública, escrita apenas para admin autenticado.
alter table public.products enable row level security;

-- Remove políticas com os mesmos nomes para permitir reaplicação segura.
drop policy if exists "products_public_read" on public.products;
drop policy if exists "products_admin_insert" on public.products;
drop policy if exists "products_admin_update" on public.products;
drop policy if exists "products_admin_delete" on public.products;

create policy "products_public_read"
on public.products
for select
to anon, authenticated
using (true);

create policy "products_admin_insert"
on public.products
for insert
to authenticated
with check (public.is_admin());

create policy "products_admin_update"
on public.products
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "products_admin_delete"
on public.products
for delete
to authenticated
using (public.is_admin());

-- Storage: o bucket product-images pode continuar público para leitura.
-- Upload, alteração e exclusão ficam restritos ao admin.
drop policy if exists "product_images_public_read" on storage.objects;
drop policy if exists "product_images_admin_insert" on storage.objects;
drop policy if exists "product_images_admin_update" on storage.objects;
drop policy if exists "product_images_admin_delete" on storage.objects;

create policy "product_images_public_read"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'product-images');

create policy "product_images_admin_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'product-images'
  and public.is_admin()
);

create policy "product_images_admin_update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'product-images'
  and public.is_admin()
)
with check (
  bucket_id = 'product-images'
  and public.is_admin()
);

create policy "product_images_admin_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'product-images'
  and public.is_admin()
);

commit;

-- Validação sugerida após aplicar:
-- 1. Visitante deve conseguir SELECT em products.
-- 2. Visitante não deve conseguir INSERT/UPDATE/DELETE.
-- 3. Usuário autenticado sem app_metadata.role=admin também deve falhar nas escritas.
-- 4. Admin autenticado deve conseguir publicar e excluir produtos e imagens.
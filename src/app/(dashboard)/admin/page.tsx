"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { HiOutlineCloudUpload, HiOutlineTrash } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { authService } from "@/services/authService";
import { productService } from "@/services/productService";
import { useToast } from "@/hooks/useToast";                 // ✅ IMPORTAR
import { ConfirmModal } from "@/components/ui/ConfirmModal"; // ✅ IMPORTAR

export default function AdminPanel() {
  const { showToast } = useToast(); // ✅ USAR TOAST
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [discountBadge, setDiscountBadge] = useState("");
  const [sizesString, setSizesString] = useState("");
  const [categorySlug, setCategorySlug] = useState("racoes");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ MODAL DE LOGOUT
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // ✅ MODAL DE DELETAR
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const fetchProducts = async () => {
    const { data } = await productService.getAll();
    setProducts(data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ LOGOUT
  const handleLogout = async () => {
    setShowLogoutModal(false);
    await authService.logout();
    window.location.href = "/";
  };

  // ✅ DELETAR
  const confirmDelete = (id: string, name: string) => {
    setDeleteTarget({ id, name });
  };

  const handleDeleteProduct = async () => {
    if (!deleteTarget) return;
    const { id, name } = deleteTarget;
    const { error } = await productService.delete(id);
    setDeleteTarget(null);

    if (error) {
      showToast('error', 'Erro ao deletar', 'Tente novamente mais tarde.');
      return;
    }

    showToast('success', 'Produto deletado!', `${name} foi removido.`);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // ✅ UPLOAD IMAGEM
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ✅ CRIAR PRODUTO
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      showToast('warning', 'Selecione uma imagem', 'É necessário uma foto para o produto.');
      return;
    }
    if (!name.trim()) {
      showToast('warning', 'Nome obrigatório', 'Digite o nome do produto.');
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      showToast('warning', 'Preço inválido', 'Digite um preço válido.');
      return;
    }

    setLoading(true);

    const productData = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      old_price: oldPrice ? parseFloat(oldPrice) : null,
      discount_badge: discountBadge?.trim() || null,
      category_slug: categorySlug,
      sizes: sizesString ? sizesString.split(",").map(s => s.trim()).filter(Boolean) : [],
    };

    const { data, error } = await productService.create(productData, imageFile);

    setLoading(false);

    if (error) {
      showToast('error', 'Erro ao salvar', 'Tente novamente mais tarde.');
      return;
    }

    showToast('success', 'Produto cadastrado! 🎉', `${name} foi adicionado.`);
    setName("");
    setDescription("");
    setPrice("");
    setOldPrice("");
    setDiscountBadge("");
    setSizesString("");
    setCategorySlug("racoes");
    setImageFile(null);
    setImagePreview(null);

    fetchProducts();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* CABEÇALHO */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <HiOutlineCloudUpload className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-slate-800">Painel de Estoque</h1>
              <p className="text-xs text-slate-500">Cadastre e gerencie seus produtos</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs transition-colors cursor-pointer"
          >
            <FiLogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>

        {/* FORMULÁRIO */}
        <form onSubmit={handleCreateProduct} className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nome */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nome do Produto <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Ração Golden Especial"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                required
              />
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Categoria <span className="text-red-500">*</span>
              </label>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-white cursor-pointer"
              >
                <option value="racoes">🦴 Rações</option>
                <option value="petiscos">🍖 Petiscos</option>
                <option value="brinquedos">🧸 Brinquedos</option>
                <option value="higiene">✨ Higiene & Estética</option>
                <option value="acessorios">👔 Acessórios</option>
                <option value="medicamentos">💊 Medicamentos</option>
              </select>
            </div>

            {/* Preços */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preço (R$) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={price}onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preço Antigo
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={oldPrice}
                  onChange={(e) => setOldPrice(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Descrição */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Descrição <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Descrição detalhada do produto..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 resize-none transition-all"
                required
              />
            </div>

            {/* Tag e Tamanhos */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tag de Desconto
              </label>
              <input
                type="text"
                placeholder="Ex: 34% OFF"
                value={discountBadge}
                onChange={(e) => setDiscountBadge(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tamanhos
              </label>
              <input
                type="text"
                placeholder="1kg, 2.5kg, 10kg"
                value={sizesString}
                onChange={(e) => setSizesString(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              />
              <p className="text-[10px] text-slate-400 mt-0.5">Separe por vírgula</p>
            </div>

            {/* Upload de Imagem */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Foto do Produto <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1 w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer text-slate-500 transition-all"
                    required
                  />
                  <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP até 5MB</p></div>
                {imagePreview && (
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0 bg-slate-50">
                    <Image src={imagePreview} alt="Preview" fill className="object-contain p-1" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all disabled:bg-slate-300 text-sm shadow-sm cursor-pointer active:scale-[0.98]"
          >
            {loading ? 'Publicando...' : '📦 Publicar Produto'}
          </button>
        </form>

        {/* LISTA DE PRODUTOS */}
        <div className="border-t border-slate-100 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-black text-slate-800 mb-4">
            Gerenciar Produtos
            <span className="ml-2 text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              {products.length}
            </span>
          </h2>

          {products.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8">Nenhum produto cadastrado.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-1">
              {products.map((product) => (
                <div key={product.id} className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-100 transition-colors">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white border border-slate-200 flex-shrink-0">
                    <Image
                      src={product.image_url || "https://placehold.co/100x100?text=Pet+Loja"}
                      alt={product.name}
                      fill
                      sizes="48px"
                      className="object-contain p-1"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.srcset = "";
                        target.src = "https://placehold.co/100x100?text=Pet+Loja";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-slate-800 truncate">{product.name}</h3>
                    <p className="text-[10px] text-slate-500">
                      {formatPrice(product.price)}
                      <span className="ml-1 text-[9px] uppercase text-slate-400">• {product.category_slug}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => confirmDelete(product.id, product.name)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all cursor-pointer flex-shrink-0"
                    title="Deletar Produto"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL LOGOUT */}
      <ConfirmModal
        isOpen={showLogoutModal}
        title="Sair do Painel"
        message="Deseja realmente sair do Painel Administrativo?"
        confirmText="Sair"
        cancelText="Cancelar"
        confirmVariant="danger"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />

      {/* MODAL DELETAR */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Deletar Produto"
        message={`Tem certeza que deseja excluir o produto "${deleteTarget?.name}"?`}
        confirmText="Deletar"
        cancelText="Cancelar"
        confirmVariant="danger"
        onConfirm={handleDeleteProduct}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
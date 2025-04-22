import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItem, updateItem, createItem, deleteItem } from "../lib/api";

interface ItemForm {
  name: string;
  category: string;
  stock: number;
  description: string;
}

export default function EditInventoryPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState<ItemForm>({
    name: "",
    category: "",
    stock: 0,
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      
      getItem(Number(id))
        .then(data => setForm(data))
        .catch(() => setError("Failed to fetch item"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id, isEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      if (isEdit) {
        await updateItem(Number(id), form);
      } else {
        await createItem(form);
      }
      navigate("/inventory");
    } catch {
      setError("Failed to save item");
    } finally {
      
    }
  }

  async function handleDelete() {
    if (!isEdit) return;
    
    try {
      await deleteItem(Number(id));
      navigate("/inventory");
    } catch {
      setError("Failed to delete item");
    } finally {
      
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-white py-10 px-2">
      <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-2xl p-10 border border-indigo-100">
        <div className="flex items-center mb-8">
          <button type="button" onClick={() => navigate('/inventory')} className="mr-3 text-indigo-600 hover:underline flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
          <h2 className="text-3xl font-extrabold text-indigo-800 flex-1 text-center drop-shadow">{isEdit ? "Edit" : "Add"} Item</h2>
        </div>
        {error && <div className="text-red-500 mb-4 text-center font-semibold bg-red-50 border border-red-200 rounded-lg py-2 px-4">{error}</div>}
        {loading ? (
          <div className="text-center text-indigo-600 font-semibold">Loading...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                className="peer border border-indigo-300 rounded-lg w-full px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg placeholder-transparent"
                placeholder="Name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <label className="absolute left-4 top-3 text-gray-400 text-base peer-focus:-top-5 peer-focus:text-xs peer-focus:text-indigo-600 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 transition-all bg-white px-1 pointer-events-none">Name</label>
            </div>
            <div className="relative">
              <input
                className="peer border border-indigo-300 rounded-lg w-full px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg placeholder-transparent"
                placeholder="Category"
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                required
              />
              <label className="absolute left-4 top-3 text-gray-400 text-base peer-focus:-top-5 peer-focus:text-xs peer-focus:text-indigo-600 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 transition-all bg-white px-1 pointer-events-none">Category</label>
            </div>
            <div className="relative">
              <input
                className="peer border border-indigo-300 rounded-lg w-full px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg placeholder-transparent"
                placeholder="Stock"
                type="number"
                value={form.stock}
                onChange={e => setForm(f => ({ ...f, stock: Number(e.target.value) }))}
                required
              />
              <label className="absolute left-4 top-3 text-gray-400 text-base peer-focus:-top-5 peer-focus:text-xs peer-focus:text-indigo-600 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 transition-all bg-white px-1 pointer-events-none">Stock</label>
            </div>
            <div className="relative">
              <textarea
                className="peer border border-indigo-300 rounded-lg w-full px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg min-h-[80px] resize-none placeholder-transparent"
                placeholder="Description"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              />
              <label className="absolute left-4 top-3 text-gray-400 text-base peer-focus:-top-5 peer-focus:text-xs peer-focus:text-indigo-600 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 transition-all bg-white px-1 pointer-events-none">Description</label>
            </div>
            <div className="flex gap-3 justify-end">
              {isEdit && (
                <button type="button" onClick={handleDelete} className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition font-semibold flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  Delete
                </button>
              )}
              <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition font-semibold flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {isEdit ? "Update" : "Create"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

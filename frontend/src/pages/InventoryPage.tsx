import  { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getItems } from "../lib/api";

interface Item {
  id: number;
  name: string;
  category: string;
  stock: number;
  description: string;
}

export default function InventoryPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);
    try {
      const data = await getItems();
      setItems(data);
    } catch (e) {
      // handle error
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-white">
      <header className="flex justify-between items-center p-6 max-w-5xl mx-auto w-full border-b border-indigo-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <h1 className="text-3xl font-bold text-indigo-700 tracking-tight">InventoryPro</h1>
        <div className="flex gap-4">
          <Link to="/" className="px-4 py-2 bg-white border border-indigo-300 text-indigo-700 rounded-lg shadow-sm hover:bg-indigo-50 transition font-medium">Home</Link>
          <Link to="/inventory/new" className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition font-medium">+ Add New Item</Link>
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 drop-shadow-sm">Inventory List</h2>
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto border border-indigo-100">
          <table className="min-w-full table-auto rounded-2xl overflow-hidden">
            <thead className="bg-indigo-50">
              <tr className="text-indigo-700 font-semibold">
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Stock</th>
                <th className="px-6 py-4 text-left">Description</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.id} className={`hover:bg-indigo-50 transition ${idx % 2 === 0 ? 'bg-white' : 'bg-indigo-50/50'}`}> 
                  <td className="px-6 py-4 text-gray-800">{item.name}</td>
                  <td className="px-6 py-4 text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 text-gray-600">{item.stock}</td>
                  <td className="px-6 py-4 text-gray-500">{item.description}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => navigate(`/inventory/edit/${item.id}`)}
                      className="px-3 py-1 bg-amber-500 text-white rounded-lg shadow-sm hover:bg-amber-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm('Delete this item?')) {
                          await import('../lib/api').then(({ deleteItem }) => deleteItem(item.id));
                          fetchItems();
                        }
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <div className="p-6 text-center text-indigo-500 font-medium">Loading...</div>}
          {!loading && items.length === 0 && <div className="p-6 text-center text-gray-500 font-medium">No items found.</div>}
        </div>
      </main>
    </div>
  );
}

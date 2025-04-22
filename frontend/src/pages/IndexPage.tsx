import { Link } from "react-router-dom";

export default function IndexPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-white">
      <header className="flex justify-between items-center p-6 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-indigo-700 tracking-tight">InventoryPro</h1>
        <Link to="/inventory" className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition font-medium">Inventory</Link>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl font-extrabold text-indigo-800 mb-4 drop-shadow">All your inventory, <span className='text-blue-500'>one place</span>.</h2>
        <p className="mb-8 text-xl text-gray-600 max-w-xl mx-auto">Easily manage, track, and update your inventory with a beautiful, modern interface. Built for speed and simplicity.</p>
        <Link to="/inventory" className="inline-block px-8 py-4 bg-indigo-600 text-white text-lg rounded-xl shadow-lg hover:bg-indigo-700 transition font-semibold">Get Started</Link>
      </main>
      <footer className="w-full py-4 bg-indigo-50 text-center text-gray-500 text-sm border-t">&copy; {new Date().getFullYear()} InventoryPro. All rights reserved.</footer>
    </div>
  );
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
      <h1 className="text-4xl font-bold text-brand-black mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Página no encontrada / Page not found</p>
      <a 
        href="/" 
        className="bg-brand-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-blue/90 transition-colors"
      >
        Volver al inicio / Go home
      </a>
    </div>
  );
}

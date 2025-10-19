// app/components/NavbarServer.jsx
export default function NavbarServer() {
  return (
    <nav>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="grid grid-rows-2">
          <h1>Ramen del</h1>
          <h2>Admin Panel</h2>
        </div>
        {/* interactive part */}
        <div id="navbar-auth-placeholder"></div>
      </div>
    </nav>
  );
}

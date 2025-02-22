import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <header className="container-fluid py-4 bg-light ">
      <div className="container">
        <nav className="navbar text-center">
          <Link to="/" className="navbar-brand">
            Supabase Smoothies
          </Link>

          <div>
            <Link to="/">Home</Link>
            <Link to="/create" className="btn btn-primary">
              Create New Smoothie
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

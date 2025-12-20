import { NavLink, Outlet } from 'react-router-dom';

export function AdminLayout() {
  return (
    <div className="flex flex-col h-full">
      {/* Admin Sub Navbar */}
      <div className="border-b border-border bg-card px-6 py-3">
        <nav className="flex gap-6 text-sm">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/problems"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }
          >
            Problems
          </NavLink>

          <NavLink
            to="/admin/contests"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }
          >
            Contests
          </NavLink>

          <NavLink
            to="/admin/submissions"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }
          >
            Submissions
          </NavLink>

          <NavLink
            to="/admin/stats"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }
          >
            Stats
          </NavLink>
        </nav>
      </div>

      {/* Page Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}

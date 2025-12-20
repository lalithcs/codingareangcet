import { Monitor } from 'lucide-react';

export function DesktopOnly({ children }: { children: React.ReactNode }) {
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6 text-center">
        <div className="max-w-md space-y-4">
          <Monitor className="w-12 h-12 mx-auto text-muted-foreground" />
          <h1 className="text-xl">Desktop Required</h1>
          <p className="text-muted-foreground">
            CodingArena is designed for desktop screens.
            Please open this site on a laptop or desktop.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

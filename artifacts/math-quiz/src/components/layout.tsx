import { Link, useLocation } from 'wouter';
import { Menu, Home as HomeIcon, Volume2, VolumeX, Moon, Sun, HelpCircle, Users } from 'lucide-react';
import { useState } from 'react';
import { useSettings } from '../hooks/use-settings';
import { Sheet, SheetContent, SheetTitle } from './ui/sheet';

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { playClick, theme, setTheme, soundEnabled, setSoundEnabled } = useSettings();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] w-full flex flex-col relative overflow-hidden text-foreground">
      {/* Navbar / Top actions */}
      <div className="p-4 flex justify-between items-center absolute top-0 w-full z-10">
        {location !== '/' ? (
          <Link href="/" onClick={() => playClick()} className="p-4 bg-card border-b-4 border-card-border rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all">
            <HomeIcon className="w-7 h-7 text-primary" />
          </Link>
        ) : <div />}

        <button
          onClick={() => { playClick(); setMenuOpen(true); }}
          aria-label="เมนู"
          className="p-4 bg-card border-b-4 border-card-border rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-foreground"
        >
          <Menu className="w-7 h-7 text-primary" />
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center items-center p-4 pt-24 pb-8 z-0">
        <div className="w-full max-w-md mx-auto">
          {children}
        </div>
      </main>

      {/* Menu drawer */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="right" className="bg-card w-[85vw] max-w-sm p-5 flex flex-col gap-4">
          <SheetTitle className="text-2xl font-bold text-foreground mb-1">เมนู</SheetTitle>

          <button
            onClick={() => { playClick(); setSoundEnabled(!soundEnabled); }}
            className="flex items-center justify-between w-full p-5 bg-muted rounded-2xl active:scale-95 transition-all"
          >
            <span className="flex items-center gap-4">
              <span className="p-3 bg-background rounded-full shadow-sm text-foreground">
                {soundEnabled ? <Volume2 className="w-6 h-6 text-primary" /> : <VolumeX className="w-6 h-6 text-muted-foreground" />}
              </span>
              <span className="text-lg font-bold text-foreground">เสียงและดนตรี</span>
            </span>
            <span className={`w-14 h-8 rounded-full p-1 transition-colors ${soundEnabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}>
              <span className={`block bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </span>
          </button>

          <button
            onClick={() => { playClick(); setTheme(theme === 'dark' ? 'light' : 'dark'); }}
            className="flex items-center justify-between w-full p-5 bg-muted rounded-2xl active:scale-95 transition-all"
          >
            <span className="flex items-center gap-4">
              <span className="p-3 bg-background rounded-full shadow-sm text-foreground">
                {theme === 'dark' ? <Moon className="w-6 h-6 text-secondary" /> : <Sun className="w-6 h-6 text-orange-500" />}
              </span>
              <span className="text-lg font-bold text-foreground">โหมดมืด (Dark Mode)</span>
            </span>
            <span className={`w-14 h-8 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-secondary' : 'bg-gray-300 dark:bg-gray-700'}`}>
              <span className={`block bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`} />
            </span>
          </button>

          <Link
            href="/how-to-play"
            onClick={() => { playClick(); setMenuOpen(false); }}
            className="flex items-center gap-4 w-full p-5 bg-muted rounded-2xl active:scale-95 transition-all"
          >
            <span className="p-3 bg-background rounded-full shadow-sm text-foreground">
              <HelpCircle className="w-6 h-6 text-teal-500" />
            </span>
            <span className="text-lg font-bold text-foreground">วิธีเล่น</span>
          </Link>

          <Link
            href="/about"
            onClick={() => { playClick(); setMenuOpen(false); }}
            className="flex items-center gap-4 w-full p-5 bg-muted rounded-2xl active:scale-95 transition-all"
          >
            <span className="p-3 bg-background rounded-full shadow-sm text-foreground">
              <Users className="w-6 h-6 text-secondary" />
            </span>
            <span className="text-lg font-bold text-foreground">คณะผู้จัดทำ</span>
          </Link>
        </SheetContent>
      </Sheet>
    </div>
  );
}

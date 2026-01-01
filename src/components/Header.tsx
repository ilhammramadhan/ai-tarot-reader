import { Moon, Sun, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export function Header() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="w-full py-6 px-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-gold animate-twinkle" />
          <h1 className="text-2xl sm:text-3xl font-heading text-gold tracking-wide">
            Mystic Tarot
          </h1>
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full w-10 h-10 transition-all duration-300 hover:scale-110 hover:bg-gold/10 cursor-pointer"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-gold" />
          ) : (
            <Moon className="h-5 w-5 text-gold" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
}

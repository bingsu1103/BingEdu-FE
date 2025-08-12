import { Separator } from "@/components/ui/separator";
import { Github, Facebook, Mail } from "lucide-react";

const AppFooter = () => {
  return (
    <footer className="w-full bg-background border-t border-border mt-8">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-lg font-bold text-foreground">
            Bing Academy
          </span>
          <span className="text-sm text-muted-foreground">
            Empowering your English journey.
          </span>
          <span className="text-xs text-muted-foreground mt-1">
            © {new Date().getFullYear()} Bing Academy. All rights reserved.
          </span>
        </div>
        <Separator className="my-4 md:hidden" />
        <div className="flex items-center gap-4">
          <a
            href="mailto:bingsuedu@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;

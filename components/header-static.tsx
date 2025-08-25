import type React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function HeaderStatic() {
  const navItems = [
    { name: "Features", href: "/#features-section" },
    { name: "Blog", href: "/blog" },
    { name: "Pricing", href: "/#pricing-section" },
    { name: "FAQ", href: "/#faq-section" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full py-4 px-6 bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          <span className="text-foreground text-xl font-semibold">WeezIQ</span>
        </Link>

        <nav className="hidden lg:flex items-center justify-center flex-1">
          <div className="px-2 py-2">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground px-4 py-2 rounded-full font-medium transition-all duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Auth Actions - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/sign-up">
              <Button className="btn-primary-gradient px-6 py-2 font-medium shadow-sm">
                Start Free Trial
              </Button>
            </Link>
          </div>

          {/* Mobile Menu - Simplified */}
          <div className="block lg:hidden">
            <Link href="/auth/sign-up">
              <Button className="btn-primary-gradient px-4 py-2 font-medium shadow-sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

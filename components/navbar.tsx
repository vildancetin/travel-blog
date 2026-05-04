"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar({ className }: { className?: string }) {
  const pathname = usePathname() || "/";
  const links = [
    { href: "/", label: "Home" },
    { href: "/articles", label: "Articles" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className={className}>
      <ul className="flex justify-center items-center">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-sm px-3 py-2  transition ${
                  active ? "text-black" : "text-gray-600"
                }`}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

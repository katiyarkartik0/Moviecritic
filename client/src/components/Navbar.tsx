"use client";
import Link from "next/link";
import React, { useState } from "react";

interface NavItem {
  label: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Movies", href: "/movies" }, // Add your movie listing route
    { label: "About", href: "/about" },
  ];

  return (
    <div className="w-full bg-gray-400 flex justify-between items-center h-20">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">MOVIECRITIC</Link>
        <div className="space-x-2">
          <Link
            href="?createMovie=true"
            className="text-primary bg-white border-2 border-secondary  py-2 px-4 rounded-md font-medium"
            onClick={() => {}}
          >
            Add a new movie
          </Link>
          <Link
            href="?createReview=true"
            className="text-white bg-primary py-2 px-4 rounded-md font-medium"
            onClick={() => {}}
          >
            Add a new review
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

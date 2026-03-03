"use client";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { MinimalistHero } from "@/components/ui/minimalist-hero";

const MinimalistHeroDemo = () => {
  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "CATALOG", href: "#catalog" },
    { label: "GALLERY", href: "/gallery" },
    { label: "AUTH", href: "/auth" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
  ];

  return (
    <MinimalistHero
      logoText="46."
      navLinks={navLinks}
      mainText="FAITH DRIVEN PREMIUM WEAR."
      imageSrc="/image 13.webp"
      imageAlt="A portrait of a person in a black turtleneck, in profile."
      overlayText="JUNEFORTH*"
      socialLinks={socialLinks}
      locationText="Arlington Heights, IL"
    />
  );
};

export default MinimalistHeroDemo;


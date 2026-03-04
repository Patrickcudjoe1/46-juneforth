"use client";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { MinimalistHero } from "@/components/ui/minimalist-hero";

const MinimalistHeroDemo = () => {
  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
  ];

  return (
    <MinimalistHero
      logoText="46."
      mainText="YOUNG AT HEART WITH A VISION."
      imageSrc="/image 13.webp"
      imageAlt="A portrait of a person in a black turtleneck, in profile."
      overlayText="JUNEFORTH*"
      socialLinks={socialLinks}
      locationText=""
    />
  );
};

export default MinimalistHeroDemo;


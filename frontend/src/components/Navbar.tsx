import {cn} from '@/lib/utils'
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

const navItems = [
    {name: "Home", href: "/#upload", newTab: false},
    {name: "GitHub", href:"https://github.com/Green-Chilley/phishing-analyser", newTab: true} 
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, []);
    return (
        <nav 
            className={cn(
                "fixed w-full backdrop-blur-md z-40 transition-all duration-300", 
                isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-md" : "py-5"
            )}
        >
            <div className="container flex items-center justify-between">
                <a 
                    className="text-xl font-bold text-primary flex items-center"
                    href='#upload'
                >
                    <span className="relative z-10"> 
                        <span className="text-foreground"> Email Analyser</span>
                    </span>
                </a>

                <div className="flex items-center space-x-8">
                    {navItems.map((item, key) => (
                        <a 
                            key={key} 
                            href={item.href} 
                            target={item.newTab ? "_blank" : "_self"}
                            rel={item.newTab ? "noopener noreferrer" : undefined}
                            className="text-foreground/80 hover:text-primary"
                        >
                            {item.name}
                        </a>
                    ))}
                    <ThemeToggle/>
                </div>
                
            </div>
        </nav>
    );
}
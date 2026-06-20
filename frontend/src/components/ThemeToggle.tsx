import { ToggleLeft, ToggleRight } from "lucide-react"
import { useEffect, useState } from "react"
import {cn} from "@/lib/utils";

export const ThemeToggle = ({ className }: {className?: string}) => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme")
        if (storedTheme === "dark") {
            setIsDarkMode(true)
            document.documentElement.classList.add("dark");
        } else {
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light"); // keep theme when browser refreshed
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
        }
    }

    return (
        <button 
            onClick={toggleTheme} 
            className={cn(
                "top-2 right-5 z-50 rounded-full",
                "focus:outline-hidden", className
            )}> 

            {isDarkMode ? (
              <ToggleRight className="h-8 w-8" />
             ) : (
              <ToggleLeft className="h-8 w-8 "/>
            )}
        </button>
    );
}
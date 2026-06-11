import { Navbar } from '@/components/Navbar'
import { ThemeToggle } from '@/components/ThemeToggle'
import { UploadEML } from '@/components/UploadEML'

export const Home = () => {
    return (
        <>
            <Navbar />
            <ThemeToggle />
            <UploadEML />
        </>
    )
}
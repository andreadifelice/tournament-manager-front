import { useTheme } from "@/context/ThemeContext"
import { MoonIcon, SunIcon } from "lucide-react"
import { Switch } from "../ui/switch"

const ToggleTheme = () => {
    const themeContext = useTheme()
    return (
        <label className="flex items-center gap-2 select-none">
            <SunIcon className="size-4" />
            <Switch
                checked={themeContext?.theme === 'dark'}
                onCheckedChange={themeContext?.toggleTheme}
            />
            <MoonIcon className="size-4" />
        </label>
    )
}

export default ToggleTheme
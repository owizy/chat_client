import { createContext, useEffect, useState } from "react";


export const ThemeContext = createContext()
function GetTheme (){
    const theme = localStorage.getItem("theme")
    if(!theme){
        localStorage.setItem("theme","dark-theme")
        return "dark-theme"
    }else{
        return theme
    }
}

const ThemeProvider=({children})=>{
    const[theme,settheme]=useState(GetTheme)

    function ToggleTheme(){
        if(theme === "dark-theme"){
            settheme("light-theme")
        }else{
            settheme("dark-theme")
        }
    }

    useEffect(()=>{
        function RefreshTheme(){
            localStorage.setItem("theme",theme)
        }
        RefreshTheme()
    },[theme])
         return(
            <ThemeContext.Provider value={{
                theme,
                settheme,
                ToggleTheme
            }}>
                {children}
            </ThemeContext.Provider>
         )
}
export default ThemeProvider
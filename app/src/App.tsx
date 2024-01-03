import { ThemeProvider } from "@mui/material"
import { QueryClient, QueryClientProvider } from "react-query"
import useTheme from "./hooks/useTheme"
import DisplayPage from "./pages/DisplayPage"
import StartPage from "./pages/StartPage"
import TextEntryPage from "./pages/TextEntryPage"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000, // 1 minute
        },
    },
})

const App = () => {
    const theme = useTheme()
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <StartPage />
                <TextEntryPage />
                <DisplayPage />
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default App

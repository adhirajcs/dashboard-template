import "./styles/App.css"
import { Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard/dashboard"
import { ThemeProvider } from "./components/theme-provider"

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App

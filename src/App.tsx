import "./styles/App.css"
import { Routes, Route } from "react-router-dom"

import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import DataTablePage from "@/components/DataTable/DataTablePage"
import Dashboard from "@/components/Dashboard/dashboard"

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/data-table" element={<DataTablePage />} />
        </Routes>

        <Toaster />
      </ThemeProvider>
    </>
  )
}

export default App

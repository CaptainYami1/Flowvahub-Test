import { Outlet } from "react-router-dom"
import { AppSidebar } from "./AppSidebar"


export const AppLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AppSidebar />
      <main className="w-full bg-gray-50 px-4 lg:px-8 lg:pt-8 min-h-screen grow md:overflow-y-auto box-border lg:min-h-0">
        <Outlet />
      </main>
    </div>
  )
}

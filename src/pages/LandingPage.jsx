import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <header className="px-6 lg:px-8 h-16 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
          RePaIR Specialist
        </div>
        <nav className="flex items-center gap-4">
          <ThemeToggle />
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-20 pb-32">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-7xl mb-6">
          Empower Your Practice
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mb-10">
          Manage your students, track assessments, and streamline your workflow with the RePaIR Specialist platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
          <Link to="/register" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8">Get Started</Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 bg-white dark:bg-transparent text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">Sign In</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
import { useNavigate } from "react-router";
import type { Route } from './+types/about';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: 'About - New React Router App' },
    { name: 'description', content: 'About page for React Router!' }
  ]
}

export function About() {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate('/')
  }

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <h2 className="text-2xl font-bold">About Page</h2>
            <span>This is sample about page</span>
            <button className=" cursor-pointer bg-slate-300 rounded-md text-slate-50 flex items-center justify-center px-2 py-1 mt-4" onClick={handleNavigateBack}>
              Back
            </button>
          </div>
        </header>
      </div>
    </main>
  )
}

export default About;
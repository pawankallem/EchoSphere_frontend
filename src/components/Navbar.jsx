import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="max-w-2xl mx-auto flex justify-between items-center p-4">
        <h1 className="font-bold text-xl dark:text-white">EchoSphere</h1>
        <DarkModeToggle />
      </div>
    </div>
  );
}

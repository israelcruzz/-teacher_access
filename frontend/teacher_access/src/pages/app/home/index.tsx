import { Search } from "lucide-react";

export const Home = () => {
  return (
    <main className="w-full py-8 px-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Students</h1>

        <div className="flex w-[300px] h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 items-center gap-2">
          <Search className="h-4 w-4" />
          <input type="text" className="bg-transparent outline-none" placeholder="Search student..." />
        </div>
      </header>
    </main>
  );
};

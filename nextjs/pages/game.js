// pages/games.js
import Link from "next/link";

export default function GamesPage() {
  const Card = ({ href, title, desc }) => (
    <Link
      href={href}
      className="group block rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
    >
      <h2 className="text-xl font-semibold mb-2 group-hover:underline">{title}</h2>
      <p className="text-gray-600">{desc}</p>
    </Link>
  );

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Choose a Game</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            href="/spinner"
            title="Spinner Game"
            desc="Spin the wheel and test your luck."
          />
          <Card
            href="/rockpaperscissors"
            title="Rock · Paper · Scissors"
            desc="Beat the computer in a classic showdown."
          />
        </div>
      </div>
    </main>
  );
}

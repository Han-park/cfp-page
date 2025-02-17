export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-8">
      <main className="flex-1">
        <div className="mb-12 flex gap-2">
          <h1 className="text-[#0000FF] text-5xl font-normal">
            CFP
          </h1>
          <p className="text-[#0000FF] text-lg font-normal">2025</p>
        </div>

        <div className="mb-16">
          <ul className="list-disc text-[#0000FF] ml-6 space-y-0">
            <li>Technology is shaped by culture—we believe people should have control, not just algorithms.</li>
            <li>We create tools that give people power, making interactions more meaningful.</li>
            <li>Creative work needs consistency, and we help people build it.</li>
            <li>This February, we're launching a new app to bring technology and creativity together.</li>
          </ul>
        </div>

        <div className="mb-16">
          <h2 className="text-[#0000FF] font-bold mb-4">project list</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="aspect-square bg-[#DFDFDF]"></div>
            <div className="aspect-square bg-[#DFDFDF]"></div>
            <div className="aspect-square bg-[#DFDFDF]"></div>
            <div className="aspect-square bg-[#DFDFDF]"></div>
          </div>
        </div>
      </main>

      <footer className="flex justify-between items-end text-[#0000FF]">
        <div>
          <h2 className="font-bold mb-2">contact</h2>
          <ul className="list-disc ml-6">
            <li>
              <a href="mailto:me@han-park.info" className="hover:underline">
                me@han-park.info
              </a>
            </li>
          </ul>
        </div>
        <div>copyright 2025 by Han Park</div>
      </footer>
    </div>
  );
} 
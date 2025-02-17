export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-8">
      <main className="flex-1">
        <div className="mb-12">
          <h1 className="text-[#0000FF] text-5xl font-normal">
            CFP <span>2025</span>
          </h1>
        </div>

        <div className="mb-16">
          <ul className="list-disc text-[#0000FF] ml-6 space-y-2">
            <li>simple statement. (maximum 5 rows)</li>
            <li>simple statement. (maximum 5 rows)</li>
            <li>simple statement. (maximum 5 rows)</li>
            <li>simple statement. (maximum 5 rows)</li>
          </ul>
        </div>

        <div className="mb-16">
          <h2 className="text-[#0000FF] font-normal mb-4">project list</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="aspect-square bg-[#D3D3D3]"></div>
            <div className="aspect-square bg-[#D3D3D3]"></div>
            <div className="aspect-square bg-[#D3D3D3]"></div>
            <div className="aspect-square bg-[#D3D3D3]"></div>
          </div>
        </div>
      </main>

      <footer className="flex justify-between items-end text-[#0000FF]">
        <div>
          <h2 className="font-normal mb-2">contact</h2>
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
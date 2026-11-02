import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#E8DCC6] flex flex-col items-center justify-center text-[#342A29] p-6 text-center">
      <span className="font-editorial-sans text-xs tracking-[0.25em] text-[#722F37] uppercase font-bold mb-3">
        404 // Page Not Found
      </span>
      <h1 className="font-editorial-serif text-5xl sm:text-6xl text-[#342A29] mb-4">
        Page Not Found
      </h1>
      <p className="font-editorial-sans text-sm sm:text-base text-[#342A29]/75 max-w-md mb-8">
        The page you are looking for does not exist or has been moved to another curation archive.
      </p>
      <Link
        href="/"
        className="btn-editorial-primary px-8 py-3 rounded-full text-xs font-editorial-sans tracking-[0.18em] uppercase font-semibold text-white bg-[#722F37] hover:bg-[#581e25] transition-colors"
      >
        Return to Atelier
      </Link>
    </div>
  );
}


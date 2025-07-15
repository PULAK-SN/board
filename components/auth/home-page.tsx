"use client";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";

export const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center px-4 py-8 text-center bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="mb-4">
        <Image src="/logo.svg" alt="Logo" width={64} height={64} />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        The Collaborative Whiteboard for Teams
      </h1>

      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        Draw, brainstorm, and organize your ideas visually in real time.
      </p>

      <div className="mb-8">
        <Image
          src="/whiteboard-preview.png"
          alt="Whiteboard preview"
          width={800}
          height={450}
          className="rounded shadow-lg"
        />
      </div>

      <div className="flex gap-4 mb-12">
        <SignUpButton>
          <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer">
            Get Started Free
          </button>
        </SignUpButton>
        <SignInButton>
          <button className="px-6 py-3 border border-gray-300 rounded hover:bg-gray-100 transition cursor-pointer">
            Sign In
          </button>
        </SignInButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
        <div className="p-4 rounded border text-left bg-white">
          <h3 className="font-semibold mb-1">Live Collaboration</h3>
          <p className="text-sm text-gray-600">Work together in real time.</p>
        </div>
        <div className="p-4 rounded border text-left bg-white">
          <h3 className="font-semibold mb-1">Shapes & Notes</h3>
          <p className="text-sm text-gray-600">Draw and annotate easily.</p>
        </div>
        <div className="p-4 rounded border text-left bg-white">
          <h3 className="font-semibold mb-1">Secure Access</h3>
          <p className="text-sm text-gray-600">Sign in with Clerk.</p>
        </div>
        <div className="p-4 rounded border text-left bg-white">
          <h3 className="font-semibold mb-1">Instant Sharing</h3>
          <p className="text-sm text-gray-600">Invite your team in seconds.</p>
        </div>
      </div>

      <footer className="mt-12 text-xs text-gray-400">
        © {new Date().getFullYear()} PULAK-SN · All rights reserved.
      </footer>
    </main>
  );
};

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Neo-Iuris | Digital Forensic Ecosystem",
    description: "Consultoría Legal Sanitaria & Práctica Forense (Visión 2030)",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${inter.className} bg-neo-bg text-neo-text min-h-screen flex flex-col`}>
                <header className="border-b border-white/10 p-4 bg-neo-panel/50 backdrop-blur-md sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-neo-accent rounded-lg flex items-center justify-center font-bold text-neo-bg">N</div>
                            <span className="font-bold text-xl tracking-tight">NEO-IURIS <span className="text-neo-accent text-sm font-normal">| Ecosystem</span></span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                            <span>User: <strong className="text-neo-accent">dfigueroa.juridico@gmail.com</strong> (Admin)</span>
                            <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600"></div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 max-w-7xl mx-auto w-full p-6">
                    {children}
                </main>

                <footer className="border-t border-white/10 p-6 text-center text-slate-500 text-[10px] space-y-2">
                    <p>© 2025 Neo-Iuris Ecosystem. <strong className="text-neo-accent">Registered Intellectual Property.</strong> All Rights Reserved.</p>
                    <p className="opacity-60">
                        Protected by WIPO Proof (Timestamped). The "Stitch" topological interface is a claimed Industrial Design.
                        Unauthorized reproduction of the source code or "Look and Feel" constitutes a violation of the Federal Copyright Law (INDAUTOR) and Industrial Property Law (IMPI).
                    </p>
                    <div className="flex justify-center gap-4 pt-2">
                        <span className="px-2 py-1 bg-white/5 rounded border border-white/5">Serial: NEO-V8-CRYPTO-SIGNED</span>
                        <span className="px-2 py-1 bg-white/5 rounded border border-white/5">Patent Pending: TOPOLOGICAL-LOGIC</span>
                    </div>
                </footer>
            </body>
        </html>
    );
}

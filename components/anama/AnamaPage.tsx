"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { BuntingGallery } from "./BuntingGallery";
import { StropheModal } from "./StropheModal";
import { INK, PARCHMENT } from "./BuntingFlag";
import { listRecordedEstrofes } from "@/lib/audioStore";
import { listEstrofesWithNotes } from "@/lib/notesStore";

const TOTAL_ESTROFES = 40;
const FULL_AUDIO_URL = "/os_quatro_de_anama_completo.mp3";
const HEADER_IMAGE = "/forja_de_cordel.jpeg";
const TITLE_IMAGE = "/TITULO.png";
const CELEBRATION_IMAGE = "/CELEBRANDO%20A%20ORALIDADE.png";

export function AnamaPage() {
  const [activeEstrofe, setActiveEstrofe] = useState<number | null>(null);
  const [recordedSet, setRecordedSet] = useState<Set<number>>(new Set());
  const [noteSet, setNoteSet] = useState<Set<number>>(new Set());
  const [titleImageFailed, setTitleImageFailed] = useState(false);
  const [celebrationImageFailed, setCelebrationImageFailed] = useState(false);
  const fullAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    void listRecordedEstrofes().then((arr) => setRecordedSet(new Set(arr)));
    setNoteSet(new Set(listEstrofesWithNotes()));
  }, []);

  const handleSelect = useCallback((n: number) => {
    if (fullAudioRef.current) fullAudioRef.current.pause();
    setActiveEstrofe(n);
  }, []);

  const handleRecordingChange = useCallback((n: number, exists: boolean) => {
    setRecordedSet((prev) => {
      const next = new Set(prev);
      if (exists) next.add(n);
      else next.delete(n);
      return next;
    });
  }, []);

  const handleNoteChange = useCallback((n: number, exists: boolean) => {
    setNoteSet((prev) => {
      const next = new Set(prev);
      if (exists) next.add(n);
      else next.delete(n);
      return next;
    });
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: PARCHMENT,
        color: INK,
        fontFamily: '"AnamaBody", system-ui, sans-serif',
      }}
    >
      <header className="relative w-full">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
          <Image
            src={HEADER_IMAGE}
            alt="Os Quatro de Anamá — xilogravura"
            fill
            sizes="100vw"
            priority
            className="object-cover"
            style={{ filter: "sepia(0.55) saturate(0.45) contrast(1.05)" }}
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 pt-6 sm:pt-8 relative z-10 text-center">
          {!titleImageFailed ? (
            <img
              src={TITLE_IMAGE}
              alt="Os Quatro de Anamá"
              className="mx-auto w-full max-w-3xl h-auto"
              onError={() => setTitleImageFailed(true)}
            />
          ) : (
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-bold"
              style={{ fontFamily: '"AnamaHeading", Georgia, serif', color: INK, letterSpacing: "0.01em" }}
            >
              Os Quatro de Anamá
            </h1>
          )}
          <p className="mt-2 text-base sm:text-lg" style={{ color: INK }}>
            <span className="font-semibold">Cordel Didático</span>
          </p>
          <p
            className="mt-3 inline-block px-3 py-1 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase"
            style={{ color: INK, border: `1.5px solid ${INK}`, background: "transparent" }}
          >
            Workshop Ready Vessels
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <section className="mb-8 sm:mb-12">
          <h2
            className="text-xl sm:text-2xl font-bold mb-3"
            style={{ fontFamily: '"AnamaHeading", Georgia, serif' }}
          >
            Ouvir o cordel completo
          </h2>
          <audio
            ref={fullAudioRef}
            controls
            preload="none"
            src={FULL_AUDIO_URL}
            className="w-full"
            aria-label="Cordel completo Os Quatro de Anamá"
          >
            Seu navegador não suporta áudio HTML5.
          </audio>
        </section>

        <section>
          <div className="flex items-end justify-between mb-4 sm:mb-6 flex-wrap gap-2">
            <h2
              className="text-xl sm:text-2xl font-bold"
              style={{ fontFamily: '"AnamaHeading", Georgia, serif' }}
            >
              Ouvir por estrofes
            </h2>
            <div className="text-xs sm:text-sm flex items-center gap-3 opacity-80">
              <span className="flex items-center gap-1">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{ background: INK, boxShadow: `0 0 0 1.5px ${PARCHMENT}` }}
                />
                gravação
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{ background: PARCHMENT, boxShadow: `inset 0 0 0 1.5px ${INK}` }}
                />
                anotação
              </span>
            </div>
          </div>

          <BuntingGallery
            total={TOTAL_ESTROFES}
            recordedSet={recordedSet}
            noteSet={noteSet}
            onSelect={handleSelect}
          />

          <div className="mt-10 text-center">
            {!celebrationImageFailed ? (
              <img
                src={CELEBRATION_IMAGE}
                alt="Celebrando a Oralidade"
                className="mx-auto w-full max-w-2xl h-auto"
                onError={() => setCelebrationImageFailed(true)}
              />
            ) : (
              <p
                className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold italic"
                style={{ fontFamily: '"AnamaHeading", Georgia, serif', color: INK, letterSpacing: "0.02em" }}
              >
                Celebrando a Oralidade
              </p>
            )}
          </div>

          <p className="mt-6 text-xs opacity-60 text-center">
            Suas gravações e anotações ficam salvas neste navegador. Use o mesmo dispositivo para retomar o trabalho.
          </p>
        </section>
      </main>

      <footer className="py-8 text-center text-xs opacity-60">
        Os Quatro de Anamá · Cordel interativo
      </footer>

      {activeEstrofe !== null && (
        <StropheModal
          estrofe={activeEstrofe}
          onClose={() => setActiveEstrofe(null)}
          onRecordingChange={handleRecordingChange}
          onNoteChange={handleNoteChange}
        />
      )}
    </div>
  );
}

// Era Cutscene Player Component v7
// Displays cinematic introduction to each era with narration, visuals, and music

'use client';

import React, { useState, useEffect } from 'react';
import { getEraCutscene } from '@/lib/era-cutscenes-v7';

interface CutscenePlayerProps {
  eraId: string;
  characterName: string;
  onCutsceneComplete: () => void;
  autoPlay?: boolean;
}

export function EraCutscenePlayer({
  eraId,
  characterName,
  onCutsceneComplete,
  autoPlay = true,
}: CutscenePlayerProps) {
  const cutscene = getEraCutscene(eraId);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [showSkipPrompt, setShowSkipPrompt] = useState(false);
  const [sceneDuration, setSceneDuration] = useState(0);

  const currentScene = cutscene?.scenes[currentSceneIndex];

  useEffect(() => {
    if (!isPlaying || !currentScene) return;

    const timer = setTimeout(() => {
      if (currentSceneIndex < (cutscene?.scenes.length || 0) - 1) {
        setCurrentSceneIndex(currentSceneIndex + 1);
      } else {
        setIsPlaying(false);
        onCutsceneComplete();
      }
    }, currentScene.duration * 1000);

    return () => clearTimeout(timer);
  }, [isPlaying, currentSceneIndex, currentScene, cutscene?.scenes.length, onCutsceneComplete]);

  if (!cutscene) {
    return <div>Cutscene not found</div>;
  }

  const progress = ((currentSceneIndex + 1) / cutscene.scenes.length) * 100;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col justify-center items-center">
      {/* Cinematic black bars */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-black"></div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-black"></div>

      {/* Main cutscene area */}
      <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden">
        {/* Background visualization based on scene */}
        <div
          className="absolute inset-0 opacity-70 bg-gradient-to-b from-slate-900 via-slate-800 to-black"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(30,41,59,0.9) 50%, rgba(15,23,42,0.8) 100%)`,
          }}
        >
          {/* Scene-specific visual description as text overlay for now */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-slate-400 text-lg max-w-2xl mx-auto px-8">
              <p className="italic">{currentScene?.visualDescription}</p>
            </div>
          </div>
        </div>

        {/* Narration */}
        <div className="absolute bottom-32 left-0 right-0 text-center z-10">
          <p className="text-xl text-white font-serif leading-relaxed max-w-3xl mx-auto px-8 animate-fade-in">
            {currentScene?.narration}
          </p>
          <p className="text-sm text-amber-600 mt-4">
            {cutscene.narratorVoice}
          </p>
        </div>

        {/* Scene counter */}
        <div className="absolute top-24 right-8 text-white text-sm">
          <p>Scene {currentSceneIndex + 1} of {cutscene.scenes.length}</p>
          <p className="text-xs text-slate-400">{cutscene.title}</p>
        </div>

        {/* Character name and age display */}
        <div className="absolute top-24 left-8 text-white text-sm">
          <p className="text-lg font-bold">{characterName}</p>
          <p className="text-xs text-slate-400">Age: {cutscene.characterAge}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4">
        {/* Progress bar */}
        <div className="w-96 h-1 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Control buttons */}
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded transition"
          >
            {isPlaying ? 'Pause' : 'Resume'}
          </button>

          <button
            onClick={() => setShowSkipPrompt(true)}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition"
          >
            Skip Cutscene
          </button>

          <button
            onClick={() => {
              if (currentSceneIndex < cutscene.scenes.length - 1) {
                setCurrentSceneIndex(currentSceneIndex + 1);
              }
            }}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition"
            disabled={currentSceneIndex >= cutscene.scenes.length - 1}
          >
            Next Scene
          </button>
        </div>

        {/* Skip confirmation */}
        {showSkipPrompt && (
          <div className="bg-slate-800 border border-amber-600 rounded p-4 text-white text-center">
            <p>Skip this cutscene?</p>
            <div className="flex gap-2 justify-center mt-2">
              <button
                onClick={() => {
                  setShowSkipPrompt(false);
                  onCutsceneComplete();
                }}
                className="px-4 py-1 bg-amber-600 hover:bg-amber-700 rounded"
              >
                Yes, Skip
              </button>
              <button
                onClick={() => setShowSkipPrompt(false)}
                className="px-4 py-1 bg-slate-700 hover:bg-slate-600 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Keyboard hint */}
      <div className="absolute top-8 left-8 text-slate-500 text-xs">
        <p>Press SPACE to play/pause</p>
      </div>
    </div>
  );
}

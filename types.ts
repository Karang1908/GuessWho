import React from 'react';

export interface Character {
  id: string;
  name: string; // The secret identity (e.g., "Iron Man")
  systemPrompt: string; // The instructions for the AI
  initialMessage?: string; // Optional first message from the bot
}

export interface Subcategory {
  id: string;
  name: string;
  characters?: Character[];
  subcategories?: Subcategory[];
  icon?: React.ReactNode;
  backgroundImage?: string;
}

export interface Category {
  id: string;
  name: string;
  characters?: Character[];
  subcategories?: Subcategory[];
  icon?: React.ReactNode;
  backgroundImage?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export type ViewState = 'LANDING' | 'TRANSITION_LOADING' | 'CATEGORY_SELECT' | 'SUBCATEGORY_SELECT' | 'CHARACTER_SELECT' | 'GAME_SESSION';

export type CategoryKey = 'Marvel' | 'DC' | 'Disney' | 'Anime' | 'Shows';
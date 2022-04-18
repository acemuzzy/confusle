import { WORDS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'
import { MAX_CHALLENGES, MAX_WORD_LENGTH } from '../constants/settings'
import { default as GraphemeSplitter } from 'grapheme-splitter'

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(localeAwareLowerCase(word)) ||
    VALID_GUESSES.includes(localeAwareLowerCase(word))
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase()
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date(2022, 0).valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  return {
    solution: localeAwareUpperCase(WORDS[index % WORDS.length]),
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export function hashCode(str: string): number {
  var h: number = 0;
  for (var i = 0; i < str.length; i++) {
      h = 31 * h + str.charCodeAt(i);
  }
  return h & 0xFFFFFFFF
}

export const offsetIndex = () => {
  // January 1, 2022 Game Epoch
  const hash = hashCode(getWordOfDay().solution)
  var offsets = []

  for (var i = 0; i < MAX_CHALLENGES; i++) {
    offsets[i] = Math.floor((hash % Math.pow(2, i + 1)) / Math.pow(2, i))
  }
  
  return offsets
}

export const errorIndex = (row: number) => {
  const hash = hashCode(getWordOfDay().solution)
  var errors = []

  for (var i = 0; i < MAX_CHALLENGES; i++) {
    errors[i] = Math.floor((hash % Math.pow(MAX_WORD_LENGTH, i + 1)) / Math.pow(MAX_WORD_LENGTH, i))
  }
  
  return errors[row]
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()

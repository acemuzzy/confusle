import { WORDS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'
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
  
  return [Math.floor(hash % 2), Math.floor((hash % 4) / 2), Math.floor((hash % 8) / 4), Math.floor((hash % 16) / 8), Math.floor((hash % 32) / 16)]
}

export const errorIndex = (row: number) => {
  const hash = hashCode(getWordOfDay().solution)
  const foo = [Math.floor(hash % 5), Math.floor((hash % 25) / 5), Math.floor((hash % 125) / 25), Math.floor((hash % 625) / 125), Math.floor((hash % 3125) / 625), Math.floor((hash % 15625) / 3125)]
  return {
    row: foo[row]
  }
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()

import { errorIndex, offsetIndex, solution, unicodeSplit } from './words'

export type CharStatus = 'absent' | 'present' | 'correct'

export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}
  //const splitSolution = unicodeSplit(solution)

  // guesses.forEach((word) => {
  //   unicodeSplit(word).forEach((letter, i) => {
  //     if (!splitSolution.includes(letter)) {
  //       // make status absent
  //       return (charObj[letter] = 'absent')
  //     }

  //     if (letter === splitSolution[i]) {
  //       //make status correct
  //       return (charObj[letter] = 'correct')
  //     }

  //     if (charObj[letter] !== 'correct') {
  //       //make status present
  //       return (charObj[letter] = 'present')
  //     }
  //   })
  // })

  return charObj
}

export const getGuessStatuses = (guess: string, row: number): CharStatus[] => {
  const splitSolution = unicodeSplit(solution)
  const splitGuess = unicodeSplit(guess)

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

  // Now oscillate the "wrong" guess
  console.log("Statuses were: ", statuses)
  const wrongGuess = errorIndex(row)
  const currentGuess = statuses[wrongGuess]

  const possibles: CharStatus[] = ['absent', 'present', 'correct']
  const possiblesLeft: CharStatus[] = []
  possibles.forEach((word) => {
    if (word !== currentGuess) {
      possiblesLeft.push(word)
    }
  })
  console.log("Possibles left: ", possiblesLeft)

  statuses[wrongGuess] = possiblesLeft[offsetIndex()[wrongGuess]]
  console.log("Statuses now: ", statuses)

  return statuses
}


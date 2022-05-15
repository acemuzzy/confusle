import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'
import { errorIndex, unicodeSplit } from '../../lib/words'

type Props = {
  guess: string
  row: number
  isRevealing?: boolean
  revealWrong?: boolean
}

export const CompletedRow = ({ guess, row, isRevealing, revealWrong = false }: Props) => {
  const statuses = getGuessStatuses(guess, row)
  const splitGuess = unicodeSplit(guess)

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
          revealWrong={(revealWrong && (i === errorIndex(row)))}
        />
      ))}
    </div>
  )
}

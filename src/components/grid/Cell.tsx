import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'

type Props = {
  value?: string
  status?: CharStatus
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
  revealWrong?: boolean,
}

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
  revealWrong = false,
}: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`
  const isHighContrast = getStoredIsHighContrastMode()

  const classes = classnames(
    'w-8 h-8 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-small rounded',
    {
      'text-red-600': revealWrong,
      'text-black dark:text-white': !revealWrong && !status,
      'text-white': !revealWrong,
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'absent shadowed bg-slate-400 dark:bg-slate-700 border-slate-400 dark:border-slate-700':
        status === 'absent',
      'correct shadowed bg-orange-500 border-orange-500':
        status === 'correct' && isHighContrast,
      'present shadowed bg-cyan-500 border-cyan-500':
        status === 'present' && isHighContrast,
      'correct shadowed bg-green-500 border-green-500':
        status === 'correct' && !isHighContrast,
      'present shadowed bg-yellow-500 border-yellow-500':
        status === 'present' && !isHighContrast,
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )

  return (
    <div className={classes} style={{ animationDelay }}>
      <div className="letter-container" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}

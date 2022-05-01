type Props = {
  isHardMode: boolean
  guesses: string[]
}

export const HelpText = ({
  isHardMode,
  guesses,
}: Props) => {

  if (!isHardMode && (guesses.length > 1)) { 
    return <p className="text-sm text-center italic ml-2.5 font-bold text-red-600">In Easy mode, red letters reveal the lies...</p>
  } else {
    return <br />
  }
}

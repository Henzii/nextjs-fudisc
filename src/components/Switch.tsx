"use client"

import clsx from "clsx"

export type Option = {
  label: string
  value: any
}

type Props = {
  options: Option[]
  onSwitchClicked: (value: Option['value']) => void
  selected: Option['value']
}

const Switch = ({ onSwitchClicked, options, selected }: Props) => {

  return (
    <div className="whitespace-nowrap">
      {options.map((option, index) => {
        return (
          <button
            key={option.label}
            className={
              clsx("px-3 py-1 border-t-2 border-b-2 transition", {
                ['bg-emerald-600 text-white shadow-inner shadow-gray-700']: option.value === selected,
                ['rounded-s-xl border-l-2']: index === 0,
                ['border-l-2']: index !== 0,
                ['rounded-e-xl border-r-2']: index === options.length - 1,
                ['hover:bg-green-300 transition duration-200 hover:shadow-inner hover:shadow-gray-600']: option.value !== selected
              })
            }
            onClick={() => onSwitchClicked(option.value)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default Switch
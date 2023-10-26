"use client"

import clsx from "clsx"
import { useState } from "react"

const options = [
  { label: 'Jee' },
  { label: 'Jou' },
  { label: 'Niinpä niin' },
  { label: 'En tiä' }
]

const Switch = () => {

  const [selected, setSelected] = useState(0)

  return options.map((option, index) => {
    return (
      <button
        key={option.label}
        className={
          clsx("px-6 py-2 border-t-2 border-b-2 transition", {
            ['bg-emerald-600 text-white shadow-inner shadow-gray-700']: index === selected,
            ['rounded-s-xl border-l-2']: index === 0,
            ['border-l-2']: index !== 0,
            ['rounded-e-xl border-r-2']: index === options.length - 1,
            ['hover:bg-green-300 transition duration-200 hover:shadow-inner hover:shadow-gray-600']: index !== selected
          })
        }
        onClick={() => setSelected(index)}
      >
        {option.label}
      </button>
    )
  })
}

export default Switch
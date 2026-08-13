const base = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function PumpIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="10" cy="12" r="6.5" />
      <path d="M10 8.5v7M7 12h6" />
      <path d="M16.2 12h4.3M18.5 9.5 21 12l-2.5 2.5" />
    </svg>
  )
}

export function HeatExchangerIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="3.5" width="16" height="17" rx="1.6" />
      <path d="M7.5 3.5v17M12 3.5v17M16.5 3.5v17" />
    </svg>
  )
}

export function SeparatorIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5c3.5 3 5.5 6.4 5.5 9.4a5.5 5.5 0 1 1-11 0c0-3 2-6.4 5.5-9.4Z" />
      <path d="M9.3 13.2a2.7 2.7 0 0 0 5.4 0" />
    </svg>
  )
}

export function DeaeratorIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="2.5" width="12" height="19" rx="5" />
      <circle cx="9.7" cy="9" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="12.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="10.3" cy="15.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FoodIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3v8a2.5 2.5 0 0 0 5 0V3M8.5 3v6" />
      <path d="M16 3c-1.4 0-2.5 1.6-2.5 4.5S14.6 12 16 12s2.5-1.6 2.5-4.5S17.4 3 16 3Z" />
      <path d="M8.5 11v10M16 12v9" />
    </svg>
  )
}

export function PharmaIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="8.3" y="2.5" width="7.4" height="19" rx="3.7" />
      <path d="M8.3 12h7.4" />
      <circle cx="12" cy="7.3" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function RefineryIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 20.5h17" />
      <path d="M6 20.5V11l3-2v11.5M12.5 20.5V8l3-2.5v15" />
      <path d="M9 20.5v-4h2.5M15.5 20.5v-3h2.5" />
    </svg>
  )
}

export function PinIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  )
}

export function PhoneIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 4.5h3.2l1.4 4-2 1.6a11.5 11.5 0 0 0 5.8 5.8l1.6-2 4 1.4v3.2c0 1-.8 1.7-1.8 1.6a17 17 0 0 1-14.9-14.9c-.1-1 .7-1.8 1.7-1.7Z" />
    </svg>
  )
}

export function CheckIcon(props) {
  return (
    <svg {...base} width={18} height={18} {...props}>
      <path d="m4 12 5.5 5.5L20 6" />
    </svg>
  )
}

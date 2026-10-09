// Pill row used for filters and for the year timeline (Hall Council style).
export default function Pills({ options, value, onChange, label, center = false }) {
  return (
    <div className={`pills pills--scroll${center ? ' pills--center' : ''}`} role="group" aria-label={label}>
      {options.map((opt) => {
        const id = typeof opt === 'string' ? opt : opt.id
        const text = typeof opt === 'string' ? opt : opt.label
        return (
          <button
            key={id}
            type="button"
            className="pill"
            aria-pressed={value === id}
            onClick={() => onChange(id)}
          >
            {text}
          </button>
        )
      })}
    </div>
  )
}

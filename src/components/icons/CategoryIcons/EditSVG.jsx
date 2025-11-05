function EditSVG({ $active }) {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke={$active}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ cursor: 'pointer' }}
        >
            {/* Корпус карандаша */}
            <path d="M20.24 6.73l-3-3a2.12 2.12 0 0 0-3 0L3 17v4h4l10.24-10.27z" />
            {/* Линия «графитового сердечника» */}
            <line x1="14" y1="6" x2="18" y2="10" />
        </svg>
    )
}

export default EditSVG

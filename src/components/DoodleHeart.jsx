// A loose, hand-sketched heart — intentionally imperfect rather than a
// slick vector icon, per the "doodle" style requested for the site.
export default function DoodleHeart({ size = 32, color = '#D98E88' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 51C32 51 4 33.8 4 17.6C4 8.6 11 3 18.5 3C24.8 3 29.4 7.2 32 12.5C34.6 7.2 39.2 3 45.5 3C53 3 60 8.6 60 17.6C60 33.8 32 51 32 51Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(-1.5 32 28)"
      />
    </svg>
  )
}

export const TwitterIcon = ({
  size = 16,
  color = 'currentColor',
  style,
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  )
}

export const InstagramIcon = ({
  size = 16,
  color = 'currentColor',
  style,
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  )
}
export const DribbbleIcon = ({
  size = 16,
  color = 'currentColor',
  style,
  ...rest
}) => {
  return (
    <svg
      {...rest}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
    </svg>
  )
}
export const RedditIcon = ({
  size = 16,
  color = 'currentColor',
  style,
  ...rest
}) => {
  return (
    <svg
      {...rest}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.42657 15.1636C9.31969 15.1636 10.0437 14.4442 10.0437 13.5568C10.0437 12.6695 9.31969 11.9501 8.42657 11.9501C7.53345 11.9501 6.80943 12.6695 6.80943 13.5568C6.80943 14.4442 7.53345 15.1636 8.42657 15.1636Z"
        fill="currentColor"
      />
      <path
        d="M24 12.257C24 10.2716 22.427 8.65659 20.4934 8.65659C19.8149 8.65659 19.1851 8.86064 18.6488 9.20224C16.9853 8.24244 14.8874 7.64616 12.5964 7.56454L13.9168 3.79791L16.6521 4.44861C16.643 4.53854 16.6255 4.6247 16.6255 4.7169C16.6255 6.21478 17.8524 7.4338 19.3608 7.4338C20.8669 7.4338 22.0961 6.21554 22.0961 4.7169C22.0961 3.21826 20.8676 2 19.3608 2C18.3773 2 17.5223 2.52146 17.0408 3.2961L13.1296 2.36654L11.304 7.5721C9.02358 7.68848 6.94777 8.32028 5.31542 9.30577C5.34812 9.2831 5.37627 9.25741 5.40898 9.23473C4.85979 8.87047 4.20791 8.65583 3.50659 8.65583C1.57226 8.65583 0 10.2701 0 12.2562C0 13.584 0.711207 14.7358 1.75862 15.3578C2.18763 19.07 6.64123 22 12.0647 22C17.5231 22 21.9995 19.0307 22.3783 15.2845C23.3504 14.6474 24 13.5296 24 12.257ZM19.3593 3.2107C20.1952 3.2107 20.876 3.88709 20.876 4.71841C20.876 5.54897 20.1945 6.22536 19.3593 6.22536C18.5203 6.22536 17.841 5.54897 17.841 4.71841C17.841 3.88634 18.5226 3.2107 19.3593 3.2107ZM3.50583 9.86578C3.78195 9.86578 4.04209 9.92548 4.28702 10.0192C2.96349 11.0735 2.07429 12.396 1.80654 13.8561C1.44067 13.4314 1.21476 12.8721 1.21476 12.257C1.21476 10.9389 2.24315 9.86578 3.50583 9.86578ZM12.0631 20.7923C7.02688 20.7923 2.93078 18.0928 2.93078 14.7743C2.93078 11.4551 7.02688 8.75635 12.0631 8.75635C17.0986 8.75635 21.194 11.4559 21.194 14.7743C21.194 18.0921 17.0986 20.7923 12.0631 20.7923ZM22.2901 13.7246C21.9911 12.3038 21.1042 11.0183 19.8012 9.99048C20.021 9.91642 20.2508 9.86578 20.4934 9.86578C21.7553 9.86578 22.783 10.9382 22.783 12.257C22.7814 12.8117 22.5943 13.3188 22.2901 13.7246Z"
        fill="currentColor"
      />
      <path
        d="M15.3804 15.1636C16.2735 15.1636 16.9975 14.4442 16.9975 13.5568C16.9975 12.6695 16.2735 11.9501 15.3804 11.9501C14.4873 11.9501 13.7633 12.6695 13.7633 13.5568C13.7633 14.4442 14.4873 15.1636 15.3804 15.1636Z"
        fill="currentColor"
      />
      <path
        d="M15.1203 17.1285C11.6943 19.3753 8.93012 17.2585 8.8069 17.1625C8.54447 16.9531 8.16263 16.9947 7.95269 17.2539C7.74275 17.5154 7.7823 17.8948 8.04396 18.1041C8.06678 18.123 9.64589 19.3564 11.9392 19.3564C13.0795 19.3564 14.3977 19.0503 15.7897 18.1382C16.0703 17.9538 16.1479 17.5789 15.9638 17.3015C15.7775 17.0219 15.4002 16.9441 15.1203 17.1285Z"
        fill="currentColor"
      />
    </svg>
  )
}
export const GithubIcon = ({
  size = 16,
  color = 'currentColor',
  style,
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}
export const GlobeIcon = ({
  size = 16,
  color = 'currentColor',
  style,
  ...rest
}) => {
  return (
    <svg
      {...rest}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    </svg>
  )
}

export const BookmarkIcon = ({
  size = 16,
  color = 'currentColor',
  fill = 'none',
  style,
  ...rest
}) => {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={color}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
      />
    </svg>
  )
}
export const FullscreenIcon = ({
  size = 24,
  color = 'currentColor',
  style,
  ...rest
}) => {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      width={size}
      height={size}
      style={style}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
      />
    </svg>
  )
}

export const SettingIcon = ({
  size = 24,
  color = 'currentColor',
  style,
  ...rest
}) => {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      width={size}
      height={size}
      style={style}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  )
}
export const SparklesIcon = ({
  size = 24,
  color = 'currentColor',
  style,
  ...rest
}) => {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      width={size}
      height={size}
      style={style}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  )
}
export const BeakonIcon = ({
  size = 24,
  color = 'currentColor',
  style,
  ...rest
}) => {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      width={size}
      height={size}
      style={style}
    >
      <path
        d="M19.9279 15.428C19.6487 15.1488 19.2931 14.9584 18.9059 14.881L16.5189 14.404C15.2105 14.1424 13.8523 14.3243 12.6589 14.921L12.3409 15.079C11.1475 15.6757 9.78926 15.8576 8.48089 15.596L6.54989 15.21C6.2271 15.1455 5.89337 15.1617 5.57833 15.2571C5.26328 15.3525 4.97666 15.5242 4.74389 15.757L19.9279 15.428ZM8.49989 4H16.4999L15.4999 5V10.172C15.5 10.7024 15.7108 11.211 16.0859 11.586L21.0859 16.586C22.3459 17.846 21.4529 20 19.6709 20H5.32789C3.54589 20 2.65389 17.846 3.91389 16.586L8.91389 11.586C9.28899 11.211 9.49978 10.7024 9.49989 10.172V5L8.49989 4Z"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export const AccountIcon = ({
  size = 24,
  color = 'currentColor',
  style,
  ...rest
}) => {
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      width={size}
      height={size}
      style={style}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

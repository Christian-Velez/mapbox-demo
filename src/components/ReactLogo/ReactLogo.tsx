import styles from './react-logo.module.css'

export function ReactLogo({ className = '' }) {
   return <img src='react.svg' className={`${styles.logo} ${className}`} />
}

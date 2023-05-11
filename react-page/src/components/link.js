
export default function Link({ href, text }) {
  return (
    <a href={ href } target="_blank" className="text-blue-500 dark:text-blue-400" rel="noreferrer">{ text }</a>
  )
}
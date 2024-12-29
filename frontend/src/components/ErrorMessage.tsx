interface ErrorMessageProps {
  error: string;
}

export function ErrorMessage({error}: ErrorMessageProps) {
  return(
    <p className="error-text">{ error }</p>
  )
}
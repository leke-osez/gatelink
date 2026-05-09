type Props = {
  className?: string;
} & React.HtmlHTMLAttributes<HTMLDivElement>;

const CloseIcon = ({ ...props }: Props) => {
  return (
    <div {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="m7 7l10 10M7 17L17 7"
        />
      </svg>
    </div>
  );
};

export default CloseIcon;
type PropsType = {
  message: string;
};

export const TextMessage = ({ message }: PropsType) => {
  return (
    <div className="prose prose-sm dark:prose-invert break-words max-w-[70ch]">
      <p className="m-0">{message}</p>
    </div>
  );
};

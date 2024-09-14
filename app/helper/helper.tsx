export const formatResponse = (text: string) => {
  const lines = text.split("\n");
  return lines.map((line, index) => {
    // Handle '##' subheadings
    if (line.startsWith("## ")) {
      return (
        <h2 key={index} className="text-xl font-semibold mt-4 mb-2">
          {line.slice(3)}
        </h2>
      );
    }

    // Handle '* ' list items with potential bold text
    if (line.startsWith("* ")) {
      return (
        <li key={index} className="ml-4 mb-1">
          {formatBoldText(line.slice(2))}
        </li>
      );
    }

    // Handle regular paragraphs with potential bold text
    return (
      <p key={index} className="mb-2">
        {formatBoldText(line)}
      </p>
    );
  });
};

export const formatBoldText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

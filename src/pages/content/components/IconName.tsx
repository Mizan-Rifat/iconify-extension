import React, { useEffect, useState } from "react";
import { CopiedIcon, CopyIcon } from "./Icon";

const IconName = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (copied) {
        setCopied(false);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  return (
    <div className="flex gap-2">
      <p>{value}</p>
      <button onClick={handleCopy}>
        {copied ? (
          <CopiedIcon className="w-6 h-6" />
        ) : (
          <CopyIcon className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default IconName;

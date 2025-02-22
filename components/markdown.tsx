import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import getTranslation from "./utils";

import { Translations } from "@/api";

interface MarkdownProps {
  text?: string;
  translations?: Translations;
}

export default function Markdown1({ text, translations }: MarkdownProps) {
  if ((!text && !translations) || (text && translations)) {
    throw "Markdown must have either text or translations";
  }

  return (
    <div className="markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {text ? text : getTranslation(translations)}
      </ReactMarkdown>
    </div>
  );
}

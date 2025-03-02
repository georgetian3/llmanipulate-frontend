import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


import { Translations } from "@/api";
import { getTranslation } from "./utils";

interface MarkdownProps {
  content?: Translations;
}

export default function Markdown({ content }: MarkdownProps) {
  return <div className="markdown">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {getTranslation(content)}
    </ReactMarkdown>
  </div>
}

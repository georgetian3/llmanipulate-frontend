import { Textarea } from "@heroui/input";

import { FreeText } from "@/api";

interface FreeTextProps {
  config: FreeText;
}

export default function FreeTextUI({ config }: FreeTextProps) {
  return <Textarea />;
}

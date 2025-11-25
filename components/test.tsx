import React, { useState } from "react";

const languages = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "ar", label: "Arabic", dir: "rtl" },
  { code: "he", label: "Hebrew", dir: "rtl" },
  { code: "zh", label: "Chinese", dir: "ltr" },
  { code: "hi", label: "Hindi", dir: "ltr" },
];

const Test = () => {
  const [language, setLanguage] = useState("en");
  const [text, setText] = useState("");
  const [entries, setEntries] = useState<{language: string, text: string}[]>([]);

  const addEntry = () => {
    if (text.trim()) {
      setEntries([
        ...entries,
        { language, text },
      ]);
      setText("");
    }
  };

  const currentLang = languages.find((lang) => lang.code === language);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Multilingual Text Manager</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Select Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border p-2 rounded w-full"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Enter Text:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          dir={currentLang?.dir || "ltr"}
          className="border p-2 rounded w-full h-24"
        />
      </div>

      <button
        onClick={addEntry}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-6"
      >
        Add Entry
      </button>

      <div>
        <h3 className="text-xl font-semibold mb-2">Entries:</h3>
        {entries.length === 0 ? (
          <p className="text-gray-500">No entries added yet.</p>
        ) : (
          <ul className="space-y-4">
            {entries.map(({ language, text }, i) => {
              const lang = languages.find((l) => l.code === language);
              return (
                <li key={i} className="border p-3 rounded bg-gray-100">
                  <div className="text-sm text-gray-500 mb-1">
                    Language: {lang?.label || language}
                  </div>
                  <div dir={lang?.dir || "ltr"} className="whitespace-pre-wrap">
                    {text}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Test;

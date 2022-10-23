const defaultColor = "#f89b25";
const colorMap = {
    "Java": "#360898",
    "Python": "#ae888a",
    "Assembly": "#7dbe3e",
    "C#": "#0c85b4",
    "C++": "#34956e",
    "MATLAB": "#051c3d",
    "C": "#037de5",
    "JavaScript": "#036a58",
    "TypeScript": "#c87762",
    "Erlang": "#c4cbe7",
    "Shell": "#783b62",
    "Kotlin": "#565f87",
    "Ruby": "#bc3ad1",
    "Go": "#326ba1",
    "PHP": "#c8ec26",
    "HTML": "#9ed8fc",
  };

export function getLanguageIconColor(language: string) {
  return colorMap[language] ?? defaultColor;
}

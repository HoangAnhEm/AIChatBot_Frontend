export function lightenColor(color, amount = 0.2) {
    let hex = color.replace("#", "");
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
  
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    const lighten = (c) => {
      const amountToLighten = amount * 255;
      return Math.min(255, c + amountToLighten);
    };
  
    const newR = Math.round(lighten(r));
    const newG = Math.round(lighten(g));
    const newB = Math.round(lighten(b));
  
    const componentToHex = (c) => {
      const hexValue = c.toString(16);
      return hexValue.length === 1 ? "0" + hexValue : hexValue;
    };
  
    const newHex = "#" + componentToHex(newR) + componentToHex(newG) + componentToHex(newB);
    return newHex;
  }
  
export const AIPersonalities = [
  {
    name: "humor",
    color: "#FFDE33",
    title: "Positive and Funny",
    backColor: lightenColor("#FFDE33", 0.4)  // Darker, more saturated yellow
  },
  {
    name: "expert",
    color: "#32CD32",
    title: "Knowledgeable Specialist",
    backColor: lightenColor("#32CD32", 0.4) // A lighter, more vibrant green
  },
  {
    name: "motivational",
    color: "#6495ED",
    title: "Encouraging Supporter",
    backColor: lightenColor("#6495ED", 0.4) // Pale Blue
  },
  {
    name: "empathetic",
    color: "#BA55D3",
    title: "Caring Listener",
    backColor: lightenColor("#BA55D3", 0.4) // Light Lavender
  },
  {
    name: "logical",
    color: "#A9A9A9",
    title: "Rational Thinker",
    backColor: lightenColor("#A9A9A9", 0.4) // Very Light Gray
  },
  {
    name: "creative",
    color: "#FF7F50",
    title: "Innovative Imaginer",
    backColor: lightenColor("#FF7F50", 0.4) // Pale Orange
  },
  {
    name: "mysterious",
    color: "#4B0082",
    title: "Deep Ponderer",
    backColor: lightenColor("#4B0082", 0.8) // Light Purple
  },
  {
    name: "polite",
    color: "#F0E68C",
    title: "Respectful Manner",
    backColor: lightenColor("#F0E68C", 0.2) // Very Pale Yellow
  },
  {
    name: "business",
    color: "#000080",
    title: "Strategic Advisor",
    backColor: lightenColor("#000080", 0.8)  // Very Dark Indigo
  },
  {
    name: "friendly",
    color: "#00FFFF",
    title: "Close Confidant",
    backColor: lightenColor("#00FFFF", 0.8)  // Very Light Cyan
  },
  {
    name: "dad of life",
    color: "#8B4513",
    title: "Gangster Boss",
    backColor: lightenColor("#8B4513", 0.8) // Light Brown
  },
  {
    name: "bomman",
    color: "#FF0000",
    title: "Famous Youtuber",
    backColor: lightenColor("#FF0000", 0.8) // Pale Red
  },
];

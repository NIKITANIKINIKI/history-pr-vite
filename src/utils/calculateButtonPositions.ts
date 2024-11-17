export const calculateButtonPositions = (numButtons: number, radius: number) => {
    const centerX = radius;
    const centerY = radius;
  
    return Array.from({ length: numButtons }, (_, i) => {
      const angle = (i / numButtons) * (2 * Math.PI) + Math.PI / 3;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle) - 3,
      };
    });
  };
  
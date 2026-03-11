// Mock API service
export const fetchComponents = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Resistor", type: "passive", symbol: "R" },
        { id: 2, name: "Capacitor", type: "passive", symbol: "C" },
        { id: 3, name: "Diode", type: "active", symbol: "D" },
        { id: 4, name: "Transistor", type: "active", symbol: "Q" },
        { id: 5, name: "Inductor", type: "passive", symbol: "L" },
        { id: 6, name: "LED", type: "active", symbol: "LED" },
        { id: 7, name: "Switch", type: "mechanical", symbol: "SW" },
        { id: 8, name: "Battery", type: "power", symbol: "BAT" },
        { id: 9, name: "IC", type: "integrated", symbol: "U" },
        { id: 10, name: "Relay", type: "electromechanical", symbol: "RLY" }
      ]);
    }, 800);
  });
};
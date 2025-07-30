import { create } from "zustand";
import { persist } from "zustand/middleware";

const useEditorStore = create(
  persist((set) => ({
    selectedLayer: "canvas",
    textOptions: {
      text: "",
      fontSize: 48,
      color: "#000000",
      top: 0,
      left: 0,
    },

    canvasOptions: {
      height: 0,
      orientation: "",
      size: "original",
      backgroundColor: "#008080",
    },

    setSelectedLayer: (newLayer) => set({ selectedLayer: newLayer }),
    setTextOptions: (newOptions) => set({ textOptions: newOptions }),
    addText: () =>
      set({
        textOptions: {
          text: "Add text",
          fontSize: 48,
          color: "#000000",
          top: 0,
          left: 0,
        },
      }),
    setCanvasOptions: (newOptions) => set({ canvasOptions: newOptions }),
    // FIXED: ADD RESET FUNCTION
  resetStore: () =>
    set({
      selectedLayer: "canvas",
      textOptions: {
        text: "",
        fontSize: 48,
        color: "#000000",
        top: 48,
        left: 0,
      },
      canvasOptions: {
        height: 0,
        orientation: "",
        size: "original",
        backgroundColor: "#008080",
      },
    }),
  })
));

export default useEditorStore;

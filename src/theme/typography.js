export const BRAND_FONT_FAMILY = {
  display: '"Rigid Square", Vitesse, Arial, sans-serif',
  body: '"Myriad Pro", "Source Sans Pro", Arial, sans-serif',
  serif: 'Mokoko, Sanchez, Georgia, serif',
};

export async function loadBrandFonts() {
  if (typeof document === "undefined" || !document.fonts?.load) {
    return;
  }

  try {
    await Promise.race([
      Promise.all([
        document.fonts.load('700 1rem "Rigid Square"'),
        document.fonts.load('400 1rem "Myriad Pro"'),
      ]),
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]);
  } catch {
    // Font loading should not block app boot if the browser falls back.
  }
}

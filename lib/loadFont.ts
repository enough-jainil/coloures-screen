export async function loadRighteousFont() {
  const font = new FontFace(
    "Righteous",
    "url(https://fonts.gstatic.com/s/righteous/v14/1cXxaUPXBpj2rGoU7C9WiHGF.woff2)",
    { weight: "400" }
  );

  try {
    const loadedFont = await font.load();
    document.fonts.add(loadedFont);
    return true;
  } catch (error) {
    console.error("Error loading Righteous font:", error);
    return false;
  }
}

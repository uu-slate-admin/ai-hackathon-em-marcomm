import React, { useMemo, useState } from "react";

const GRID = 16;
const SCALE = 24;
const PALETTE = [
  { name: "Transparent", value: "transparent" },
  { name: "Ink", value: "#1d1b1b" },
  { name: "Skin", value: "#f2c6a0" },
  { name: "Hair", value: "#7c4f2e" },
  { name: "Red", value: "#d84c4c" },
  { name: "Blue", value: "#4f77d9" },
  { name: "Green", value: "#4cb36b" },
  { name: "Gold", value: "#d9b44f" },
  { name: "Gray", value: "#8a8f98" },
  { name: "White", value: "#f4f1ea" },
];

function makeLayer(name, colorIndex = 0) {
  return {
    id: crypto.randomUUID(),
    name,
    visible: true,
    colorIndex,
    pixels: Array.from({ length: GRID * GRID }, () => 0),
  };
}

function hashSeed(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed) {
  let s = seed || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function cloneLayers(layers) {
  return layers.map((layer) => ({ ...layer, pixels: [...layer.pixels] }));
}

function drawPixel(layers, activeLayerId, x, y, colorIndex) {
  return layers.map((layer) => {
    if (layer.id !== activeLayerId) return layer;
    const next = { ...layer, pixels: [...layer.pixels] };
    next.pixels[y * GRID + x] = colorIndex;
    return next;
  });
}

function clearLayer(layer) {
  return { ...layer, pixels: Array.from({ length: GRID * GRID }, () => 0) };
}

function generateSprite(prompt) {
  const seed = hashSeed(prompt || "sprite");
  const rand = rng(seed);
  const lower = prompt.toLowerCase();
  const layers = [makeLayer("outline", 1), makeLayer("base", 2), makeLayer("hair", 3), makeLayer("clothes", 4), makeLayer("accessories", 7), makeLayer("highlights", 9)];
  const mid = Math.floor(GRID / 2);

  const bodyTop = 4;
  const bodyBottom = 12;
  const bodyLeft = 5;
  const bodyRight = 10;
  const wideHair = /spiky|wild|messy|punk/.test(lower);
  const hood = /hood|cloak/.test(lower);
  const helmet = /helmet|knight|robot/.test(lower);
  const dress = /dress|robe|wizard|mage/.test(lower);
  const armor = /armor|knight|soldier/.test(lower);
  const accessory = /sword|staff|wand|shield|backpack|glasses|eyepatch/.test(lower);

  const set = (layerIndex, x, y) => {
    if (x < 0 || y < 0 || x >= GRID || y >= GRID) return;
    layers[layerIndex].pixels[y * GRID + x] = 1;
  };

  // outline silhouette
  for (let y = bodyTop; y <= bodyBottom; y++) {
    for (let x = bodyLeft - 1; x <= bodyRight + 1; x++) {
      const inBody = x >= bodyLeft && x <= bodyRight && y >= bodyTop + 1 && y <= bodyBottom - 1;
      const edge = x === bodyLeft - 1 || x === bodyRight + 1 || y === bodyTop || y === bodyBottom;
      if (inBody || edge) set(0, x, y);
    }
  }

  // head
  for (let y = 2; y <= 6; y++) {
    for (let x = 5; x <= 10; x++) set(1, x, y);
  }
  // skin area
  for (let y = 3; y <= 5; y++) {
    for (let x = 6; x <= 9; x++) set(1, x, y);
  }
  // eyes
  set(1, 6, 4);
  set(1, 9, 4);

  // hair / headwear
  for (let x = 4; x <= 11; x++) {
    if (wideHair || rand() > 0.25) {
      set(2, x, 2);
      if (!helmet) set(2, x, 1);
    }
  }
  if (hood) {
    for (let y = 1; y <= 5; y++) {
      set(2, 4, y);
      set(2, 11, y);
    }
    for (let x = 4; x <= 11; x++) set(2, x, 1);
  }
  if (helmet) {
    for (let x = 5; x <= 10; x++) set(2, x, 1);
    set(2, 4, 2);
    set(2, 11, 2);
  }

  // clothes/body
  const topColor = dress ? 4 : 5;
  for (let y = 7; y <= 11; y++) {
    for (let x = 5; x <= 10; x++) set(3, x, y);
  }
  for (let y = 8; y <= 11; y++) {
    set(3, 4, y);
    set(3, 11, y);
  }
  if (armor) {
    for (let y = 7; y <= 10; y++) {
      set(3, 6, y);
      set(3, 9, y);
    }
  }
  layers[3].colorIndex = topColor;

  // accessory layer
  if (accessory) {
    const choice = /staff|wand/.test(lower) ? "staff" : /shield/.test(lower) ? "shield" : /backpack/.test(lower) ? "pack" : /glasses/.test(lower) ? "glasses" : /eyepatch/.test(lower) ? "patch" : "sword";
    if (choice === "sword") {
      for (let y = 6; y <= 12; y++) set(4, 12, y);
      set(4, 11, 6);
      set(4, 13, 6);
    } else if (choice === "staff") {
      for (let y = 4; y <= 12; y++) set(4, 12, y);
      set(4, 11, 4);
      set(4, 13, 4);
    } else if (choice === "shield") {
      for (let y = 8; y <= 11; y++) {
        for (let x = 2; x <= 4; x++) set(4, x, y);
      }
    } else if (choice === "pack") {
      for (let y = 7; y <= 10; y++) {
        set(4, 3, y);
        set(4, 12, y);
      }
    } else if (choice === "glasses") {
      set(4, 6, 4);
      set(4, 7, 4);
      set(4, 8, 4);
      set(4, 9, 4);
    } else {
      set(4, 6, 5);
    }
  }

  // highlights
  for (let x = mid - 1; x <= mid + 1; x++) set(5, x, 3);
  set(5, 6, 8);
  set(5, 9, 8);

  return layers;
}

function composite(layers) {
  const result = Array.from({ length: GRID * GRID }, () => 0);
  layers.forEach((layer) => {
    if (!layer.visible) return;
    layer.pixels.forEach((pix, index) => {
      if (pix) result[index] = layer.colorIndex || pix;
    });
  });
  return result;
}

export default function SpriteStudioEditor() {
  const [prompt, setPrompt] = useState("retro hero with spiky hair and a sword");
  const [layers, setLayers] = useState(() => generateSprite("retro hero with spiky hair and a sword"));
  const [activeLayerId, setActiveLayerId] = useState(layers[1].id);
  const [selectedColor, setSelectedColor] = useState(2);
  const [json, setJson] = useState("");

  const preview = useMemo(() => composite(layers), [layers]);

  const activeLayer = layers.find((layer) => layer.id === activeLayerId) || layers[0];

  const updateActiveLayer = (updater) => {
    setLayers((current) => current.map((layer) => (layer.id === activeLayerId ? updater(layer) : layer)));
  };

  const handlePixel = (x, y) => {
    setLayers((current) => drawPixel(current, activeLayerId, x, y, selectedColor));
  };

  const handleGenerate = () => {
    const next = generateSprite(prompt);
    setLayers(next);
    setActiveLayerId(next[1]?.id || next[0].id);
  };

  const handleExport = () => {
    setJson(JSON.stringify({ prompt, layers }, null, 2));
  };

  const handleImport = () => {
    try {
      const data = JSON.parse(json);
      if (data?.layers) {
        setPrompt(data.prompt || prompt);
        setLayers(data.layers);
        setActiveLayerId(data.layers[0]?.id || activeLayerId);
      }
    } catch {
      alert("Invalid JSON");
    }
  };

  const addLayer = () => {
    const next = [...layers, makeLayer(`layer ${layers.length + 1}`, selectedColor)];
    setLayers(next);
    setActiveLayerId(next[next.length - 1].id);
  };

  const removeLayer = () => {
    if (layers.length <= 1) return;
    const next = layers.filter((layer) => layer.id !== activeLayerId);
    setLayers(next);
    setActiveLayerId(next[0].id);
  };

  const clearActive = () => updateActiveLayer(clearLayer);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 p-4">
      <div className="mx-auto max-w-7xl grid gap-4 lg:grid-cols-[280px_1fr_320px]">
        <aside className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
          <div>
            <h1 className="text-2xl font-semibold">Sprite Studio</h1>
            <p className="text-sm text-slate-400">Retro 8-bit character generator/editor</p>
          </div>

          <label className="block text-sm space-y-2">
            <span>Prompt</span>
            <textarea
              className="w-full min-h-28 rounded-2xl border border-slate-700 bg-slate-950 p-3 text-sm outline-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the character..."
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            <button onClick={handleGenerate} className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-950">
              Generate
            </button>
            <button onClick={handleExport} className="rounded-2xl border border-slate-700 px-3 py-2 text-sm font-medium">
              Export JSON
            </button>
            <button onClick={handleImport} className="rounded-2xl border border-slate-700 px-3 py-2 text-sm font-medium">
              Import JSON
            </button>
            <button onClick={clearActive} className="rounded-2xl border border-slate-700 px-3 py-2 text-sm font-medium">
              Clear layer
            </button>
          </div>

          <label className="block text-sm space-y-2">
            <span>JSON</span>
            <textarea
              className="w-full min-h-40 rounded-2xl border border-slate-700 bg-slate-950 p-3 font-mono text-xs outline-none"
              value={json}
              onChange={(e) => setJson(e.target.value)}
              placeholder="Paste exported sprite JSON here"
            />
          </label>
        </aside>

        <main className="rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
          <div className="flex items-center justify-between gap-4 pb-4">
            <div>
              <h2 className="text-lg font-semibold">Canvas</h2>
              <p className="text-sm text-slate-400">Click to paint the active layer</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Active:</span>
              <span className="rounded-full border border-slate-700 px-2 py-1">{activeLayer?.name}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
              <div
                className="grid rounded-2xl border border-slate-800 overflow-hidden"
                style={{ gridTemplateColumns: `repeat(${GRID}, ${SCALE}px)` }}
              >
                {Array.from({ length: GRID * GRID }, (_, i) => {
                  const x = i % GRID;
                  const y = Math.floor(i / GRID);
                  const colorIndex = preview[i];
                  const color = PALETTE[colorIndex]?.value || "transparent";
                  const checker = (x + y) % 2 === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.06)";
                  return (
                    <button
                      key={i}
                      onClick={() => handlePixel(x, y)}
                      className="border border-slate-900/60"
                      style={{ width: SCALE, height: SCALE, background: color === "transparent" ? checker : color }}
                      aria-label={`pixel ${x},${y}`}
                    />
                  );
                })}
              </div>
            </div>

            <div className="min-w-56 rounded-3xl border border-slate-800 bg-slate-950 p-4">
              <h3 className="mb-3 text-sm font-medium text-slate-300">Palette</h3>
              <div className="grid grid-cols-2 gap-2">
                {PALETTE.map((swatch, index) => (
                  <button
                    key={swatch.name}
                    onClick={() => setSelectedColor(index)}
                    className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-left text-sm ${selectedColor === index ? "border-slate-100" : "border-slate-700"}`}
                  >
                    <span className="h-4 w-4 rounded-full border border-slate-700" style={{ background: swatch.value }} />
                    {swatch.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>

        <aside className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Layers</h2>
            <button onClick={addLayer} className="rounded-2xl border border-slate-700 px-3 py-2 text-sm font-medium">
              Add
            </button>
          </div>

          <div className="space-y-2">
            {layers.map((layer, index) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayerId(layer.id)}
                className={`w-full rounded-2xl border p-3 text-left ${activeLayerId === layer.id ? "border-slate-100 bg-slate-800" : "border-slate-800 bg-slate-950"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">{index + 1}. {layer.name}</span>
                  <input
                    type="checkbox"
                    checked={layer.visible}
                    onChange={(e) => {
                      e.stopPropagation();
                      setLayers((current) => current.map((item) => (item.id === layer.id ? { ...item, visible: e.target.checked } : item)));
                    }}
                  />
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                  <span>Color</span>
                  <select
                    value={layer.colorIndex}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setLayers((current) => current.map((item) => (item.id === layer.id ? { ...item, colorIndex: value } : item)));
                    }}
                    className="rounded-xl border border-slate-700 bg-slate-950 px-2 py-1"
                  >
                    {PALETTE.map((swatch, idx) => (
                      <option key={swatch.name} value={idx}>{swatch.name}</option>
                    ))}
                  </select>
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setLayers((current) => current.map((layer) => (layer.id === activeLayerId ? clearLayer(layer) : layer)))} className="rounded-2xl border border-slate-700 px-3 py-2 text-sm font-medium">
              Clear
            </button>
            <button onClick={removeLayer} className="rounded-2xl border border-slate-700 px-3 py-2 text-sm font-medium">
              Delete
            </button>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="mb-2 text-sm font-medium text-slate-300">Preview</h3>
            <div
              className="grid w-fit rounded-2xl border border-slate-800 overflow-hidden"
              style={{ gridTemplateColumns: `repeat(${GRID}, 10px)` }}
            >
              {preview.map((colorIndex, index) => (
                <div key={index} style={{ width: 10, height: 10, background: PALETTE[colorIndex]?.value === "transparent" ? "rgba(255,255,255,0.04)" : PALETTE[colorIndex].value }} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

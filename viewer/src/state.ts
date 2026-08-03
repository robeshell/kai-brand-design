import type {
  InspectorTarget,
  PageId,
  PlatformId,
  ProductId,
  SkinId,
  ViewportId,
} from "./types";

export interface AppState {
  page: PageId;
  skin: SkinId;
  product: ProductId;
  accent: string;
  viewport: ViewportId;
  platform: PlatformId;
  reducedMotion: boolean;
  inspectorOpen: boolean;
  inspectorTarget?: InspectorTarget;
}

const defaults: AppState = {
  page: "overview",
  skin: "system",
  product: "kaiting",
  accent: "coral",
  viewport: "fluid",
  platform: "macDesktop",
  reducedMotion: false,
  inspectorOpen: false,
};

export function loadState(): AppState {
  try {
    const query = new URLSearchParams(location.search);
    const persisted = JSON.parse(localStorage.getItem("kai-viewer-state") ?? "{}");
    const querySkin = query.get("skin") as SkinId | null;
    const queryProduct = query.get("product") as ProductId | null;
    return {
      ...defaults,
      ...persisted,
      ...(querySkin ? { skin: querySkin } : {}),
      ...(queryProduct ? { product: queryProduct } : {}),
      ...(query.get("reducedMotion") === "true" ? { reducedMotion: true } : {}),
      inspectorOpen: false,
      inspectorTarget: undefined,
    };
  } catch {
    return defaults;
  }
}

export function saveState(state: AppState): void {
  const { inspectorOpen: __, inspectorTarget: _, ...persisted } = state;
  localStorage.setItem("kai-viewer-state", JSON.stringify(persisted));
}

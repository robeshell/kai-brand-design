export type SkinId = "system" | "default" | "pure" | "deep-night";
export type ProductId = "kaiting" | "kaijuan" | "kaigua";
export type ViewportId = "fluid" | "mobile" | "tablet" | "medium" | "wide";
export type PageId =
  | "overview"
  | "getting-started"
  | "color"
  | "typography"
  | "spacing"
  | "motion"
  | "buttons"
  | "inputs"
  | "selection"
  | "navigation"
  | "list-rows"
  | "feedback"
  | "dialogs"
  | "menus"
  | "app-shell"
  | "overlays"
  | "settings"
  | "products"
  | "delivery"
  | "qa";

export interface SkinToken {
  id: Exclude<SkinId, "system">;
  name: string;
  description: string;
  brightness: "light" | "dark";
  canvas: string;
  surface: string;
  elevated: string;
  overlay: string;
  glass: Record<string, string | number>;
  effects: Record<string, number>;
}

export interface AccentPreset {
  id: string;
  name: string;
  accent: string;
  hover?: string;
  pressed?: string;
}

export interface ProductAccent {
  displayName: string;
  default: string;
  presets: AccentPreset[];
}

export interface TokenBundle {
  primitives: {
    specVersion: string;
    basePalette: {
      mainBackground: string;
      sideBackground: string;
      primary: string;
    };
    spacing: Record<string, number | string>;
    radii: Record<string, number>;
    typography: {
      fontFamily: string;
      fontFamilyFallback: string[];
      weights: Record<string, number | string>;
      tracking: Record<string, number>;
      sizes: Record<string, number | number[]>;
    };
    motion: Record<string, Record<string, number | string>>;
    breakpoints: Record<string, unknown>;
    layoutMetrics: Record<string, Record<string, number | string>>;
    derivedAlphas: Record<string, unknown>;
  };
  skins: {
    presets: SkinToken[];
  };
  accents: {
    products: Record<ProductId, ProductAccent>;
  };
  productTokens: Record<
    ProductId,
    {
      product: ProductId;
      productSpecVersion: string;
      tokens: Record<
        string,
        {
          type: "color" | "dimension" | "number" | "duration";
          value: string | number;
          description: string;
        }
      >;
    }
  >;
  viewerContent: {
    contentVersion: string;
    pages: Record<PageId, [string, string, string]>;
  };
  componentContracts: {
    contractVersion: string;
    components: Record<
      Extract<PageId, "buttons" | "inputs" | "selection" | "navigation" | "list-rows" | "feedback" | "dialogs" | "menus">,
      {
        usage: string[];
        tokens: Array<{ name: string; token: string; value: string }>;
      }
    >;
  };
}

export interface InspectorTarget {
  role: string;
  token: string;
  value: string;
  source: string;
  note: string;
}

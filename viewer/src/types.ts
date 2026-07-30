export type SkinId = "system" | "default" | "pure" | "deep-night";
export type ProductId = "kaiting" | "kaijuan" | "kaigua";
export type PlatformId =
  | "appleMobile"
  | "androidMobile"
  | "macDesktop"
  | "windowsDesktop"
  | "linuxDesktop";
export type ViewportId = "fluid" | "mobile" | "tablet" | "medium" | "wide";
export type ComponentId =
  | "surfaces"
  | "buttons"
  | "inputs"
  | "selection"
  | "navigation"
  | "list-rows"
  | "feedback"
  | "dialogs"
  | "menus"
  | "icons"
  | "app-bars"
  | "data-display";
export type PageId =
  | "overview"
  | "color"
  | "platforms"
  | "typography"
  | "spacing"
  | "motion"
  | "components"
  | "buttons"
  | "inputs"
  | "selection"
  | "navigation"
  | "list-rows"
  | "feedback"
  | "dialogs"
  | "menus"
  | "icons"
  | "app-bars"
  | "data-display"
  | "app-shell"
  | "content-browser"
  | "task-workspace"
  | "status-system"
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

export interface PlatformTextStyle {
  fontSize: number;
  lineHeight: number;
  fontWeight: number;
  letterSpacing: number;
}

export interface PlatformProfile {
  label: string;
  platforms: string[];
  unit: string;
  inputMode: string;
  fontFamily: string;
  scaling: string;
  reference: {
    name: string;
    url: string;
  };
  typeScale: Record<string, PlatformTextStyle>;
  metrics: Record<string, number>;
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
    iconography: {
      policy: string;
      sizes: Record<string, number>;
      opticalStroke: Record<string, number>;
    };
    typography: {
      fontPolicy: Record<string, unknown>;
      weights: Record<string, number | string>;
      componentRoles: Record<string, string>;
    };
    componentProfiles: Record<"mobile" | "desktop", PlatformProfile>;
    platformProfiles: Record<string, PlatformProfile>;
    motion: Record<string, Record<string, number | string>>;
    breakpoints: Record<string, unknown>;
    layoutMetrics: Record<string, Record<string, number | string>>;
    componentMetrics: Record<string, Record<string, number>>;
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
      ComponentId,
      {
        name: string;
        summary: string;
        variants: Array<{ name: string; description: string }>;
        states: Array<{ name: string; description: string; required: boolean }>;
        accessibility: string[];
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

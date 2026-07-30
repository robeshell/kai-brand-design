import { resolveSkin, tokens } from "./data";
import type { PlatformId, ProductId, SkinId } from "./types";

function cssColor(value: string): string {
  if (value === "transparent") return value;
  const [base, alpha] = value.split("@");
  if (!alpha) return base;
  const rgb =
    base === "white"
      ? "255 255 255"
      : base === "black"
        ? "0 0 0"
        : `${Number.parseInt(base.slice(1, 3), 16)} ${Number.parseInt(base.slice(3, 5), 16)} ${Number.parseInt(base.slice(5, 7), 16)}`;
  return `rgb(${rgb} / ${alpha})`;
}

export function applyTheme(
  skinId: SkinId,
  productId: ProductId,
  accentId: string,
  reducedMotion: boolean,
): void {
  const resolved = resolveSkin(skinId);
  const skin = tokens.skins.presets.find((item) => item.id === resolved);
  const product = tokens.accents.products[productId];
  const accent =
    product.presets.find((item) => item.id === accentId) ??
    product.presets.find((item) => item.id === product.default) ??
    product.presets[0];
  if (!skin || !accent) return;
  const viewerSurface =
    resolved === "default"
      ? {
          page: "#FFFFFF",
          sidebar: "#FFFFFF",
          topbar: "#FFFFFF",
          demo: "#FFFFFF",
          subtle: tokens.primitives.basePalette.mainBackground,
        }
      : {
          page: skin.canvas,
          sidebar: skin.surface,
          topbar: skin.surface,
          demo: skin.surface,
          subtle: skin.overlay,
        };
  // Skin controls surfaces and effects; product accent is an orthogonal axis.
  // Never change the accent merely because the user switches skin.
  const viewerAccent = accent.accent;
  const derived = tokens.primitives.derivedAlphas as {
    hairline: Record<"light" | "dark", string>;
    border: Record<"light" | "dark", string>;
    subtleFill: Record<"light" | "dark", string>;
    status: Record<
      "success" | "warning" | "error" | "info",
      Record<"light" | "dark", string>
    >;
  };
  const tone = skin.brightness;

  const root = document.documentElement;
  root.dataset.skin = resolved;
  root.dataset.product = productId;
  root.dataset.motion = reducedMotion ? "reduced" : "normal";
  root.style.colorScheme = skin.brightness;

  const values: Record<string, string | number> = {
    "--canvas": skin.canvas,
    "--surface": skin.surface,
    "--elevated": skin.elevated,
    "--overlay": skin.overlay,
    "--canvas-highlight": skin.glass.canvasHighlight,
    "--glass": skin.glass.surface,
    "--glass-strong": skin.glass.strongSurface,
    "--glass-border": skin.glass.border,
    "--shadow-color": skin.glass.shadow,
    "--page-background": viewerSurface.page,
    "--sidebar-background": viewerSurface.sidebar,
    "--topbar-background": viewerSurface.topbar,
    "--demo-background": viewerSurface.demo,
    "--subtle-background": viewerSurface.subtle,
    "--product-main-background": tokens.primitives.basePalette.mainBackground,
    "--product-side-background": tokens.primitives.basePalette.sideBackground,
    "--text-primary": skin.glass.primaryText,
    "--text-secondary": skin.glass.secondaryText,
    "--text-muted": skin.glass.mutedText,
    "--accent": viewerAccent,
    "--product-accent": accent.accent,
    "--hairline": derived.hairline[tone],
    "--border": derived.border[tone],
    "--subtle-fill": derived.subtleFill[tone],
    "--success": derived.status.success[tone],
    "--warning": derived.status.warning[tone],
    "--danger": derived.status.error[tone],
    "--info": derived.status.info[tone],
    "--blur": `${skin.glass.blur}px`,
    "--strong-blur": `${skin.glass.strongBlur}px`,
    "--shadow-scale": skin.effects.shadowScale,
  };
  Object.entries(values).forEach(([key, value]) => {
    root.style.setProperty(
      key,
      typeof value === "string" ? cssColor(value) : String(value),
    );
  });
}

export function installPrimitiveVariables(): void {
  const root = document.documentElement;
  Object.entries(tokens.primitives.spacing).forEach(([key, value]) => {
    if (typeof value === "number") {
      root.style.setProperty(`--space-${key}`, `${value}px`);
    }
  });
  Object.entries(tokens.primitives.radii).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, `${value}px`);
  });
}

export function applyPlatformProfile(profileId: PlatformId): void {
  const root = document.documentElement;
  const componentProfileId = profileId.endsWith("Mobile") ? "mobile" : "desktop";
  const profile = tokens.primitives.componentProfiles[componentProfileId];
  root.dataset.platformProfile = profileId.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  root.dataset.componentProfile = componentProfileId;
  Object.entries(profile.typeScale).forEach(([role, style]) => {
    const name = role.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    root.style.setProperty(`--viewer-type-${name}-size`, `${style.fontSize}px`);
    root.style.setProperty(`--viewer-type-${name}-line-height`, `${style.lineHeight}px`);
  });
  Object.entries(profile.metrics).forEach(([metric, value]) => {
    const name = metric.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    root.style.setProperty(`--viewer-metric-${name}`, `${value}px`);
  });
}

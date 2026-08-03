export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export interface ButtonOptions {
  label: string;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export interface FieldOptions {
  id: string;
  label: string;
  value?: string;
  placeholder?: string;
  error?: string;
  help?: string;
  disabled?: boolean;
  type?: "text" | "search";
}

export interface MenuItemOptions {
  label: string;
  icon?: string;
  shortcut?: string;
  selected?: boolean;
  destructive?: boolean;
}

const escapeHtml = (value: unknown): string =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export function renderButton({
  label,
  variant = "secondary",
  className = "",
  disabled = false,
  ariaLabel,
}: ButtonOptions): string {
  return `<button class="${variant}${className ? ` ${escapeHtml(className)}` : ""}" type="button"${disabled ? " disabled" : ""}${ariaLabel ? ` aria-label="${escapeHtml(ariaLabel)}"` : ""}>${escapeHtml(label)}</button>`;
}

export function renderField({
  id,
  label,
  value = "",
  placeholder = "",
  error = "",
  help = "",
  disabled = false,
  type = "text",
}: FieldOptions): string {
  const description = error || help;
  const descriptionId = description ? `${id}-description` : "";
  return `<label class="${error ? "error" : ""}">
    <span>${escapeHtml(label)}</span>
    <input id="${escapeHtml(id)}" name="${escapeHtml(id)}" type="${type}" value="${escapeHtml(value)}"${placeholder ? ` placeholder="${escapeHtml(placeholder)}"` : ""}${descriptionId ? ` aria-describedby="${descriptionId}"` : ""}${error ? ' aria-invalid="true"' : ""}${disabled ? " disabled" : ""}>
    ${description ? `<small id="${escapeHtml(descriptionId)}">${escapeHtml(description)}</small>` : ""}
  </label>`;
}

export function renderStatus(message: string, className = ""): string {
  return `<div class="snackbar${className ? ` ${escapeHtml(className)}` : ""}" role="status" aria-live="polite" aria-atomic="true">${escapeHtml(message)}</div>`;
}

export function renderSurface(
  label: string,
  title: string,
  description: string,
  variant: "base" | "glass" | "glass-strong" = "base",
): string {
  return `<article class="demo-surface ${variant}"><span>${escapeHtml(label)}</span><strong>${escapeHtml(title)}</strong><small>${escapeHtml(description)}</small></article>`;
}

export function renderDialog({
  id,
  title,
  description,
  destructive = false,
}: {
  id: string;
  title: string;
  description: string;
  destructive?: boolean;
}): string {
  return `<div class="dialog-demo">
    <div class="dialog-backdrop" aria-hidden="true"></div>
    <div class="dialog-card" role="dialog" aria-modal="true" aria-labelledby="${escapeHtml(id)}-title" aria-describedby="${escapeHtml(id)}-description">
      <header><h3 id="${escapeHtml(id)}-title">${escapeHtml(title)}</h3><button class="demo-icon-button" type="button" aria-label="关闭">×</button></header>
      <p id="${escapeHtml(id)}-description">${escapeHtml(description)}</p>
      <footer>${renderButton({ label: "取消", variant: "secondary" })}${renderButton({ label: destructive ? "删除记录" : "保存更改", variant: destructive ? "danger" : "primary" })}</footer>
    </div>
  </div>`;
}

export function renderMenu(items: MenuItemOptions[], label = "菜单", heading = ""): string {
  return `<div class="anchored-menu">
    ${heading ? `<header>${escapeHtml(heading)}</header>` : ""}
    <div role="menu" aria-label="${escapeHtml(label)}">
      ${items
        .map(
          (item, index) => `<button class="${item.selected ? "selected " : ""}${item.destructive ? "destructive" : ""}" type="button" role="menuitem" tabindex="${index === 0 ? "0" : "-1"}">
            ${item.icon ? `<i aria-hidden="true">${escapeHtml(item.icon)}</i>` : "<i aria-hidden=\"true\"></i>"}
            <span>${escapeHtml(item.label)}</span>${item.shortcut ? `<kbd>${escapeHtml(item.shortcut)}</kbd>` : ""}${item.selected ? '<b aria-hidden="true">✓</b>' : ""}
          </button>`,
        )
        .join("")}
    </div>
  </div>`;
}

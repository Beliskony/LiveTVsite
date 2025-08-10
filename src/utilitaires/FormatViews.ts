// utils/formatViews.ts
export function formatViews(views: number): string {
  if (views >= 1_000_000) {
    return (views / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (views >= 1_000) {
    return (views / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return views.toString();
}

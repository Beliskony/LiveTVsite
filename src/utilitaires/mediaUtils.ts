// utils/mediaUtils.ts
export const isHlsLink = (url?: string) => {
  if (!url) return false
  return url.includes(".m3u8") || url.includes("playlist.m3u8")
}

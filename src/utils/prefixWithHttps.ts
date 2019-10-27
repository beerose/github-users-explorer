/**
 * GitHub allows to enter domains instead of URLs as `user.blog`
 * and prefixes them in the UI if needed.
 *
 * @example
 * prefixUrlWithHttps("aleksandra.codes") === prefixUrlWithHttps("https://aleksandra.codes")
 * prefixUrlWithHttps("https://google.com") === prefixUrlWithHttps("https://google.com")
 */
export function prefixWithHttps(s: string) {
  return s.match(/^https?:\/\//) ? s : `https://${s}`;
}

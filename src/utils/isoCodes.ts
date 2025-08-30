import countries from "i18n-iso-countries";

export function getIso3FromIso2(iso2: string): string | undefined {
  return countries.alpha2ToAlpha3(iso2.toUpperCase());
}

export function getIso2FromIso3(iso3: string): string | undefined {
  return countries.alpha3ToAlpha2(iso3.toUpperCase());
}

export function detectIsoType(code: string) {
  if (code.length === 2) return "iso2";
  if (code.length === 3) return "iso3";
  return "unknown";
}

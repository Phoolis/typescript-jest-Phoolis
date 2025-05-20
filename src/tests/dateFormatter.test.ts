import { test, describe, expect } from "@jest/globals"; // https://jestjs.io/docs/expect
import { strict as assert } from "node:assert"; // https://nodejs.org/api/assert.html

import { finnishDateString } from "../dateFormatter"; // the function to be tested

const dayNames: readonly string[] = [
  "sunnuntai",
  "maanantai",
  "tiistai",
  "keskiviikko",
  "torstai",
  "perjantai",
  "lauantai",
];

const monthNames: readonly string[] = [
  "tammi",
  "helmi",
  "maalis",
  "huhti",
  "touko",
  "kesä",
  "heinä",
  "elo",
  "syys",
  "loka",
  "marras",
  "joulu",
];

test("should return monday 1st of July 2024", () => {
  const date = new Date("2024-07-01");
  const expected = "maanantai 1. heinäkuuta 2024";
  const actual = finnishDateString(date);
  expect(actual).toBe(expected);
});

test("should return monday 1st of January 2024", () => {
  const date = new Date("2024-01-01");
  const expected = "maanantai 1. tammikuuta 2024";
  const actual = finnishDateString(date);
  expect(actual).toBe(expected);
});

test("should return Sunday December 31st 2023", () => {
  const date = new Date("2023-12-31");
  const expected = "sunnuntai 31. joulukuuta 2023";
  const actual = finnishDateString(date);
  expect(actual).toBe(expected);
});

test("should format months correctly", () => {
  for (let i = 1; i <= 12; i++) {
    let monthString = i.toString().padStart(2, "0");
    let date = new Date(`2024-${monthString}-01`);
    const actual = finnishDateString(date);
    expect(actual).toContain(monthNames[i - 1]);
  }
});

test("should format days correctly", () => {
  for (let i = 1; i <= 7; i++) {
    let dayString = i.toString().padStart(2, "0");
    let date = new Date(`2024-12-${dayString}`);
    const actual = finnishDateString(date);
    expect(actual).toContain(dayNames[i - 1]);
  }
});

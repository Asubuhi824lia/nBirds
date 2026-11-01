import type { FillwordTopic, FillwordTopicJson } from "./types";

const STORAGE_KEY = "nbirds.fillword.customTopics";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export function loadCustomTopics(): FillwordTopic[] {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as FillwordTopicJson[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (t) =>
        t &&
        typeof t.id === "string" &&
        typeof t.title === "string" &&
        Array.isArray(t.words) &&
        t.config,
    );
  } catch {
    return [];
  }
}

export function saveCustomTopic(topic: FillwordTopicJson): FillwordTopic[] {
  const prev = loadCustomTopics().filter((t) => t.id !== topic.id);
  const next = [topic, ...prev];
  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  return next;
}

export function removeCustomTopic(id: string): FillwordTopic[] {
  const next = loadCustomTopics().filter((t) => t.id !== id);
  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  return next;
}

export function topicToJson(topic: FillwordTopicJson): string {
  return JSON.stringify(topic, null, 2);
}

export function parseTopicJson(text: string): FillwordTopicJson | null {
  try {
    const parsed = JSON.parse(text) as FillwordTopicJson;
    if (
      !parsed ||
      typeof parsed.id !== "string" ||
      typeof parsed.title !== "string" ||
      !Array.isArray(parsed.words) ||
      !parsed.config
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

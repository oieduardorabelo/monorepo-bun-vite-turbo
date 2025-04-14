export interface NodeData {
  label: string;
  [key: string]: unknown;
}

export type NodeType = "action" | "segment" | "smart" | "email" | "wait";

export type DnDContextType = [string | null, (type: string | null) => void];

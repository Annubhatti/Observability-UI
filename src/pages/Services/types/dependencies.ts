export interface DependencyNode {
  id: string;
  label: string;
  type: string;
}

export interface DependencyEdge {
  id: string;
  source: string;
  target: string;
}

export interface DependenciesResponse {
  nodes: DependencyNode[];
  edges: DependencyEdge[];
}
import { _symKey_, _symParentKey_, _symLevels_, _symIsRoot_, _symIsLeaf_ } from "./constants";

type DimensionNode = {
  [_symKey_]: string;
  [_symParentKey_]: string;
  [_symLevels_]: Record<string, any>;
  name: string;
  code: string;
};

type TreeNode = DimensionNode & { [_symIsRoot_]?: boolean; [_symIsLeaf_]?: boolean; children?: TreeNode[] };

export type CrossifyData = Record<string, any>;

type DimensionConfig = {
  rows?: string[];
  columns?: string[];
};

export type CrossifyOptions = {
  dimensions?: DimensionConfig;
  metrics: string[];
};

const buildDimensionMap = (data: CrossifyData[], dimensions: string[]) => {
  const dimensionMap = new Map<string, DimensionNode>();
  data.forEach((record) => {
    let parentKey: string;
    let levels: Record<string, any> = {};
    dimensions.forEach((dim) => {
      let key: string;
      if (!parentKey) {
        key = `${dim}_${record[dim]}`;
        levels = { [dim]: record[dim] };
      } else {
        key = `${parentKey}|${dim}_${record[dim]}`;
        Object.assign(levels, { [dim]: record[dim] });
      }
      if (!dimensionMap.has(key)) {
        dimensionMap.set(key, {
          [_symKey_]: key,
          [_symParentKey_]: parentKey,
          [_symLevels_]: levels,
          name: record[dim],
          code: record[dim],
        });
      }
      parentKey = key;
    });
  });
  return dimensionMap;
};

const buildDimensionTree = (data: CrossifyData[], dimensions: string[]) => {
  const dimensionMap = buildDimensionMap(data, dimensions);
  const treeNodes: TreeNode[] = [];

  dimensionMap.forEach((node) => {
    const isRoot = !dimensionMap.has(node[_symParentKey_]);
    Object.assign(node, { [_symIsRoot_]: isRoot, [_symIsLeaf_]: true });
  });

  return treeNodes;
};

export const crossify = (data: CrossifyData[], options: CrossifyOptions) => {
  const { dimensions = {} } = options;
  const { rows = [], columns = [] } = dimensions;
  const rowTree = buildDimensionTree(data, rows);
  const colTree = buildDimensionTree(data, columns);
  // eslint-disable-next-line no-console
  console.log("--->", rowTree, colTree);
};

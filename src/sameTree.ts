/**
 * 二叉树相同问题.
 */
export function isSameTree(p: any, q: any): boolean {
  return JSON.stringify(p) === JSON.stringify(q);
}

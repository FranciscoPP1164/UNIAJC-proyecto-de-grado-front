export interface IMenuItemConfig<T = void, U = void> {
  text: string;
  action?: (param: U) => T;
  selected?: boolean;
}

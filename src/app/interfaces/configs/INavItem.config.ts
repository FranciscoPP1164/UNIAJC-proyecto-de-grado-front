import { IMenuItemConfig } from './IMenuItem.config';

export interface INavItemConfig<T = void, U = void>
  extends IMenuItemConfig<T, U> {
  path: string;
}

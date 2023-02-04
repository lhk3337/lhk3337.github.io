declare module "*.png";
declare module "*.jpeg";
declare module "*.jpg";

export {};

declare global {
  interface Window {
    [key: string]: any;
  }
}

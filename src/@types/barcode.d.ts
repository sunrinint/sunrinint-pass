declare module "svelte-barcode" {
  import { SvelteComponent } from "svelte";

  interface BarcodeProps {
    value: string;
    elementTag?: "img" | "canvas" | "svg";
    options?: {
      format?:
        | "CODE128"
        | "EAN / UPC"
        | "CODE39"
        | "ITF-14"
        | "MSI"
        | "Pharmacode"
        | "Codabar";
      lineColor?: string;
      width?: number;
      height?: number;
      displayValue?: boolean;
      margin?: number;
    };
  }

  export default class Barcode extends SvelteComponent<BarcodeProps> {}
}

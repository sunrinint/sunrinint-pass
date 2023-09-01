import Barcode from "react-barcode";
import { useStore } from "@nanostores/react";
import { userInfo } from "../../stores/info";

export default function () {
  const info = useStore(userInfo);
  return <Barcode value={info.barcode} />;
}

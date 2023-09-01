import Barcode from "react-barcode";
import { useStore } from "@nanostores/react";
import { isEmpty, userInfo } from "../../stores/info";
import { useEffect } from "react";
import Pass from "../../api/Pass";

export default function () {
  const info = useStore(userInfo);

  useEffect(() => {
    if (isEmpty.get()) {
      Pass.Get().then((data) => {
        userInfo.set(data);
      });
    }
  }, []);

  return (
    <>
      {info?.barcode && (
        <Barcode
          value={info.barcode}
          height={48}
          displayValue={false}
          margin={0}
          background="transparent"
        />
      )}
    </>
  );
}

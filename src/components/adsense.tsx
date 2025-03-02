import React, { useEffect } from "react";

const AdComponent = () => {
  useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
    // 광고 스크립트를 실행하는 함수
  }, []);

  return (
    <div className="mt-20 text-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6684846724407111" // 구글 애드센스 코드의 data-ad-client 값으로 대체
        data-ad-slot="8046162930" // 구글 애드센스 코드의 data-ad-slot 값으로 대체
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdComponent;

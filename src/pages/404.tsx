import React, { useEffect } from "react";
import { navigate, PageProps } from "gatsby";

import Seo from "components/Seo";

export default function NotFoundPage() {
  useEffect(() => {
    navigate("/");
  }, []);
  return;
}

export const Head = () => <Seo title="NotFound" />;

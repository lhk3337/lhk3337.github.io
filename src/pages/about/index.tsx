import Layout from "components/layout";
import Seo from "components/Seo";
import { graphql, PageProps } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
interface aboutProps {
  location: PageProps["location"];
  data: {
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };
}
export default function About({ location, data }: aboutProps) {
  return (
    <Layout location={location.pathname}>
      <div className="mx-auto mt-16 max-w-4xl px-6 sm:px-14">
        <div className="mb-14 flex flex-col items-center justify-center space-y-8">
          <h1 className="text-2xl font-black sm:text-4xl">About</h1>
          <GatsbyImage image={data.file.childImageSharp.gatsbyImageData} alt="profile" className="rounded-full" />
        </div>
        <div className="flex flex-col items-center justify-center text-[1.25rem]">
          <span>안녕하세요. 프론트개발자를 꿈꾸고 있는 임홍규입니다.</span>
          <span className="mt-5">프론트엔드 개발에 빠져들게 된 이유는 상상속의 떠오르는 아이디어를 현실에서</span>
          <span>직접적으로 구현 할 수 있는 개발만의 매력을 느꼈기 때문입니다.</span>

          <span className="mt-5">공부한 내용을 정리하고 설명하는 과정에서 </span>
          <span>제 개인적인 성장과 학습 효과도 동시에 얻을 수 있고자</span>
          <span>블로그를 만들게 되었습니다.</span>
          <span className="mt-5">개발을 잘하는 개발자가 되기 위해 어떤 고민을 하고</span>
          <span>이것을 해결하려는 자세가 있는 개발자가 되는 것이 목표입니다.</span>
        </div>
      </div>
    </Layout>
  );
}

export const queary = graphql`
  query AboutData {
    file(name: { eq: "profile" }) {
      childImageSharp {
        gatsbyImageData(width: 250, height: 250)
      }
      publicURL
    }
  }
`;

export const Head = () => <Seo title="ABOUT" />;

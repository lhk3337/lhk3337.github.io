import { Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
interface Props {
  categories: [string];
  date: string;
  slug: string;
  title: string;
  desc: string;
  thumbnail: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}
export default function CategoryItem({
  slug,
  thumbnail: {
    childImageSharp: { gatsbyImageData },
  },
  categories,
  title,
  desc,
  date,
}: Props) {
  return (
    <Link
      to={`/blog${slug}`}
      className="rounded-lg shadow-md duration-500 ease-in-out hover:scale-[1.01] hover:shadow-xl dark:bg-slate-800"
    >
      <GatsbyImage image={gatsbyImageData} alt="thumbnail" className=" h-56 rounded-t-lg" />
      <div className=" p-5">
        <span className="rounded-md bg-slate-100 pl-2 pr-2.5 pt-1 text-xl text-slate-700">{categories.join()}</span>
        <h1 className="my-5 text-4xl font-bold">{title}</h1>
        <span className="text-base">{desc}</span>
        <div className="mt-2">
          <span className="text-sm font-semibold text-slate-500">{date}</span>
        </div>
      </div>
    </Link>
  );
}

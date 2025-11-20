import { Link } from "react-router-dom";

interface IPageHeaderProps {
  title: string;
  linkTo: string;
  linkText: string;
}

export const PageHeader = ({ linkText, linkTo, title }: IPageHeaderProps) => {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold underline capitalize">
        {title}
      </h1>
      <div className="mt-8">
        <Link to={linkTo} className="mb-4 text-yellow-500 underline">
          {linkText}
        </Link>
      </div>
    </div>
  );
};

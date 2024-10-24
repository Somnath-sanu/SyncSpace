import Image from "next/image";

interface LoaderProps {
  title?: string;
}

const Loader = ({ title }: LoaderProps) => {
  return (
    <div className="flex size-full h-screen items-center justify-center gap-3 text-white">
      <Image
        src="/assets/icons/loader.svg"
        alt="loader"
        width={32}
        height={32}
        className="animate-spin"
      />
      {title && title}
    </div>
  );
};

export default Loader;

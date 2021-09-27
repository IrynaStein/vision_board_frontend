import ReactLoading from "react-loading";
export default function Loader() {
  return (
    <ReactLoading
      className="loader"
      type={"spokes"}
      color={"#7CA7C9"}
      height={60}
      width={60}
    />
  );
}


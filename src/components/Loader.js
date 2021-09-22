import ReactLoading from "react-loading";
export default function Loader() {
  return (
    <ReactLoading
      className="loader"
      type={"spinner"}
      color={"black"}
      height={100}
      width={100}
    />
  );
}

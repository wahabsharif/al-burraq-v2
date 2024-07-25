import { DotLoader } from "react-spinners";

const ItemsLoader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="m-40">
      <DotLoader size={60} color={"rgb(198, 148, 57)"} loading={true} />
    </div>
    <div className="m-40">
      <DotLoader size={60} color={"rgb(198, 148, 57)"} loading={true} />
    </div>
    <div className="m-40">
      <DotLoader size={60} color={"rgb(198, 148, 57)"} loading={true} />
    </div>
  </div>
);

export default ItemsLoader;

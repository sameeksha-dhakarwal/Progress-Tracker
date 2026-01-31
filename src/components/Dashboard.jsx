import StreaksCards from "./StreaksCards";

export default function Dashboard({ data }) {
  return (
    <div className="flex justify-end">
      <StreaksCards data={data} />
    </div>
  );
}

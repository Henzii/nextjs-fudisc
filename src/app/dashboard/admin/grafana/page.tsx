import GrafanaStats from "./GrafanaStats";

const Page = () => (
    <div>
        <h1 className="text-3xl font-bold mb-6">FuDisc - Overall Activity</h1>
        <p className="mb-6 text-slate-600">Stats shown are from the last 30 days.</p>
        <GrafanaStats />
    </div>
)

export default Page;

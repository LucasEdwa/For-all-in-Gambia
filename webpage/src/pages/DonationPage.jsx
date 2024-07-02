import Donation from "../components/donation/Donation";

export default function DonationPage() {
  return (
    <div className="donera-Page">
      <h1 className="text-4xl font-bold text-black mb-4 p-8">
        Donera och bidra till vår initiativ
      </h1>
      <div className="bg-none">
        <Donation />
      </div>
    </div>
  );
}

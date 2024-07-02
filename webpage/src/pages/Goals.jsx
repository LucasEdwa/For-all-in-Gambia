import Carousel from "../components/Carousel";
export default function Goals() {
  return (
    <div className=" text-center ">
      <h1 className="text-2xl font-bold py-4">Our Goals</h1>
      <div className="container p-4 sm:grid-cols-2 ">
        <div className="grid grid-cols-2 gap-4 ">
          <div className=" bg-transparent shadow-[0_0_60px_rgba(20,142,118,0.835)] rounded-md p-5 text-justify">
            <h2 className="text-xl font-bold mb-4">
              Nature Conservation and Economic Sustainability
            </h2>
            <p className="text-sm font-semibold mb-4">
              Our goal is for Gambia and Africa to maintain sustainable
              development through the wise use of natural resources. We strive
              to live in harmony with nature and improve both humanity and our
              ecosystems. By utilizing environmentally friendly materials such
              as bamboo, an alternative to wood, we reduce deforestation and
              promote sustainable industrial development.
            </p>
          </div>
          <div className="wide bg-transparent shadow-[0_0_60px_rgba(20,142,118,0.835)] rounded-md p-5 text-center text-xl font-bold mb-4">
            <h2 className="text-md font-bold mb-4">
              Affordable Housing for All
            </h2>
            <p className="text-sm font-semibold mb-4">
              We promote housing that is affordable for families with varying
              economic conditions, including housing for very low, low, and
              middle-income households. Making housing affordable is crucial to
              ensuring that everyone has access to safe and stable housing.
            </p>
          </div>
          <div className="wide-document bg-transparent shadow-[0_0_60px_rgba(20,142,118,0.835)]  rounded-s-2xl p-5 text-justify">
            <h2 className="text-sm font-bold mb-4">
              Housing Stress and Community Welfare
            </h2>
            <p className="text-base">
              Economic stress from housing costs affects access to other
              necessities of life. Our goals include not only affordability but
              also creating an inclusive, fair, and sustainable community
              development. With government support, we can use bamboo to combat
              climate change, protect biodiversity, and promote sustainable
              building practices.
            </p>
          </div>
          <Carousel />
        </div>
        <div className="goal-context bg-transparent shadow-[0_0_60px_rgba(20,142,118,0.835)] rounded-md p-5 mt-8">
          <h2 className="text-xl font-bold mb-4">Context and Collaboration</h2>
          <p>
            Stable, affordable, and accessible housing linked to health,
            justice, and community support services is crucial for enabling
            independent living. It improves life opportunities related to
            family, work, education, and leisure. Our housing goals are seen in
            this broader context.
          </p>
        </div>
      </div>
    </div>
  );
}

import Carousel from "react-bootstrap/Carousel";
import carousel1 from "../images/carousel1.jpg";
import carousel2 from "../images/carousel2.jpg";
import carousel3 from "../images/carousel3.jpg";

export default function CarouselComponent() {
  return (
    <Carousel className="carousel">
      <Carousel.Item interval={1000}>
        <img className="d-block w-100" src={carousel1} alt="First slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img className="d-block w-100" src={carousel2} alt="Second slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={carousel3} alt="Third slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

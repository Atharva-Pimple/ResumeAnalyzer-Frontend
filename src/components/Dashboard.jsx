import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import { Container, Row, Col } from 'react-bootstrap';
import './dashboard.css';

function Dashboard() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
            <Container>
            <Image src="src/assets/New Resume Analyzer logo.jpg"  fluid />
          </Container>
          <Carousel.Caption className='text-dark'>
            <h3>AI Powered resume analysis.</h3>
            <p>Sharpen your resume’s focus.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <Image src="src/assets/bannerResume.jpg" fluid />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <Image
            src="src/assets/Banner1.png"
            className="d-block mx-auto carousel-img"s
            alt="Banner 1"
          />
          <Carousel.Caption>
            
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Dashboard;

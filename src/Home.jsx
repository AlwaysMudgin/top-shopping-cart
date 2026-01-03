import { useRef } from 'react';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import styled from 'styled-components';

// const VIDEOS = [
//   'https://videos.pexels.com/video-files/34602680/14664547_1920_1080_24fps.mp4',
//   'https://www.shutterstock.com/shutterstock/videos/3727847805/preview/stock-footage-scenic-view-of-tobacco-farm-in-central-kentucky-at-sunset.webm',
//   'https://www.shutterstock.com/shutterstock/videos/3405907261/preview/stock-footage-close-up-of-workers-handling-cured-tobacco-leaves-rural-farming-process.webm',
//   'https://videos.pexels.com/video-files/6973186/6973186-hd_1920_1080_25fps.mp4',
//   'https://videos.pexels.com/video-files/6259234/6259234-hd_1920_1080_30fps.mp4',
// ];

// let videoIndex = 0;

function Home() {
  const videoRef = useRef();

  return (
    <>
      <Heading>This is Brigada</Heading>
      <Grid>
        <VideoCard>
          <Player
            ref={videoRef}
            width="100%"
            muted={true}
            autoPlay
            loop={true}
            playsInline={true}
          >
            <source src="//privadacigarclub.com/cdn/shop/videos/c/vp/7bb34add22f7468a9106efb5acd24273/7bb34add22f7468a9106efb5acd24273.HD-720p-1.6Mbps-54338735.mp4?v=0"></source>
          </Player>
          <OverlayText>
            The World's Most Exclusive Brigar Club{' '}
            <Button>You Can't Join</Button>
          </OverlayText>
        </VideoCard>
        <ShopNow>
          <StyledLink to="/shop">
            Shop Now <StyledChevron />
          </StyledLink>
        </ShopNow>
        <SneakPeek>
          <CardText>
            See the sneak preview of this month's{' '}
            <Button>Brian's Box (NSFW)</Button>
          </CardText>
        </SneakPeek>
      </Grid>
    </>
  );
}

const Heading = styled.h1`
  font-family: 'Merriweather';
  text-align: center;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 49%);
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    'video box1'
    'video box2';
  padding: 0 1rem;
  gap: 1rem;
  min-height: 294px;
`;

const Card = styled.div`
  --radius: 4px;
  border-radius: var(--radius);
  display: flex;
  font-family: 'Plex Sans';
`;

const VideoCard = styled(Card)`
  position: relative;
  grid-area: video;

  display: flex;
`;

const Player = styled.video`
  position: absolute;
  z-index: -2;
  border-radius: 4px;
  height: 100%;
  object-fit: fill;
`;

const OverlayText = styled.div`
  background-color: rgb(11, 22, 19, 0.05);
  color: white;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  border-radius: var(--radius);
  font-size: 1.5rem;
  font-style: italic;
  padding: 1rem;

  & button {
    align-self: flex-start;
  }
`;

const Button = styled.button`
  background-color: var(--brand-gold);
  color: var(--black);
  border: none;
  padding: 0.5rem;
  font-size: 0.8rem;
  font-style: normal;
  font-weight: bold;
  border-radius: 4px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ShopNow = styled(Card)`
  background-image: url('https://images.unsplash.com/photo-1694716438178-c6f34bddd64d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: 0% 25%;
  color: var(--brand-gold);
  font-size: 1.2rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledChevron = styled(ChevronRight)`
  transform: translateX(0);
  transition: transform 0.3s;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--brand-gold);
  font-weight: 500;
  display: flex;
  align-items: center;
  transform: scale(1);
  transform-origin: center;
  transition: transform 0.3s;

  &:hover {
    text-decoration: underline;
    transform: scale(1.2);
  }

  &:hover ${StyledChevron} {
    transform: translateX(8px);
  }
`;

const SneakPeek = styled(Card)`
  background-image: url('https://images.unsplash.com/photo-1761471858192-c97158a53d0f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: 40% 40%;
  color: var(--brand-gold);
  font-size: 1.2rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardText = styled.div`
  background-color: rgb(11, 22, 19, 0.5);
  display: flex;
  flex-direction: column;
  padding: 0.3rem;

  & button {
    align-self: center;
  }
`;

export default Home;

import './Photo.css';

function Photo({src}) {
  return (
    <img src={src} className={'img'}/>
  );
}

export default Photo;
import style from './Photo.module.css'

function Photo({src}) {
  return (
    <img src={src} className={style.img}/>
  );
}

export default Photo;

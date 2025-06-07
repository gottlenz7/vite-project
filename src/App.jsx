// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Button from './Button/Button.jsx';
import Photo from './Photo/Photo.jsx';
import Frame from './Frame/Frame.jsx';
import Filter from './Filter/Filter.jsx';
import Search from './Search/Search.jsx';

function App() {
  const filterOptions = [
    { value: 'chicken', label: 'курица' },
    { value: 'banana', label: 'банан' },
    { value: 'mushroom', label: 'грибы' },
  ];

  return (
    <div className="app">
      <Frame title="компоненты">
        <Photo src="https://cafebrynza.ru/images/articles/5-poleznykh-svojstv-goryachej-edy_66a272bd082bc.png"/>
        
        <span>о еда</span>
        
        <Button text='кнопка' onClick={() => alert('кнопка успешно нажата')}>
        </Button>
      </Frame>

      <Filter 
          options={filterOptions} 
          onSelect={(value) => console.log('Выбрано:', value)} 
        />

<Search onSearch={(query) => alert(`производится поиск по запросу: ${query}`)}/>
    </div>
  );
}

export default App;